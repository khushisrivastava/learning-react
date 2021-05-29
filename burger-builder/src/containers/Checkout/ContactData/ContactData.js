import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-order";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandeler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredient: this.props.ingredient,
      price: this.props.price,
      customer: {
        name: "Test Test",
        address: {
          street: "Test Street",
          zipcode: "123456",
          country: "Test Country",
        },
        email: "test@test.com",
      },
      delivery: "fastest",
    };

    axios
      .post("/order.json", order)
      .then(() => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(() => this.setState({ loading: false }));
  };

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your Name" />
        <input type="text" name="email" placeholder="Your Email" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" click={this.orderHandeler}>
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
