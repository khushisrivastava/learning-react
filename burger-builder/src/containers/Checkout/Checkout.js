import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ing: null,
    price: 0,
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ing = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") price = +param[1];
      else ing[param[0]] = +param[1];
    }
    this.setState({ ing: ing, price: price });
  }

  checkoutCancelHandeler = () => this.props.history.goBack();

  checkoutContinueHandeler = () =>
    this.props.history.replace("/checkout/contact-data");

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ing}
          checkoutCancel={this.checkoutCancelHandeler}
          checkoutContinue={this.checkoutContinueHandeler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => (
            <ContactData ingredient={this.state.ing} price={this.state.price} />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
