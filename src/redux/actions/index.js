export const SEND_USER_DATA = 'SEND_USER_DATA';
export const SEND_TOKEN = 'SEND_TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SEND_SCORE = 'SEND_SCORE';

export const addUserData = (email, user) => ({
  type: SEND_USER_DATA,
  email,
  user,
});

export const getUserToken = (token) => ({
  type: SEND_TOKEN,
  payload: token,
});

export const getQuestions = (questions) => ({
  type: GET_QUESTIONS,
  payload: questions,
});

export const sendScore = (score) => ({
  type: SEND_SCORE,
  payload: score,
});

export const fetchTokenThunk = (email, user) => async (dispatch) => {
  const returnFetch = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await returnFetch.json();
  localStorage.setItem('token', data.token);
  dispatch(getUserToken(data));
  dispatch(addUserData(email, user));
};

export const fetchQuestionsThunk = (token) => (dispatch) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((response) => response.json())
  .then((data) => dispatch(getQuestions(data.results)));
