import React from 'react';
import EndHole from './EndHole';
import ActiveHoles from './ActiveHoles';
import GameOverModal from './GameOverModal';

const Board = ({ board, isGameOver, finalScore }) => (
  <div className="row">
    <EndHole
      className="col-sm-offset-2 col-sm-1"
      value={board[0][0]}
    />
    <ActiveHoles />
    <EndHole
      className="col-sm-1"
      value={board[1][board[1].length-1]}
    />
    <GameOverModal
      isOpen={isGameOver}
      score={finalScore}
    />
  </div>
);

export default Board
