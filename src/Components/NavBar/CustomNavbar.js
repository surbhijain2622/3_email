import React, { Component } from "react";
import clsx from "clsx";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import NavBarVitalsLoggedIn from "./NavBarVitalsLoggedIn";
import NavBarVitalsLoggedOut from "./NavBarVitalsLoggedOut";
import IconButton from '@material-ui/core/IconButton';
import NavLogo from "./NavLogo";
import Session from "../../service/session.js";
import DrawerMenu from "./DrawerMenu";
// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const styles = (theme) => ({
  root: {
    display: "flex",
  },

  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "black",

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
});

class CustomNavBar extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  render() {
    const authtoken = Session.get("token");
    return (
      <div className={this.props.classes.root}>
        <AppBar
          position="fixed"
          className={clsx(this.props.classes.appBar, {
            [this.props.classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar>
            {authtoken && <IconButton edge="start" className={this.props.classes.menuButton} color="inherit" aria-label="menu">
              <DrawerMenu/>
            </IconButton>}
            <NavLogo/>
            {authtoken ? <NavBarVitalsLoggedIn /> : <NavBarVitalsLoggedOut />}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CustomNavBar);
