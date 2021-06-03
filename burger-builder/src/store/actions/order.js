import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData: orderData,
});

export const purchaseBurgerFail = (error) => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error: error,
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = (orderData) => (dispatch) => {
  dispatch(purchaseBurgerStart());
  axios
    .post("/order.json", orderData)
    .then((response) =>
      dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    )
    .catch((error) => dispatch(purchaseBurgerFail(error)));
};

export const purchaseInit = () => ({ type: actionTypes.PURCHASE_INIT });