import React, { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Password don`t match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(
          "https://socialmedia-rest-api.onrender.com/api/auth/register",
          user
        );
        navigate("/login", { replace: true });
      } catch (err) {
        console.log(err);
      }
    }
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
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <span className="loginForgot">Forgot Password?</span>
          </form>
          <a href="/login" className="loginRegisterLink">
            <button className="loginRegisterButton">Log into account</button>
          </a>
        </div>
      </div>
    </div>
  );
}
