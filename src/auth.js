import { rootRef } from './firebase';

// assign player number.
rootRef.onAuth(authData => {
  const playersRef = rootRef.child('players');
  playersRef.once('value', snapshot => {
    const players = snapshot.val();
    if (!players || !players[authData.uid]) {
      const numPlayers = snapshot.numChildren();
      if (numPlayers < 2) {
        playersRef.child(authData.uid).set({playerNumber: numPlayers});
      }
    }
  });
});

function getAuthData() {
  return new Promise(resolve => {
    rootRef.onAuth(resolve);
  });
}

export function getPlayerNumber() {
  return getAuthData()
    .then(authData => new Promise((resolve, reject) => {
      rootRef
      .child('players')
      .child(authData.uid)
      .on('value', snapshot => {
        if (snapshot.val())
          return resolve(snapshot.val().playerNumber);
        reject();
      });
    }));
}

const user = rootRef.getAuth();

if (!user) {
  rootRef.authAnonymously(function(error, authData) {
    if (error) {
      console.log('Login Failed!', error);
    } else {
      console.log('Authenticated successfully with payload:', authData);
    }
  });
}
