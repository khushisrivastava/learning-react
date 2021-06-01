import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  checkoutCancelHandeler = () => this.props.history.goBack();

  checkoutContinueHandeler = () =>
    this.props.history.replace("/checkout/contact-data");

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancel={this.checkoutCancelHandeler}
          checkoutContinue={this.checkoutContinueHandeler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ings: state.ingredient,
});

export default connect(mapStateToProps)(Checkout);
