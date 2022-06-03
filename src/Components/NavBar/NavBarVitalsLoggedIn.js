import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import axios from "../utils/axios.js";
import { requests } from "../utils/requests";
import { useDispatch } from "react-redux";
import {
  logOutSuccess,
  signInSuccess,
} from "../../store/modules/auth/auth.action";
export default function NavBarVitalsLoggedIn() {
  const dispatch = useDispatch();
  function logout(e) {
    e.preventDefault();
    async function doLogout() {
      const request = await axios.delete(requests["doLogout"]);
      return request;
    }
    doLogout()
      .then((res) => {
        console.log(res.data);
        dispatch(logOutSuccess());
        window.location.href = "/login";
      })
      .catch((e) => {
        alert("Something Went Wrong");
        window.location.href = "/";
      });
  }
  return (
    <div>
      <IconButton
        onClick={logout}
        color="inherit"
        aria-label="open drawer"
        // onClick={this.logOut}
        style={{ position: "absolute", right: "2rem", top: "0.5rem" }}
      >
        Logout
      </IconButton>
    </div>
  );
}
