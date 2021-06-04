import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" component={BurgerBuilder} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      );
    }
    return (
      <BrowserRouter>
        <div>
          <Layout>{routes}</Layout>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignUp: () => dispatch(actions.authCheckState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
