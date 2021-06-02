import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as burgerBuilderActions from "../../store/actions/index";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-order";
import withErrorHandler from "../withErrorHandler/withErrorHandler";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  purchaseHandeler = () => this.setState({ purchasing: true });

  purchaseCancelHandeler = () => this.setState({ purchasing: false });

  purchaseContinueHandeler = () => this.props.history.push("/checkout");

  updatePurchasable = (ingredient) => {
    const sum = Object.values(ingredient).reduce((a, b) => a + b, 0);
    return sum > 0;
  };

  render() {
    const disableInfo = { ...this.props.ings };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            price={this.props.price}
            add={this.props.onIngredientAdded}
            remove={this.props.onIngredientRemoved}
            disabled={disableInfo}
            purchasable={!this.updatePurchasable(this.props.ings)}
            purchase={this.purchaseHandeler}
          />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          cancel={this.purchaseCancelHandeler}
          continue={this.purchaseContinueHandeler}
          ingredients={this.props.ings}
          price={this.props.price}
        />
      );
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  ings: state.ingredient,
  price: state.price,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  onIngredientAdded: (ingName) =>
    dispatch(burgerBuilderActions.addIngredient(ingName)),
  onIngredientRemoved: (ingName) =>
    dispatch(burgerBuilderActions.removeIngredient(ingName)),
  onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
