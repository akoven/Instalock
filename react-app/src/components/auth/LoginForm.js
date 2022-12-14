import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login, demoLogin } from "../../store/session";
import { getProfileThunk } from "../../store/profile";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      dispatch(getProfileThunk(user?.id));
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <form className="login-form" onSubmit={onLogin}>
        <img
          className="logo-login-form"
          src="https://i.imgur.com/w6gGyUO.jpeg"
        />
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error.split(":")[1]}</div>
          ))}
        </div>
        <div>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button className="login-form-btn" type="submit">
          Login
        </button>
        <button
          className="demo-login-btn"
          type="button"
          onClick={() => {
            dispatch(demoLogin());
          }}
        >
          Demo Login
        </button>
      </form>
      <div className="signup-section">
        Don't have an account?
        <NavLink to="/sign-up" exact={true} activeClassName="active">
          Sign Up
        </NavLink>
      </div>
    </div>
  );
};

export default LoginForm;
