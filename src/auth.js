import { rootRef } from './firebase';

// assign player number.
rootRef.onAuth(authData => {
  if (!authData) return;
  const playersRef = rootRef.child('players');
  playersRef.on('value', snapshot => {
    const players = snapshot.val();
    if (!players || !players[authData.uid]) {
      const numPlayers = snapshot.numChildren();
      if (numPlayers < 2) {
        let playerNumber = numPlayers;
        if (numPlayers === 1) {
          const otherPlayersId = Object.keys(snapshot.val())[0];
          const otherPlayer = players[otherPlayersId];
          const otherPlayersNumber = otherPlayer.playerNumber;
          playerNumber = otherPlayersNumber === 0 ? 1 : 0;
        }
        playersRef.child(authData.uid).onDisconnect().remove();
        playersRef.child(authData.uid).set({playerNumber});
      }
    }
  });
});

export function onPlayerNumber(cb) {
  rootRef.onAuth(authData => {
    if (!authData) return cb(-1);
    rootRef
    .child('players')
    .child(authData.uid)
    .child('playerNumber')
    .on('value', snapshot => {
      if (typeof snapshot.val() !== 'undefined')
        return cb(snapshot.val());
      cb(-1);
    });
  });
}

// If we aren't logged in then log in.
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
