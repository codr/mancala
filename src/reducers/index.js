import { combineReducers } from 'redux';
import board from './Board';
import turn from './Turn';

const rootReducer = combineReducers({
  board,
  turn,
});

export default rootReducer;
