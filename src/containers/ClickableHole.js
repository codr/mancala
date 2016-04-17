import { connect } from 'react-redux'
import { emptyHole } from '../actions'
import Hole from '../components/Hole'

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.board[ownProps.row][ownProps.column],
    active: state.turn === ownProps.row,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(updateTurn(ownProps.rown, ownProps.column));
      dispatch(emptyHole(ownProps.row, ownProps.column));
      // dispatch(checkCapture());
      // dispatch(checkEndGame());
    }
  }
}

const ClickableHole = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Hole)

export default ClickableHole