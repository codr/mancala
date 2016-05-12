import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from '../components/Board';
import { isGameOver, finalScore, resetGame } from '../actions';
import { animateAppendChild } from '../util/animate';

const DURATION = 500; // time bead takes to animate
const SPACING = 250; // time between each bead animation
const LINGER = 100; // time to pause after animation is complete

class AnimatedBoard extends Component {

  constructor (props) {
    super(props)
    this.state = {
      delayedProps: props,
    }

    this.buckets = [[],[]];
    this.propsQueue = [];

    // method bindings
    this.processProps = this.processProps.bind(this);
    this.setBucketRef = this.setBucketRef.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.board !== nextProps.board) {
      this.throttleProps(nextProps, this.processProps);
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    // don't update if props have changed.
    return this.props === nextProps;
  }

  throttleProps (props, fn) {
    if (this.processingProps) {
      this.propsQueue.push(props);
    } else {
      this.processingProps = true;
      fn(props)
      .then(() => {
        this.processingProps = false;
        const nextProps = this.propsQueue.shift();
        nextProps && this.throttleProps(nextProps, fn);
      })
    }
  }

  processProps (nextProps) {
    const {animationSteps, ...delayedProps} = nextProps;
    return this.performAnimations(animationSteps)
    .then(() =>
      this.setDelayedPropsAfter(delayedProps, LINGER)
    )
  }

  setDelayedPropsAfter(delayedProps, wait) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.setState({delayedProps});
        resolve();
      }, wait)
    });
  }

  performAnimations (animationSteps) {
    const moves = animationSteps.filter(a => a.type === 'MOVE_BEAD');
    const capture = animationSteps.find(a => a.type === 'CAPTURE_HOLE');

    const animateMoves = moves.map(this.animateMoveBead, this);

    return Promise.all(animateMoves)
    .then(movedBeads => movedBeads[movedBeads.length-1])
    .then(lastMovedBead => {
      return capture && this.animateCapture(capture, lastMovedBead);
    })
  }

  animateMoveBead (step) {
    const {start, end, index} = step;
    const destination = this.getBucket(end);
    const origin = this.getBucket(start);
    const invertedIndex = origin.children.length - 1 - index;
    const bead = origin.children[invertedIndex];
    bead.style.color = 'red';

    return new Promise((resolve) => {
      setTimeout(() => {
        animateAppendChild.call(destination, bead, {
          duration: DURATION,
          delay: 100,
          fakeAppend: true
        })
        .then(() => resolve(bead))
      }, invertedIndex * SPACING)
    })
  }

  animateCapture (step, lastMovedBead) {
    const {hole} = step;
    const scoreBucket = this.getBucket(hole);
    let destination;
    let capturedBucket;
    if (hole.row === 0){
      destination = this.getBucket({
        row: 0,
        column: 0
      });
      capturedBucket = this.getBucket({
        row: 1,
        column: hole.column-1,
      })
    } else {
      destination = this.getBucket({
        row: 1,
        column: this.props.board[1].length-1,
      });
      capturedBucket = this.getBucket({
        row: 0,
        column: hole.column+1,
      })
    }

    const beads = [
      lastMovedBead,
      ...scoreBucket.children,
      ...capturedBucket.children,
    ]

    const animations = Array.prototype.map.call(beads, (bead, index) =>
      new Promise(resolve => {
        bead.style.color = 'green';
        setTimeout(() => {
          animateAppendChild.call(destination, bead, {
            duration: DURATION,
            fakeAppend: true
          })
          .then(resolve);
        }, index * SPACING);
      })
    )

    return Promise.all(animations);
  }

  getBucket ({row, column}) {
    return this.buckets[row][column];
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
