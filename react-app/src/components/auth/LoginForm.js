import React, { useState } from "react";
import { login } from "../../services/auth";
import './form.css'

const LoginForm = ({authenticated, setLoginFormActive, setAuthenticated, setUser }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await login(email, password);
    if (!data.errors) {
      setAuthenticated(true);
      setUser(data)
    } else {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const signupHandler = (e) => {
    setLoginFormActive(false)
  }

  // if (authenticated) {
  //   return <Redirect to="/" />;
  // }

  return (
    <div className="form-container">
      <h1 className="login-header">Sign In</h1>
      <form className="" onSubmit={onLogin}>
        <div className="form-errors__container">
          {errors.map((error) => (
            <div className="form-errors">{error}</div>
          ))}
        </div>
              {/* <label htmlFor="email">Email</label> */}
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
            {/* <label htmlFor="password">Password</label> */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
              />
            <button className="login" type="submit">Login</button>
      </form> 
      <div className="login-signup-now">
            New to FlixPicks?  
            <button className="signup-now" onClick={signupHandler}>Sign up now</button>
      </div>
    </div>
  );
};

export default LoginForm;
