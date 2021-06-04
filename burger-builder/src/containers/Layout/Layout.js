import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandeler = () => this.setState({ showSideDrawer: false });

  sideDrawerToggleHandeler = () =>
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });

  render() {
    return (
      <Fragment>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerOpened={this.sideDrawerToggleHandeler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandeler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
