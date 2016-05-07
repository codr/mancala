/*
 * action types
 */

export const EMPTY_HOLE = 'EMPTY_HOLE';
export const CHECK_END_GAME = 'CHECK_END_GAME';

/*
 * action creators
 */

export const emptyHole = (row, column) => {
  return {
    type: EMPTY_HOLE,
    row,
    column
  }
}

export const checkEndGame = () => {
  return {
    type: CHECK_END_GAME,
  }
}

/*
 * ...
 */

const sum = (a,b) => a+b;

export const isGameOver = (board) =>
  (board[0].reduce(sum, 0) === board[0][0] ||
    board[1].reduce(sum, 0) === board[1][board.length-1]);

export const finalScore = (board) =>
  [board[0].reduce(sum, 0), board[1].reduce(sum, 0)]
