import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from '../components/Board';
import { isGameOver, finalScore, resetGame } from '../actions';
import { animateAppendChild } from '../actions/animate';

const DURATION = 1500;
const SPACING = 250;
const LINGER = 100;

class AnimatedBoard extends Component {

  constructor (props) {
    super(props)
    this.state = {
      delayedProps: props,
    }

    this.buckets = [[],[]];

    // method bindings
    this.getBucket = this.getBucket.bind(this);
    this.performAnimationStep = this.performAnimationStep.bind(this);
    this.animateMoveBead = this.animateMoveBead.bind(this);
    this.setBucketRef = this.setBucketRef.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    const {board, animationSteps} = nextProps;
    if (this.props.board !== board) {
      const animations = animationSteps.map(this.performAnimationStep)
      Promise.all(animations).then(() => {
        this.setState({delayedProps: nextProps})
      })
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    // don't update if props have changed.
    return this.props === nextProps;
  }

  getBucket ({row, column}) {
    return this.buckets[row][column];
  }

  performAnimationStep (step, i, steps) {
    if (step.type === 'MOVE_BEAD') {
      return this.animateMoveBead(step, i, steps);
    }
  }

  animateMoveBead (step, i, steps) {
    const {start, end} = step;
    const container = this.getBucket(end);
    const bead = this.getBucket(start).children[i];
    bead.style.color = 'red';

    return new Promise((resolve) => {
      setTimeout(() => {
        animateAppendChild.call(container, bead, {
          duration: DURATION,
          linger: LINGER,
          fakeAppend: true
        })
        .then(resolve)
      }, i * SPACING)
    })
  }

  setBucketRef(row, column, bucket) {
    this.buckets[row][column] = bucket;
  }

  render () {
    return (
      <Board
        {...this.state.delayedProps}
        setBucketRef={this.setBucketRef}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {board, turn, animationSteps} = state.gameState;
  return {
    board,
    turn,
    animationSteps,
    isGameOver: isGameOver(board),
    finalScore: finalScore(board),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resetGame: () => {
      dispatch(resetGame());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnimatedBoard)
