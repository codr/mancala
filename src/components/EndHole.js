import React, { Component } from 'react';
import classNames from 'classnames';

export default class EndHole extends Component {

  render () {
    const {value, className} = this.props;
    return (
      <div className={classNames(className, 'end-hole')}>
        <button
          className="btn btn-default disabled"
          style={{height: '100%'}}>
          <div ref="bucket" className="bead-container">
            {Array(value).fill().map((u, i) =>
              <span key={i} className="glyphicon glyphicon-record" />
            )}
          </div>
          {value}
        </button>
      </div>
    );
  }
}
