import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICE = {
  bacon: 0.7,
  meat: 1.3,
  cheese: 0.5,
  salad: 0.5,
};

class BurgerBuilder extends Component {
  state = {
    ingredient: {
      bacon: 0,
      salad: 0,
      cheese: 0,
      meat: 0,
    },
    price: 4,
    purchasable: false,
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

    return (
      <Fragment>
        <Burger ingredients={this.state.ingredient} />
        <BuildControls
          price={this.state.price}
          add={this.addIngredientHandeler}
          remove={this.removeIngredientHandeler}
          disabled={disableInfo}
          purchasable={!this.state.purchasable}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
