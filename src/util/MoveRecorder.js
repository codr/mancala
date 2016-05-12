
export default class MoveRecorder {
  constructor ({row, column}) {
    this.origin = {row, column};
    this.steps = [];

    // method bindings
    this.moveBead = this.moveBead.bind(this);
    this.capture = this.capture.bind(this);
  }

  moveBead (row, column, index) {
    this.steps.push({
      type: 'MOVE_BEAD',
      start: this.origin,
      end: {row, column},
      index,
    })
  }

  capture (hole) {
    this.steps.push({
      type: 'CAPTURE_HOLE',
      hole,
    })
  }
}
