import React, { useEffect } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order/Order";
import axios from "../../axios-order";
import withError from "../withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

function Orders(props) {
  const { onFetchOrders } = props;

  useEffect(() => {
    onFetchOrders(props.token, props.userId);
  }, [onFetchOrders]);

  let orders = <Spinner />;

  if (!props.loading) {
    orders = props.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredient}
        price={order.price}
      />
    ));
  }

  return <div>{orders}</div>;
}

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: (token, userId) => dispatch(actions.fetchOrder(token, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(Orders, axios));
