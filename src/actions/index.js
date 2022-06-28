export const SEND_USER_DATA = 'SEND_USER_DATA';

export const addUserData = (email) => ({
  type: SEND_USER_DATA,
  email,
});
