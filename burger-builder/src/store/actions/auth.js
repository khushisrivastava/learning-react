import axios from "axios";
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

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkTimeOut = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(authLogout());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignUp) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9Hr_EypV-GEg75jMnSaaYZRwYt3PlOLE";
  if (!isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9Hr_EypV-GEg75jMnSaaYZRwYt3PlOLE";
  }

  axios
    .post(url, authData)
    .then((res) => {
      localStorage.setItem("token", res.data.idToken);
      localStorage.setItem(
        "expirationDate",
        new Date(new Date().getTime() + res.data.expiresIn * 1000)
      );
      localStorage.setItem("userId", res.data.localId);
      dispatch(authSucess(res.data.idToken, res.data.localId));
      dispatch(checkTimeOut(res.data.expiresIn));
    })
    .catch((err) => dispatch(authFail(err.response.data.error)));
};

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(authLogout());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate > new Date()) {
      dispatch(authSucess(token, localStorage.getItem("userId")));
      dispatch(
        checkTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000)
      );
    } else {
      dispatch(authLogout());
    }
  }
};
