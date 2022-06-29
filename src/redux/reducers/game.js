import { GET_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: '',
  gravatarEmail: '',
  questions: [],

};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state,
      questions: action.payload,
    };
  default:
    return state;
  }
};

export default gameReducer;
