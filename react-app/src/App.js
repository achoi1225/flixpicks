import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import LoginForm from "./components/auth/LoginForm";
// import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
// import UsersList from "./components/UsersList";
// import User from "./components/User";
// import Home from "./components/home/Home";
// import Footer from "./components/Footer";
// import Song from "./components/songs/Song";
// import Artist from "./components/artists/Artists";
// import { user } from "./components/User"; 
// import Player from "./components/audioPlayer/AudioPlayer"
import SignUpPage from "./components/auth/SignUpPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./services/auth";
import Profile from "./components/profile/Profile";
import './index.css'
import Movie from "./components/movie/Movie"
import ReviewForm from "./components/reviews/ReviewForm"

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({})
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(false)

  useEffect(() => {
    (async() => {
      const data = await authenticate();
      if (!data.errors) {
        setAuthenticated(true);
        setUser(data)
      }
      setLoaded(true);
    })();
  }, []);

  //   const toggleClass = () => {
  //     const currentState = active
  //     setActive(!currentState);
  // };


  if (!loaded) {
    return null;
  }


  return (
    <BrowserRouter>
      {/* <div className="wrapper"> */}
        {/* <NavBar setAuthenticated={setAuthenticated} authenticated={authenticated} setUser={setUser} user={user}/> */}
        <Switch>
          <Route path="/sign-up" exact={true}>
              {/* <LoginForm authenticated={authenticated} active={active} setAuthenticated={setAuthenticated} setUser={setUser} /> */}
              <SignUpPage authenticated={authenticated} setAuthenticated={setAuthenticated}  setUser={setUser}/>
          </Route>
          <ProtectedRoute path="/profile" exact={true} authenticated={authenticated}>
              <Profile user={user} />
          </ProtectedRoute>
          {/* <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
            <UsersList/>
          </ProtectedRoute> */}
          {/* <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
            <User />
          </ProtectedRoute> */}
          <Route path="/" exact={true} authenticated={authenticated}>
            <h1>Homepage</h1>
          </Route>

          <Route path="/review-form" exact={true}>
            <ReviewForm user={user}/>
          </Route>

          <Route path="/movie-test" exact={true}>
            <Movie />
          </Route>
      </Switch>
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
