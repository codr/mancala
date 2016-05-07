import { connect } from 'react-redux';
import { emptyHole } from '../actions';
import Hole from '../components/Hole';

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.gameState.board[ownProps.row][ownProps.column],
    active: state.gameState.turn === ownProps.row,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(emptyHole(ownProps.row, ownProps.column));
    }
  };
}

const ClickableHole = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Hole)

export default ClickableHole
