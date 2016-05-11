import React, { Component } from 'react';
import ClickableHole from '../containers/ClickableHole';

export default class ActiveHoles extends Component {

  constructor (props) {
    super(props);

    // method bindings
    this.getBucket = this.getBucket.bind(this);
  }

  getBucket (row, column) {
    return this[`bucket${row}${column}`];
  }

  render () {
    return (
      <div style={{direction: 'rtl'}}>
        {this.renderColumn(1)}
        {this.renderColumn(2)}
        {this.renderColumn(3)}
        {this.renderColumn(4)}
        {this.renderColumn(5)}
        {this.renderColumn(6)}
      </div>
    );
  }

  renderColumn = (column) => (
    <div className="col-sm-1 text-center" style={{direction: 'ltr'}}>
      {this.renderHole(0, column)}
      {this.renderHole(1, column-1)}
    </div>
  );

  renderHole = (row, column) => (
    <ClickableHole
      setBucketRef={ref => this[`bucket${row}${column}`] = ref}
      className="btn btn-default"
      value={this.props.board[row][column]}
      active={this.props.turn === row}
      row={row}
      column={column}
    />
  );

}
