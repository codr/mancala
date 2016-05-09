
Simple mancala game using Redux with React and Babel support

## Install

    npm install

## Run

    npm run start

## Test

    npm run test

## Game rules

- The Mancala 'board' is made up of two rows of six holes each.
- Four pieces -- marbles or stones -- are placed in each of the 12 holes.
- Each player has a 'store' to the right side of the Mancala board.
- The game begins with one player picking up all of the pieces in any one of the holes on his side.
- Moving counter-clockwise, the player deposits one of the stones in each hole until the stones run out.
- If you run into your own store, deposit one piece in it. If you run into your opponent's store, skip it.
- If the last piece you drop is in your own store, you get a free turn.
- If the last piece you drop is in an empty hole on your side, you capture that piece and any pieces in the hole directly opposite.
- Always place all captured pieces in your store.
- The game ends when all six spaces on one side of the Mancala board are empty.
- The player who still has pieces on his side of the board when the game ends captures all of those pieces.
- Count all the pieces in each store. The winner is the player with the most pieces.

[source](http://boardgames.about.com/cs/mancala/ht/play_mancala.htm)
