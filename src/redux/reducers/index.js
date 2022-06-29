import { combineReducers } from 'redux';
import user from './user'; // nome do primeiro reducer
import game from './game';

const rootReducer = combineReducers({ // linka os reducers com o rootReducer neste formato
  user,
  game,
});

export default rootReducer;
