import Firebase from 'firebase';

import { FIREBASE_URL } from './config';

const firebase = new Firebase(FIREBASE_URL);

function firebaseMiddleware({ dispatch, getState }) {
  const movesRef = firebase.child('moves');

  // Apply each move in order.
  // This will queue any snapshots that arrive out
  // of order. Then process them once the correct ones
  // arrive.
  const queuedSnapshots = {};
  let lastKey = null;
  movesRef.on('child_added', (snapshot, prevSnapKey) => {
    if (lastKey === prevSnapKey) {
      do {
        delete queuedSnapshots[lastKey];
        lastKey = snapshot.key();
        dispatch({...snapshot.val(), firebaseRemoteUpdate: true})
      } while (snapshot = queuedSnapshots[lastKey]);
    } else {
      queuedSnapshots[prevSnapKey] = snapshot;
    }
  })

  return next => action => {
    const firebaseRemoteUpdate = action.firebaseRemoteUpdate;
    delete action.firebaseRemoteUpdate;

    const returnValue = next(action);

    if (!firebaseRemoteUpdate) {
      firebase.update(getState());
      if (action.type === 'RESTART_GAME') {
        movesRef.remove()
      }
      movesRef.push(action)
    }

    return returnValue;
  }
}

export { firebaseMiddleware }
