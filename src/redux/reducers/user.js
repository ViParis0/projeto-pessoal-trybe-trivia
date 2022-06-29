import { SEND_TOKEN, SEND_USER_DATA } from '../actions';

const INITIAL_STATE = {
  email: '',
  user: '',
  token: '',
  responseCode: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_USER_DATA:
    return {
      ...state,
      email: action.email,
      user: action.user,
    };
  case SEND_TOKEN:
    return { ...state,
      token: action.payload.token,
      responseCode: action.payload.response_code,
    };
  default:
    return state;
  }
};

export default userReducer;
