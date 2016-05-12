import React, { Component } from 'react';
import classNames from 'classnames';
import AnimatedBucket from '../components/AnimatedBucket';

export default class EndHole extends Component {

  render () {
    const {value, className, ...props} = this.props;
    return (
      <div className={classNames(className, 'end-hole')}>
        <button
          className="btn btn-default disabled"
          style={{height: '100%'}}>
          <AnimatedBucket
            {...props}
            value={value}
          />
          {value}
        </button>
      </div>
    );
  }
}
