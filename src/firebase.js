import Firebase from 'firebase';

import { FIREBASE_URL } from './config';

const firebase = new Firebase(FIREBASE_URL);

const childAddedQueue = dispatch => {
  // Apply each move in order.
  // This will queue any snapshots that arrive out
  // of order. Then process them once the correct ones
  // arrive.
  const queuedSnapshots = {};
  let lastKey = null;

  return (snapshot, prevSnapKey) => {
    if (lastKey === prevSnapKey) {
      do {
        delete queuedSnapshots[lastKey];
        lastKey = snapshot.key();
        dispatch({...snapshot.val(), firebaseUpdate: true});
      } while (snapshot = queuedSnapshots[lastKey]);
    } else {
      queuedSnapshots[prevSnapKey] = snapshot;
    }
  }
}

const resetMoves = dispatch => {
  // Remove the listener then add it again
  // to reset it's state.
  const movesRef = firebase.child('moves');
  movesRef.off('child_added');
  movesRef.remove();
  movesRef.on('child_added', childAddedQueue(dispatch));
}

export function firebaseMiddleware({ dispatch, getState }) {
  const movesRef = firebase.child('moves');

  movesRef.on('child_added', childAddedQueue(dispatch));

  return next => action => {
    const firebaseUpdate = action.firebaseUpdate;
    delete action.firebaseUpdate;

    if (firebaseUpdate) {
      // Got action from firebase. Generate new state and
      // update update firebase `gameState`.
      const returnValue = next(action);
      const {board, turn} = getState().gameState;
      firebase.child('gameState').update({board, turn});
      return returnValue;
    } else {
      // Don't generate a new state here. Instead allow
      // firebase to dispatch the action.
      if (action.type === 'RESTART_GAME')
        resetMoves(dispatch);
      movesRef.push(action);
    }

  }
}

export function skipPreviousAnimations ({dispatch, getState}) {
  let skipCount = 6;

  const prom = new Promise(resolve => {
    firebase.child('moves').once('value', snapshot => {
      skipCount = Object.keys(snapshot.val()).length;
      resolve();
    })
  })

  return next => action => {
    prom.then(() => {
      if (skipCount > 0) {
        action.skipAnimation = true;
        skipCount--;
      }

      next(action);
    })
  }
}
