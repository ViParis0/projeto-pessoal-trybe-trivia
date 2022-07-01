import { GET_QUESTIONS, SEND_SCORE } from '../actions';

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
  case SEND_SCORE:
    return { ...state,
      score: action.payload,
    };
  default:
    return state;
  }
};

export default gameReducer;
