import React, { Component } from 'react';
import EndHole from './EndHole';
import ActiveHoles from './ActiveHoles';
import GameOverModal from './GameOverModal';

export default class Board extends Component {

  render () {
    const { turn, board, isGameOver, finalScore,
      resetGame, setBucketRef, onHoleClick } = this.props;
    return (
      <div className="row">
        <EndHole
          className="col-sm-offset-2 col-sm-1 text-center"
          value={board[0][0]}
          setBucketRef={bucketRef => setBucketRef(0, 0, bucketRef)}
        />
        <ActiveHoles
          board={board}
          turn={turn}
          setBucketRef={setBucketRef}
          onHoleClick={onHoleClick}
        />
        <EndHole
          className="col-sm-1 text-center"
          value={board[1][board[1].length-1]}
          setBucketRef={bucketRef => setBucketRef(1, board[1].length-1, bucketRef)}
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
