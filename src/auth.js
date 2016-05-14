import { rootRef } from './firebase';

// assign player number.
rootRef.onAuth(authData => {
  const playersRef = rootRef.child('players');
  playersRef.once('value', snapshot => {
    const players = snapshot.val();
    if (!players || !players[authData.uid]) {
      const numPlayers = snapshot.numChildren();
      if (numPlayers < 2) {
        playersRef.child(authData.uid).onDisconnect().remove();
        playersRef.child(authData.uid).set({playerNumber: numPlayers});
      }
    }
  });
});

export function getPlayerNumber(cb) {
  rootRef.onAuth(authData => {
    rootRef.child('players')
    .child(authData.uid)
    .once('value', snapshot => {
      if (snapshot.val())
        return cb(snapshot.val().playerNumber);
      cb(-1);
    });
  });
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
