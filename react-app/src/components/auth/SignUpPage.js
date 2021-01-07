import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import './signup-page.css'

const SignUpPage = ({authenticated, setAuthenticated, setUser}) => {
  const [loginFormActive, setLoginFormActive] = useState(false);

  const signInHandler = (e) => {
    setLoginFormActive(true);
  }

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signup-page__container">
        <div className="signup__top-row">
            <div className="signup__logo__container">
                LOGO HERE
            </div>
            <button className="signin" onClick={signInHandler}>
                Sign In
            </button>
        </div>
        <div className="signup__mid-content">
            {!loginFormActive ? 
                <>
                    <h1>If it's a movie, we have the details right here</h1>
                    <h2 className="signup-now">Sign up now!</h2>
                    <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated}  setUser={setUser}/>
                </> :
                <LoginForm setLoginFormActive={setLoginFormActive} setAuthenticated={setAuthenticated}  setUser={setUser}/>
            }
        </div> 
    </div>
  );
};

export default SignUpPage;