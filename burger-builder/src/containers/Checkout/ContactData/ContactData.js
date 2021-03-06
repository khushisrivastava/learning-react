import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import axios from "../../../axios-order";
import withErrorHandeler from "../../withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

function ContactData(props) {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      validation: {
        required: true,
      },
      valid: false,
      value: "",
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      validation: {
        required: true,
      },
      valid: false,
      value: "",
      touched: false,
    },
    zipcode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code",
      },
      validation: {
        required: true,
        minLength: 5,
        maxLength: 6,
        isNumeric: true,
      },
      valid: false,
      value: "",
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      validation: {
        required: true,
      },
      valid: false,
      value: "",
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your E-Mail",
      },
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      value: "",
      touched: false,
    },
    delivery: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      validation: {},
      valid: true,
      value: "fastest",
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandeler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let elem in orderForm) {
      formData[elem] = orderForm[elem].value;
    }

    const order = {
      userId: props.userId,
      ingredient: props.ings,
      price: props.price,
      orderData: formData,
    };

    props.onOrderBurger(order, props.token);
    props.resetBuildingState();
  };

  const checkValidity = (value, rule) => {
    let isValid = true;

    if (rule.required) {
      isValid = value.trim() && isValid;
    }

    if (rule.minLength) {
      isValid = value.length >= rule.minLength && isValid;
    }

    if (rule.maxLength) {
      isValid = value.length <= rule.maxLength && isValid;
    }

    if (rule.isEmail) {
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rule.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  const inputChangedHandeler = (event, identifier) => {
    const updatedOrderForm = { ...orderForm };
    const updatedFormElement = { ...updatedOrderForm[identifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[identifier] = updatedFormElement;

    let formIsValid = true;
    for (let elem in updatedOrderForm) {
      formIsValid = updatedOrderForm[elem].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementArray = [];
  for (let element in orderForm) {
    formElementArray.push({
      key: element,
      config: orderForm[element],
    });
  }

  let form = (
    <form onSubmit={orderHandeler}>
      {formElementArray.map((ele) => (
        <Input
          elementType={ele.config.elementType}
          elementConfig={ele.config.elementConfig}
          input={ele.config.input}
          key={ele.key}
          invalid={!ele.config.valid}
          shouldValidate={ele.config.validation}
          touched={ele.config.touched}
          changed={(event) => inputChangedHandeler(event, ele.key)}
        />
      ))}
      <Button btnType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact details.</h4>
      {form}
    </div>
  );
}

const mapStateToProps = (state) => ({
  ings: state.burgerBuilder.ingredient,
  price: state.burgerBuilder.price,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  onOrderBurger: (order, token) =>
    dispatch(actions.purchaseBurger(order, token)),
  resetBuildingState: () => dispatch(actions.resetBurgerBuilding()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandeler(withRouter(ContactData), axios));
