import { connect } from 'react-redux'
import Board from '../components/Board'
import { isGameOver, finalScore, resetGame } from '../actions'

const mapStateToProps = (state, ownProps) => {
  const board = state.gameState.board;
  return {
    board: board,
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

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)

export default BoardContainer
