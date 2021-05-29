import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import axios from "../../../axios-order";

class ContactData extends Component {
  state = {
    orderForm: {
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
        value: "",
      },
    },
    loading: false,
    formIsValid: false,
  };

  orderHandeler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const formData = {};
    for (let elem in this.state.orderForm) {
      formData[elem] = this.state.orderForm[elem].value;
    }

    const order = {
      ingredient: this.props.ingredient,
      price: this.props.price,
      orderData: formData,
    };

    axios
      .post("/order.json", order)
      .then(() => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(() => this.setState({ loading: false }));
  };

  checkValidity(value, rule) {
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
    return isValid;
  }

  inputChangedHandeler = (event, identifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
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

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementArray = [];
    for (let element in this.state.orderForm) {
      formElementArray.push({
        key: element,
        config: this.state.orderForm[element],
      });
    }

    let form = (
      <form onSubmit={this.orderHandeler}>
        {formElementArray.map((ele) => (
          <Input
            elementType={ele.config.elementType}
            elementConfig={ele.config.elementConfig}
            input={ele.config.input}
            key={ele.key}
            invalid={!ele.config.valid}
            shouldValidate={ele.config.validation}
            touched={ele.config.touched}
            changed={(event) => this.inputChangedHandeler(event, ele.key)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact details.</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
