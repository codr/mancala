
export default class MoveRecorder {
  constructor (action) {
    this.origin = {
      row: action.row,
      column: action.column,
    };
    this.steps = [];

    // method bindings
    this.moveBead = this.moveBead.bind(this);
  }

  moveBead (row, column) {
    this.steps.push({
      type: 'MOVE_BEAD',
      start: this.origin,
      end: {row, column}
    })
  }
}
