import React, { Component } from 'react';
import classNames from 'classnames';

export default class Hole extends Component {

  render () {
    const {onClick, value, active} = this.props;
    const className = classNames(this.props.className, {
      disabled: !active,
      'btn-primary': active,
      'not-allowed': value === 0,
    })
    return (
      <button
        className={className}
        onClick={(value !== 0) && active && onClick}>
        <div ref={this.props.setBucketRef} className="bead-container">
          {Array(value).fill().map((u, i) =>
            <span key={i} className="glyphicon glyphicon-record" />
          )}
        </div>
        {value}
      </button>
    );
  }

}
