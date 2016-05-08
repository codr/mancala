import React from 'react';
import classNames from 'classnames';

const Hole = ({onClick, className, value, active}) => (
  <button
    className={classNames(
      className,
      {
        disabled: !active,
        'btn-primary': active,
        'not-allowed': value === 0,
      }
    )}
    onClick={(value !== 0) && active && onClick}>
    {value}
  </button>
);

export default Hole
