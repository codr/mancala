import React from 'react';
import classNames from 'classnames';

const EndHole = ({value, className}) => (
  <div className={classNames(className, 'end-hole')}>
    <button
      className="btn btn-default disabled"
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
