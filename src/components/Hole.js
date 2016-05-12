import React, { Component } from 'react';
import classNames from 'classnames';
import AnimatedBucket from '../components/AnimatedBucket';

export default class Hole extends Component {

  render () {
    const {onClick, value, active, setBucketRef, ...props} = this.props;
    const className = classNames(this.props.className, {
      disabled: !active,
      'btn-primary': active,
      'not-allowed': value === 0,
    })
    return (
      <button
        {...props}
        className={className}
        onClick={(value !== 0) && active && onClick}>
        <AnimatedBucket
          setBucketRef={setBucketRef}
          value={value}
        />
        {value}
      </button>
    );
  }

}
