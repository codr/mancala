import { connect } from 'react-redux';
import { emptyHole } from '../actions';
import Hole from '../components/Hole';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(emptyHole(ownProps.row, ownProps.column));
    }
  };
}

const ClickableHole = connect(
  null,
  mapDispatchToProps,
)(Hole)

export default ClickableHole
