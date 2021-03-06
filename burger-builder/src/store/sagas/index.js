import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import {
  logoutSaga,
  checkTimeOutSaga,
  authUserSaga,
  authCheckStateSaga,
} from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import { purchaseBurgerSaga, fetchOrderSaga } from "./order";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkTimeOutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENT, initIngredientsSaga);
}

export function* watchOrder() {
  yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDER, fetchOrderSaga);
}
