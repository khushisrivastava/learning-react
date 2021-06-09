import * as actionTypes from "./actionTypes";

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSucess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken: token,
  userId: userId,
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error: error,
});

export const authLogout = () => ({
  type: actionTypes.AUTH_INITIATE_LOGOUT,
});

export const checkTimeOut = (expirationTime) => ({
  type: actionTypes.AUTH_CHECK_TIMEOUT,
  expirationTime: expirationTime,
});

export const auth = (email, password, isSignUp) => ({
  type: actionTypes.AUTH_USER,
  email: email,
  password: password,
  isSignUp: isSignUp,
});

export const authCheckState = () => ({
  type: actionTypes.AUTH_CHECK_INITIAL_STATE,
});
