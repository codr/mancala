import React, { Component } from 'react';
import Hole from '../components/Hole';

export default class ActiveHoles extends Component {

  render () {
    return (
      <div>
        {this.renderColumn(1)}
        {this.renderColumn(2)}
        {this.renderColumn(3)}
        {this.renderColumn(4)}
        {this.renderColumn(5)}
        {this.renderColumn(6)}
      </div>
    );
  }

  renderColumn (column) {
    return (
      <div className="col-sm-1 text-center" style={{direction: 'rtl'}}>
        {this.renderHole(0, column)}
        {this.renderHole(1, column-1)}
      </div>
    );
  }

  renderHole (row, column) {
    const {setBucketRef, board, turn, onHoleClick} = this.props;
    return (
      <Hole
        setBucketRef={bucketRef => setBucketRef(row, column, bucketRef)}
        className="btn btn-default"
        style={{direction: 'ltr'}}
        value={board[row][column]}
        active={turn === row}
        onClick={() => onHoleClick(row, column)}
      />
    );
  }

}
