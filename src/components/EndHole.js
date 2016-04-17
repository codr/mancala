import React from 'react';

const EndHole = (props) => (
  <div {...props} style={{height: 68}}>
    <button
      className="btn btn-default btn-block disabled"
      style={{height: '100%'}}>
      {props.value}
    </button>
  </div>
);

export default EndHole
