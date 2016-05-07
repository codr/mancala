import { EMPTY_HOLE, RESTART_GAME } from '../actions';

const initialState = {
  board:[
    [0, 4, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 4, 0]
  ],
  turn: 0,
};

export default function gameState(state = initialState, action) {
  switch (action.type) {
    case EMPTY_HOLE:
      var board = cloneBoard(state.board);
      var lastPiece = moveHole({board, turn: state.turn}, action.row, action.column);
      var turn = getNextTrun(state, action.row, action.column);
      if (shouldCapture(state, lastPiece))
        capture(board, lastPiece);
      return {turn, board}
    case RESTART_GAME:
      return initialState;
    default:
      return state
  }
}

function cloneBoard(board) {
  return [board[0].slice(0), board[1].slice(0)];
}

function moveHole(state, row, column) {
  var count = state.board[row][column];
  state.board[row][column] = 0;
  return moveRecursive(state, row, column, count);
}

function moveRecursive({board, turn}, row, column, count) {
  if (count === 0) return {row, column};
  if (row === 0) { // move left
    if (column > 0) {
      column--;
      if (column === 0 && turn === 1) row++;
    } else {
      row++;
    }
  } else { // move right
    if (column < board[1].length-1) {
      column++;
      if (column === board[1].length-1 && turn === 0) row--;
    } else {
      row--;
    }
  }
  board[row][column]++;
  return moveRecursive({board, turn}, row, column, count-1);
}

function getNextTrun(state, row, column) {
  var hand = state.board[row][column];
  var nHand = hand % 13;
  if (state.turn === 0) {
    if (nHand === column) return 0;
  } else {
    if (nHand === 6 - column) return 1;
  }
  return state.turn === 0 ? 1: 0;
}

function shouldCapture(state, {row, column}) {
  return (state.turn === row &&
    state.board[row][column] === 0 &&
    !isScoreHole({row, column}));
}

function capture(board, {row, column}) {
  board[row][column]--;
  var count = 1;
  if (row === 0) {
    count += board[1][column-1];
    board[1][column-1] = 0;
    board[0][0] += count;
  } else {
    count += board[0][column+1];
    board[0][column+1] = 0;
    board[1][board[1].length-1] += count;
  }
}

function isScoreHole({row, column}) {
  return row === 0 && column === 0 ||
    row === 1 && column === 6;
}
