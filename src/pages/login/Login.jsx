import React, { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContex } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Login() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContex);

  const handleClick = (e) => {
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    e.preventDefault();
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <div className="loginLeftLogo"></div>
          <img
            className="loginLeftLogoImg"
            src={`${PF}android-chrome-512x512.png`}
            alt="logo img"
          />
          <h3 className="loginLogo">CHAMPIO</h3>
          <span className="loginDesc">
            Connect with friends and the world around you with CHAMPIO.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              className="loginInput loginInputFirst"
              ref={email}
              required
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              ref={password}
              minLength="6"
              required
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <Box>
                  <CircularProgress color="inherit" size="25px" />
                </Box>
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
          </form>
          <a href="/register" className="loginRegisterLink">
            <button className="loginRegisterButton">
              Create a new Account
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
