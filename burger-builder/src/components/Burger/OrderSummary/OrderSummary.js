import React, { Fragment } from "react";
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ing) => (
    <li key={ing}>
      <span style={{ textTransform: "capitalize" }}>{ing}</span>:{" "}
      {props.ingredients[ing]}
    </li>
  ));
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>Delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" click={props.cancel}>CANCEL</Button>
      <Button btnType="Success" click={props.continue}>CONTINUE</Button>
    </Fragment>
  );
};

export default orderSummary;
