import { connect } from 'react-redux'
import { emptyHole } from '../actions'
import Board from '../components/Board'

const mapStateToProps = (state, ownProps) => {
  return {
    board: state.gameState.board
  }
}

const BoardContainer = connect(
  mapStateToProps,
)(Board)

export default BoardContainer