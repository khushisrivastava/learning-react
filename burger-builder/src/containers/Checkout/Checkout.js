import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

function Checkout(props) {
  const checkoutCancelHandeler = () => props.history.goBack();

  const checkoutContinueHandeler = () =>
    props.history.replace("/checkout/contact-data");

  let summary = <Redirect to="/" />;

  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;

    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCancel={checkoutCancelHandeler}
          checkoutContinue={checkoutContinueHandeler}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }

  return summary;
}

const mapStateToProps = (state) => ({
  ings: state.burgerBuilder.ingredient,
  purchased: state.order.purchased,
});

export default connect(mapStateToProps)(Checkout);
