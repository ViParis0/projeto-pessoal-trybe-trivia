import { CLEAR_STATE, GET_QUESTIONS, SEND_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  questions: [],

};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state,
      questions: action.payload,
    };
  case SEND_SCORE:
    return { ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  case CLEAR_STATE:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default gameReducer;
