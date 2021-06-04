import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
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
    if (!this.props.isBuild) {
      this.props.onInitIngredients();
    }
  }

  purchaseHandeler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandeler = () => this.setState({ purchasing: false });

  purchaseContinueHandeler = () => {
    this.props.OnInitPurchase();
    this.props.history.push("/checkout");
  };

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
            isAuth={this.props.isAuthenticated}
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
