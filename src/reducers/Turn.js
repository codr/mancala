
export default function turn(turn = 1, action) {
  switch (action.type) {
    case 'EMPTY_HOLE':
      // debugger;
      return turn === 0 ? 1 : 0;
    default:
      return turn
  }
}
