import * as actionTypes from "./actionTypes";

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

export const purchaseBurger = (orderData, token) => ({
  type: actionTypes.PURCHASE_BURGER,
  orderData: orderData,
  token: token,
});

export const purchaseInit = () => ({ type: actionTypes.PURCHASE_INIT });

export const fetchOrderSuccess = (order) => ({
  type: actionTypes.FETCH_ORDER_SUCCESS,
  orders: order,
});

export const fetchOrderFail = (error) => ({
  type: actionTypes.FETCH_ORDER_FAIL,
  error: error,
});

export const fetchOrderStart = () => ({
  type: actionTypes.FETCH_ORDER_START,
});

export const fetchOrder = (token, userId) => ({
  type: actionTypes.FETCH_ORDER,
  token: token,
  userId: userId,
});
