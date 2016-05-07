import { connect } from 'react-redux'
import Board from '../components/Board'
import { isGameOver, finalScore } from '../actions'

const mapStateToProps = (state, ownProps) => {
  const board = state.gameState.board;
  return {
    board: board,
    gameOver: isGameOver(board),
    finalScore: finalScore(board),
  }
}

const BoardContainer = connect(
  mapStateToProps,
)(Board)

export default BoardContainer
