import React, { Component } from 'react';

export default class AnimatedBucket extends Component {

  componentDidMount () {
    this.props.setBucketRef(this.refs.bucket);
  }

  componentWillUpdate () {
    const clearAnimation = this.refs.bucket.clearAnimation;
    clearAnimation && clearAnimation();
  }

  render () {
    const {value} = this.props;
    return (
      <div ref="bucket" className="bead-container">
        {Array(value).fill().map((u, i) =>
          <span key={i} className="glyphicon glyphicon-record" />
        )}
      </div>
    );
  }

}
