import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from '../components/Board';
import { isGameOver, finalScore, resetGame } from '../actions';
import { animateAppendChild } from '../actions/animate';

const duration = 1500;
const spacing = 250;
const linger = 100;

class AnimatedBoard extends Component {

  constructor (props) {
    super(props)
    this.state = {
      delayedProps: props,
    }

    // method bindings
    this.getBucket = this.getBucket.bind(this);
    this.performAnimationStep = this.performAnimationStep.bind(this);
    this.animateMoveBead = this.animateMoveBead.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    const {board, animationSteps} = nextProps;
    if (this.props.board !== board) {
      const animations = animationSteps.map(this.performAnimationStep)
      Promise.all(animations).then(() => this.setState({delayedProps: nextProps}))
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.props === nextProps;
  }

  getBucket ({row, column}) {
    return this.refs.board.getBucket(row, column)
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
          duration: duration,
          linger: (steps.length - 1 - i) * spacing + linger,
          fakeAppend: true
        })
        .then(resolve)
      }, i * spacing)
    })
  }

  render () {
    return (
      <Board
        ref="board"
        {...this.state.delayedProps}
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
