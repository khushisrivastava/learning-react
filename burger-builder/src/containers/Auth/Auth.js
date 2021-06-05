import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address",
        },
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        value: "",
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        value: "",
        touched: false,
      },
    },
    isSignUp: true,
  };

  checkValidity(value, rule) {
    let isValid = true;

    if (rule.required) {
      isValid = value.trim() && isValid;
    }

    if (rule.minLength) {
      isValid = value.length >= rule.minLength && isValid;
    }

    if (rule.isEmail) {
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }

  inputChangedHandeler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  submitHandeler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
    if (this.props.isBuild && this.props.isAuthenticated) {
      this.props.history.push("/checkout");
    }
  };

  switchAuthModeHandeler = () =>
    this.setState((prevState) => ({
      isSignUp: !prevState.isSignUp,
    }));

  render() {
    const formElementArray = [];
    for (let element in this.state.controls) {
      formElementArray.push({
        key: element,
        config: this.state.controls[element],
      });
    }

    let form = formElementArray.map((ele) => (
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
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMsg = null;
    if (this.props.error) {
      errorMsg = <p>{this.props.error.message}</p>;
    }

    return (
      <div className={classes.Auth}>
        {this.props.isAuthenticated ? <Redirect to="/" /> : null}
        <form onSubmit={this.submitHandeler}>
          {form}
          {errorMsg}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" click={this.switchAuthModeHandeler}>
          SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  isBuild: state.burgerBuilder.building,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignUp) =>
    dispatch(actions.auth(email, password, isSignUp)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
