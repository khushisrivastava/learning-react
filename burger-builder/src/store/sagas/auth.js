import { put, delay } from "redux-saga/effects";
import axios from "axios";
import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put({
    type: actionTypes.AUTH_LOGOUT,
  });
}

export function* checkTimeOutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.authLogout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9Hr_EypV-GEg75jMnSaaYZRwYt3PlOLE";
  if (!action.isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9Hr_EypV-GEg75jMnSaaYZRwYt3PlOLE";
  }

  try {
    const res = yield axios.post(url, authData);
    yield localStorage.setItem("token", res.data.idToken);
    yield localStorage.setItem(
      "expirationDate",
      new Date(new Date().getTime() + res.data.expiresIn * 1000)
    );
    yield localStorage.setItem("userId", res.data.localId);
    yield put(actions.authSucess(res.data.idToken, res.data.localId));
    yield put(actions.checkTimeOut(res.data.expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.authLogout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );

    if (expirationDate > new Date()) {
      yield put(actions.authSucess(token, localStorage.getItem("userId")));
      yield put(
        actions.checkTimeOut(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      yield put(actions.authLogout());
    }
  }
}
