import { put } from "redux-saga/effects";
import axios from "../../axios-order";
import * as actions from "../actions";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios.post(
      "/order.json?auth=" + action.token,
      action.orderData
    );
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrderSaga(action) {
  yield put(actions.fetchOrderStart());
  try {
    const res = yield axios.get(
      `/order.json?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`
    );
    const fetchedOrders = [];
    for (let key in res.data) {
      fetchedOrders.push({ ...res.data[key], id: key });
    }
    yield put(actions.fetchOrderSuccess(fetchedOrders));
  } catch (err) {
    yield put(actions.fetchOrderFail(err));
  }
}
