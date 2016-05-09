import Firebase from 'firebase';

import { FIREBASE_URL } from './config';

const firebase = new Firebase(FIREBASE_URL);

function firebaseMiddleware({ dispatch, getState }) {
  firebase.child('moves')
  .on('child_added', snapshot => {
    dispatch({...snapshot.val(), firebaseRemoteUpdate: true})
  }, error => {
    console.log("The read failed: " + error.code);
  })

  return next => action => {
    const firebaseRemoteUpdate = action.firebaseRemoteUpdate;
    delete action.firebaseRemoteUpdate;

    const returnValue = next(action);

    if (!firebaseRemoteUpdate) {
      firebase.update(getState(), e => e && console.log(e));
      if (action.type === 'RESTART_GAME') {
        firebase.child('moves').remove()
      } else {
        firebase.child('moves')
        .push(action)
      }
    }

    return returnValue;
  }
}

export { firebaseMiddleware }
