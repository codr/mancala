import { connect } from 'react-redux';
import { emptyHole } from '../actions';
import Hole from '../components/Hole';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      const {row, column} = ownProps.getRealHole(ownProps.row, ownProps.column);
      dispatch(emptyHole(row, column));
    },
  };
};

const ClickableHole = connect(
  null,
  mapDispatchToProps
)(Hole);

export default ClickableHole;
