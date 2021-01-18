import React, { useState } from "react";
import { signUp } from '../../services/auth';
import './form.css'

const SignUpForm = ({authenticated, setAuthenticated, setUser}) => {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await signUp(username, email, password);
      if (!data.errors) {
        setAuthenticated(true);
        setUser(data)
      }  else {
      setErrors(data.errors);
      }
    } else {
      setErrors(["Your passwords must match"])
    }

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    // <div className="form-container">
      <form className="signup-form" onSubmit={onSignUp}>
        <div className="form-errors__container">
          {errors.map((error) => (
            <div className="form-errors">{error}</div>
          ))}
        </div>
        {/* <div className="form-inputs"> */}
            {/* <label>User Name</label> */}
            <input
              type="text"
              name="username"
              placeholder="User Name"
              onChange={updateUsername}
              value={username}
            ></input>
            {/* <label>Email</label> */}
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={updateEmail}
              value={email}
            ></input>
            {/* <label>Password</label> */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={updatePassword}
              value={password}
            ></input>
            {/* <label>Repeat Password</label> */}
            <input
              type="password"
              name="repeat_password"
              placeholder="Confirm Password"
              onChange={updateConfirmPassword}
              value={confirmPassword}
              required={true}
            ></input>
          <div className="form-input">
            <button className="signup" type="submit">Sign Up</button>
          </div>
        {/* </div> */}
      </form>
      // <></>
    // </div>
  );
};

export default SignUpForm;
