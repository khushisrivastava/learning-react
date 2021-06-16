import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";

function Auth(props) {
    const [controls, setControls] = useState({
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
    })
    const [isSignUp, setIsSignUp] = useState(true)

  const checkValidity = (value, rule) => {
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

  const inputChangedHandeler = (event, controlName) => {
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true,
      },
    };
    setControls(updatedControls);
  };

  const submitHandeler = (event) => {
    event.preventDefault();
    props.onAuth(
      controls.email.value,
      controls.password.value,
      isSignUp
    );
    if (props.isBuild && props.isAuthenticated) {
      props.history.push("/checkout");
    }
  };

  const switchAuthModeHandeler = () => setIsSignUp(!isSignUp)

    const formElementArray = [];
    for (let element in controls) {
      formElementArray.push({
        key: element,
        config: controls[element],
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
        changed={(event) => inputChangedHandeler(event, ele.key)}
      />
    ));

    if (props.loading) {
      form = <Spinner />;
    }

    let errorMsg = null;
    if (props.error) {
      errorMsg = <p>{props.error.message}</p>;
    }

    return (
      <div className={classes.Auth}>
        {props.isAuthenticated ? <Redirect to="/" /> : null}
        <form onSubmit={submitHandeler}>
          {form}
          {errorMsg}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" click={switchAuthModeHandeler}>
          SWITCH TO {isSignUp ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
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
