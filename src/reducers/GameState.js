import { EMPTY_HOLE, RESTART_GAME } from '../actions';
import MoveRecorder from '../util/MoveRecorder';

const initialState = {
  board:[
    [0, 8, 4, 4, 4, 4, 4],
    [4, 4, 4, 4, 4, 4, 0],
  ],
  turn: 0,
  animationSteps: [],
};

export default function gameState(state = initialState, action) {
  switch (action.type) {
    case EMPTY_HOLE:
      var board = cloneBoard(state.board);
      var recorder = new MoveRecorder(action);
      var lastPiece = moveHole(
        {board, turn: state.turn},
        action.row,
        action.column,
        recorder.moveBead
      );
      var turn = getNextTrun(state, action.row, action.column);
      if (shouldCapture(state, lastPiece)) {
        capture(board, lastPiece);
        recorder.capture(lastPiece);
      }
      return {
        turn,
        board,
        animationSteps: action.skipAnimation ? [] : recorder.steps,
      };
    case RESTART_GAME:
      return initialState;
    default:
      return state;
  }
}

function cloneBoard(board) {
  return [board[0].slice(0), board[1].slice(0)];
}

function moveHole(state, row, column, record) {
  var count = state.board[row][column];
  if (count === 0) return;
  state.board[row][column] = 0;
  return moveRecursive(state, row, column, count, record);
}

function moveRecursive({board, turn}, row, column, count, record) {
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
  record && record(row, column, count-1);
  return moveRecursive({board, turn}, row, column, count-1, record);
}

function getNextTrun(state, row, column) {
  var hand = state.board[row][column];
  if (hand === 0) return state.turn;
  var nHand = hand % 13;
  if (state.turn === 0) {
    if (nHand === column) return 0;
  } else {
    if (nHand === 6 - column) return 1;
  }
  return state.turn === 0 ? 1: 0;
}

function shouldCapture(state, {row, column} = {}) {
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
