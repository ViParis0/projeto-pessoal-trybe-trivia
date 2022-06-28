import { combineReducers } from 'redux';
import user from './user'; // nome do primeiro reducer

const rootReducer = combineReducers({ // linka os reducers com o rootReducer neste formato
  user,
});

export default rootReducer;
