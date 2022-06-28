export const SEND_USER_DATA = 'SEND_USER_DATA';
export const SEND_TOKEN = 'SEND_TOKEN';

export const addUserData = (email, user) => ({
  type: SEND_USER_DATA,
  email,
  user,
});

export const getUserToken = (token) => ({
  type: SEND_TOKEN,
  payload: token,
});

export const fetchTokenThunk = (email, user) => (dispatch) => {
  dispatch(addUserData(email, user));
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((data) => dispatch(getUserToken(data.token)));
};
