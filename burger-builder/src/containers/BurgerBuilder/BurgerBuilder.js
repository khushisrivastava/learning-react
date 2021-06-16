import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-order";
import withErrorHandler from "../withErrorHandler/withErrorHandler";

function BurgerBuilder(props) {
  const [purchasing, setPurchasing] = useState(false);
  const { onInitIngredients } = props;

  useEffect(() => {
    if (!props.isBuild) {
      onInitIngredients();
    }
  }, [onInitIngredients]);

  const purchaseHandeler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandeler = () => setPurchasing(false);

  const purchaseContinueHandeler = () => {
    props.OnInitPurchase();
    props.history.push("/checkout");
  };

  const updatePurchasable = (ingredient) => {
    const sum = Object.values(ingredient).reduce((a, b) => a + b, 0);
    return sum > 0;
  };

  const disableInfo = { ...props.ings };
  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }
  let orderSummary = null;
  let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  if (props.ings) {
    burger = (
      <Fragment>
        <Burger ingredients={props.ings} />
        <BuildControls
          price={props.price}
          add={props.onIngredientAdded}
          remove={props.onIngredientRemoved}
          disabled={disableInfo}
          purchasable={!updatePurchasable(props.ings)}
          purchase={purchaseHandeler}
          isAuth={props.isAuthenticated}
        />
      </Fragment>
    );
    orderSummary = (
      <OrderSummary
        cancel={purchaseCancelHandeler}
        continue={purchaseContinueHandeler}
        ingredients={props.ings}
        price={props.price}
      />
    );
  }

  return (
    <Fragment>
      <Modal show={purchasing} modalClosed={purchaseCancelHandeler}>
        {orderSummary}
      </Modal>
      {burger}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  ings: state.burgerBuilder.ingredient,
  price: state.burgerBuilder.price,
  error: state.burgerBuilder.error,
  isAuthenticated: state.auth.token !== null,
  isBuild: state.burgerBuilder.building,
});

const mapDispatchToProps = (dispatch) => ({
  onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
  onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  OnInitPurchase: () => dispatch(actions.purchaseInit()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
