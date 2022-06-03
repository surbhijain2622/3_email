import React from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
function NavBarVitalsLoggedOut() {
  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        // onClick={this.logOut}
        style={{ position: "absolute", right: "10rem", top: "0.5rem" }}
      >
        <Link style={{ color: "white", textDecoration: "none" }} to="/login">
          LogIn
        </Link>
      </IconButton>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        // onClick={this.logOut}
        style={{ position: "absolute", right: "2rem", top: "0.5rem" }}
      >
        <Link style={{ color: "white", textDecoration: "none" }} to="/login">
          SignUp
        </Link>
      </IconButton>
    </div>
  );
}

export default NavBarVitalsLoggedOut;
