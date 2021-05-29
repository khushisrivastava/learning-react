import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-order";
import withErrorHandler from "../withErrorHandler/withErrorHandler";

const INGREDIENT_PRICE = {
  bacon: 0.7,
  meat: 1.3,
  cheese: 0.5,
  salad: 0.5,
};

class BurgerBuilder extends Component {
  state = {
    ingredient: null,
    price: 4,
    purchasable: false,
    purchasing: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("/ingredient.json")
      .then((response) => {
        this.setState({ ingredient : response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  purchaseHandeler = () => this.setState({ purchasing: true });

  purchaseCancelHandeler = () => this.setState({ purchasing: false });

  purchaseContinueHandeler = () => {
    const queryParams = []
    for (let i in this.state.ingredient) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredient[i]))
    }
    queryParams.push('price=' + this.state.price);
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParams.join('&')
    });
  };

  updatePurchasable = (ing) => {
    const ingredient = { ...ing };
    const sum = Object.values(ingredient).reduce((a, b) => a + b, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandeler = (type) => {
    const ingredient = { ...this.state.ingredient };
    const price = this.state.price;
    ingredient[type] = ingredient[type] + 1;
    this.setState({
      price: price + INGREDIENT_PRICE[type],
      ingredient: ingredient,
    });
    this.updatePurchasable(ingredient);
  };

  removeIngredientHandeler = (type) => {
    const ingredient = { ...this.state.ingredient };
    const price = this.state.price;
    if (ingredient[type] <= 0) {
      return;
    }
    ingredient[type] = ingredient[type] - 1;
    this.setState({
      price: price - INGREDIENT_PRICE[type],
      ingredient: ingredient,
    });
    this.updatePurchasable(ingredient);
  };

  render() {
    const disableInfo = { ...this.state.ingredient };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredient) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredient} />
          <BuildControls
            price={this.state.price}
            add={this.addIngredientHandeler}
            remove={this.removeIngredientHandeler}
            disabled={disableInfo}
            purchasable={!this.state.purchasable}
            purchase={this.purchaseHandeler}
          />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
        cancel={this.purchaseCancelHandeler}
        continue={this.purchaseContinueHandeler}
        ingredients={this.state.ingredient}
        price={this.state.price}
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

export default withErrorHandler(BurgerBuilder, axios);
