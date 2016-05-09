import Firebase from 'firebase';

import { FIREBASE_URL } from './config';

const firebase = new Firebase(FIREBASE_URL);

function firebaseMiddleware({ dispatch, getState }) {
  const movesRef = firebase.child('moves');

  movesRef.on('child_added', snapshot => {
    dispatch({...snapshot.val(), firebaseRemoteUpdate: true})
  })

  movesRef.on('child_removed', () => {
    dispatch({type: 'RESTART_GAME', firebaseRemoteUpdate: true})
  })

  return next => action => {
    const firebaseRemoteUpdate = action.firebaseRemoteUpdate;
    delete action.firebaseRemoteUpdate;

    const returnValue = next(action);

    if (!firebaseRemoteUpdate) {
      firebase.update(getState());
      if (action.type === 'RESTART_GAME') {
        movesRef.remove()
      } else {
        movesRef.push(action)
      }
    }

    return returnValue;
  }
}

export { firebaseMiddleware }
