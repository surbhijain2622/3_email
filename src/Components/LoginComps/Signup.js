import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "../utils/axios.js";
import { requests } from "../utils/requests";
import { useDispatch, useSelector } from "react-redux";
import {
  logOutSuccess,
  signInSuccess,
} from "../../store/modules/auth/auth.action";
import {
  showLoader,
  hideLoader
} from "../../store/modules/application/app.action";
export default function Signup() {
  const authToken = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (authToken) {
      // dispatch(logOutSuccess({}));
      window.location.href = "/";
    }
  }, []);
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setpassword] = useState("");
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      setemail(value);
    } else if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else {
      setpassword(value);
    }
  }
  function HandleSubmit(e) {
    const senddata = {
      username: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    e.preventDefault();
    async function doRegister() {
      dispatch(showLoader());
      const request = await axios.post(requests["doRegister"], senddata);
      return request;
    }
    doRegister()
      .then((res) => {
        const data = res.data;
        console.log(data);
        const { token: token, profile: userinfo } = res.data;
        setpassword("");
        setLastName("");
        setFirstName("");
        setemail("");
        dispatch(hideLoader());
        window.location.href = "/";

        dispatch(signInSuccess({ token, userinfo }));
      })
      .catch((e) => {
        dispatch(hideLoader());
        console.log(e.data);
      });
  }
  function responseGoogle(resp) {
    console.log(resp);
  }
  return (
    <div>
      <div className="signup-card">
        <h1>Sign Up</h1>
        <div className="form-container">
          <form id="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={email}
                className="text-input"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                className="text-input"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                className="text-input"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                className="text-input"
                onChange={handleChange}
              />
            </div>
            <div className="submit-sec">
              <div className="submit-cont">
                <a onClick={HandleSubmit} className="save-btn">
                  SignUp
                </a>
              </div>
            </div>
            <div className="form-group">
              <Link to="/login" className="sign-up-link">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
