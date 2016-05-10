import React from 'react';

const EndHole = ({value, ...props}) => (
  <div {...props} style={{height: '13em'}}>
    <button
      className="btn btn-default btn-block disabled"
      style={{height: '100%'}}>
      <div className="bead-container">
        {Array(value).fill().map((u, i) =>
          <span key={i} className="glyphicon glyphicon-record" />
        )}
      </div>
      {value}
    </button>
  </div>
);

export default EndHole
