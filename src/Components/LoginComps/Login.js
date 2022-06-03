import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios.js";
import { requests } from "../utils/requests";
import { useDispatch } from "react-redux";
import {
  logOutSuccess,
  signInSuccess,
} from "../../store/modules/auth/auth.action";
import {
  showLoader,
  hideLoader
} from "../../store/modules/application/app.action";
import { useSelector } from "react-redux";
import { GoogleLogin } from "react-google-login";

export default function Login(props) {
  const authToken = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (authToken) {
      dispatch(logOutSuccess({}));
      window.location.href = "/";
    }
  }, []);
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      setemail(value);
    } else {
      setpassword(value);
    }
  }
  function responseGoogleSuccess(resp) {
    // console.log(resp.mc.access_token);
    async function doOAuthLogin() {
      dispatch(showLoader());
      const request = await axios.post(requests["doOAuthLogin"], resp);
      return request;
    }
    doOAuthLogin()
      .then((res) => {
        const data = res.data;
        const { token: token, profile: userinfo } = res.data;
        dispatch(hideLoader());
        window.location.href = "/";
        dispatch(signInSuccess({ token, userinfo }));
      })
      .catch((e) => {
        alert("Something Went Wrong");
        dispatch(hideLoader());
        window.location.href = "/login";
      });
  }
  function HandleSubmit(e) {
    const senddata = {
      username: email,
      password: password,
    };
    e.preventDefault();
    async function doLogin() {
      dispatch(showLoader());
      const request = await axios.post(requests["doLogin"], senddata);
      return request;
    }
    doLogin()
      .then((res) => {
        const data = res.data;
        const { token: token, profile: userinfo } = res.data;
        setemail("");
        setpassword("");
        dispatch(hideLoader());
        window.location.href = "/";
        dispatch(signInSuccess({ token, userinfo }));
      })
      .catch((e) => {
        alert("Something Went Wrong");
        dispatch(hideLoader());
        window.location.href = "/login";
      });
  }
  return (
    <div>
      <div className="login-card">
        <h1>Login</h1>
        <div className="form-container">
          <form id="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                value={email}
                className="text-input"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="text-input"
              />
            </div>
            <div className="submit-sec">
              <div className="submit-cont">
                <a onClick={HandleSubmit} href className="save-btn">
                  Login
                </a>
              </div>

              <div className="submit-google-cont">
                <GoogleLogin
                  clientId="880095652773-fa64olbb7s5u063d05cdva3pl88mrbm2.apps.googleusercontent.com"
                  buttonText="Sign in with Google"
                  onSuccess={responseGoogleSuccess}
                  scope="email profile"
                  onFailure={(e) => {
                    console.log(e);
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <Link to="/register" className="sign-up-link">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
