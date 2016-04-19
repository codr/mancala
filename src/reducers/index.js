import { combineReducers } from 'redux';
import gameState from './GameState';

const rootReducer = combineReducers({
  gameState
});

export default rootReducer;
