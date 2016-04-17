import React from 'react';
import ClickableHole from '../containers/ClickableHole';

const ActiveHoles = () => (
  <div>
    {ActiveHoles.renderColumn(1)}
    {ActiveHoles.renderColumn(2)}
    {ActiveHoles.renderColumn(3)}
    {ActiveHoles.renderColumn(4)}
    {ActiveHoles.renderColumn(5)}
    {ActiveHoles.renderColumn(6)}
  </div>
);

ActiveHoles.renderColumn = (column) => (
  <div className="col-sm-1" style={{textAlign: 'center'}}>
    <ClickableHole
      className="btn btn-default"
      row={0}
      column={column}
    />
    <ClickableHole
      className="btn btn-default"
      row={1}
      column={column-1}
    />
  </div>
);

export default ActiveHoles
