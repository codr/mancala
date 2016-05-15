import React, { Component } from 'react';
import { connect } from 'react-redux';

import AnimatedBoard from '../components/AnimatedBoard';
import { isGameOver, finalScore, resetGame, emptyHole } from '../actions';
import { onPlayerNumber } from '../auth';

class PlayersBoard extends Component {

  constructor (props) {
    super(props);

    this.state = {
      playerNumber: -1,
    };

    // method bindings
    this.onHoleClick = this.onHoleClick.bind(this);
  }

  componentDidMount () {
    onPlayerNumber(playerNumber => {
      this.setState({playerNumber});
    });
  }

  invertBoard (board) {
    // Careful not to alter the original data.
    return [
      board[1].slice(0).reverse(),
      board[0].slice(0).reverse(),
    ];
  }

  invertAnimations (animationSteps) {
    // Here we can modify the data because
    // the animation step are 1 time use.
    return animationSteps.map(step => {
      switch(step.type) {
        case 'MOVE_BEAD':
          step.start = this.invertHole(step.start);
          step.end = this.invertHole(step.end);
          break;
        case 'CAPTURE_HOLE':
          step.hole = this.invertHole(step.hole);
          break;
      }
      return step;
    });
  }

  normalizedProps (props) {
    if (this.state.playerNumber !== 0) return props;
    return {
      ...props,
      board: this.invertBoard(props.board),
      turn: props.turn === 1 ? 0 : 1 ,
      animationSteps: this.invertAnimations(props.animationSteps),
    };
  }

  invertHole ({row, column}) {
    const {board} = this.props;
    return {
      row: board.length - 1 - row,
      column: board[0].length - 1 - column,
    };
  }

  getRealHole (row, column) {
    if (this.state.playerNumber !== 0)
      return {row, column};
    return this.invertHole({row, column});
  }

  onHoleClick (row, column) {
    const {row: realRow, column: realColumn} = this.getRealHole(row, column);
    this.props.onHoleClick(realRow, realColumn);
  }

  render () {
    return (
      <AnimatedBoard
        {...this.normalizedProps(this.props)}
        onHoleClick={this.onHoleClick}
      />
    );
  }

}

const mapStateToProps = (state/*, ownProps*/) => {
  const {board, turn, animationSteps} = state.gameState;
  return {
    board,
    turn,
    animationSteps,
    isGameOver: isGameOver(board),
    finalScore: finalScore(board),
  };
};

const mapDispatchToProps = (dispatch/*, ownProps*/) => {
  return {
    resetGame: () => {
      dispatch(resetGame());
    },
    onHoleClick: (row, column) => {
      dispatch(emptyHole(row, column));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayersBoard);
