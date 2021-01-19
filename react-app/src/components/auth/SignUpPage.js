import React, { useRef } from "react";
import { Redirect } from 'react-router-dom';
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import './signup-page.css'
import signupBg from '../../static/splash-bg.mp4';
import logo from '../../static/film.png'

const SignUpPage = ({authenticated, setAuthenticated, setUser, isLoggingIn, setIsLoggingIn}) => {
  // const [loginFormActive, setLoginFormActive] = useState(false);
  const videoRef = useRef();

  const setPlayBackSpeed = () => {
    videoRef.current.playbackRate = 0.5;
  };

  const signInHandler = (e) => {
    setIsLoggingIn(true);
  }

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
    <div className="color-overlay"></div>
    <video 
      className="signup__bg-container" 
      id="videoBg"
      autoPlay 
      loop 
      muted
      ref={videoRef}
      onCanPlay={() => setPlayBackSpeed()} >
        <source src={signupBg} type="video/mp4"/>
    </video>
    <div className="signup-page__container">
        <div className="signup__top-row">
            <div className="signup__logo-container">
                <img className="signup__logo" src={logo} alt="signup"/>
                flixpicks
            </div>
            <button className="signin" onClick={signInHandler}>
                Sign In
            </button>
        </div>
        <div className="signup__mid-content">
            {!isLoggingIn ? 
                <>
                    <h1>Love movies? <br /> We have the details right here</h1>
                    <h2 className="signup-now">Sign up now!</h2>
                    <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated}  setUser={setUser}/>
                </> :
                <LoginForm setAuthenticated={setAuthenticated}  setUser={setUser} isLoggingIn={isLoggingIn} setIsLoggingIn={setIsLoggingIn}/>
            }
        </div> 
    </div>
    </>
  );
};

export default SignUpPage;