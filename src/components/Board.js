import React from 'react';
import EndHole from './EndHole';
import ActiveHoles from './ActiveHoles';

const Board = ({ board }) => (
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
  </div>
);

export default Board
