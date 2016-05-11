import React, { Component } from 'react';
import EndHole from './EndHole';
import ActiveHoles from './ActiveHoles';
import GameOverModal from './GameOverModal';

export default class Board extends Component {

  constructor (props) {
    super(props)

    // method bindings
    this.getBucket = this.getBucket.bind(this);
  }

  getBucket (row, column) {
    if (row === 0 && column === 0)
      return this.refs.end0.refs.bucket;
    if (row === 1 && column === 6)
      return this.refs.end1.refs.bucket;
    return this.refs.activeHoles.getBucket(row, column);
  }

  render () {
    const { turn, board, isGameOver, finalScore, resetGame } = this.props;
    return (
      <div className="row">
        <EndHole
          ref='end0'
          className="col-sm-offset-2 col-sm-1 text-center"
          value={board[0][0]}
        />
        <ActiveHoles ref="activeHoles" board={board} turn={turn} />
        <EndHole
          ref='end1'
          className="col-sm-1 text-center"
          value={board[1][board[1].length-1]}
        />
        <GameOverModal
          isOpen={isGameOver}
          score={finalScore}
          resetGame={resetGame}
        />
      </div>
    );
  }

}
