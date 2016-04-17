
const initialState = [[
0, 3, 3, 3, 3, 3, 3],
[3, 3, 3, 3, 3, 3, 0]];

export default function board(board = initialState, action) {
  switch (action.type) {
    case 'EMPTY_HOLE':
      var newBoard = cloneBoard(board);
      newBoard = moveHole(newBoard, action.row, action.column);
      // newBoard = captureHole(board);
      return newBoard
    default:
      return board
  }
}

function cloneBoard(board) {
  return [board[0].slice(0), board[1].slice(0)];
}

function moveHole(board, row, column) {
  var count = board[row][column];
  board[row][column] = 0;
  return moveRecursive(board, row, column, count);
}

function moveRecursive(board, row, column, count) {
  // if (count === 0) return {board, lastPiece: {row, column}};
  if (count === 0) return board;
  if (row === 0) {
    // move left
    if (column > 0) {
      column--;
    } else {
      row++;
    }
  } else {
    // move right
    if (column < board[1].length-1) {
      column++;
    } else {
      row--;
    }
  }
  board[row][column]++;
  return moveRecursive(board, row, column, count-1);
}
