import { combineReducers } from 'redux';
import user from './user'; // nome do primeiro reducer
import player from './game';

const rootReducer = combineReducers({ // linka os reducers com o rootReducer neste formato
  user,
  player,
});

export default rootReducer;
