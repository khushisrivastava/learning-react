import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

function Layout(props) {
  const [showSideDrawer, setShowSideDrawer] = useState(false)

  const sideDrawerClosedHandeler = () => setShowSideDrawer(false);

  const sideDrawerToggleHandeler = () => setShowSideDrawer(!showSideDrawer)

    return (
      <Fragment>
        <Toolbar
          isAuth={props.isAuthenticated}
          drawerOpened={sideDrawerToggleHandeler}
        />
        <SideDrawer
          isAuth={props.isAuthenticated}
          open={showSideDrawer}
          closed={sideDrawerClosedHandeler}
        />
        <main className={classes.Content}>{props.children}</main>
      </Fragment>
    );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
