import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/home/Home";
import SignUpPage from "./components/auth/SignUpPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./services/auth";
import WatchList from "./components/watch-list/WatchList";
import ReviewList from "./components/review-list/ReviewList";
import Movie from "./components/movie/Movie"
import SearchResult from "./components/search-result/SearchResult"
import Footer from "./components/Footer";
import './index.css'

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({})
  const [loaded, setLoaded] = useState(false);
  const [mostPopularMovies, setMostPopularMovies] = useState(null);
  const [bestPictureMovies, setBestPictureMovies] = useState(null);
  const [comingSoonMovies, setComingSoonMovies] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

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
        <NavBar 
          setAuthenticated={setAuthenticated} 
          authenticated={authenticated} 
          setUser={setUser} user={user} 
          setIsLoggingIn={setIsLoggingIn}/>
        <Switch>
          <Route path="/sign-up" exact={true}>
              {/* <LoginForm authenticated={authenticated} active={active} setAuthenticated={setAuthenticated} setUser={setUser} /> */}
              <SignUpPage 
                authenticated={authenticated} 
                setAuthenticated={setAuthenticated}  
                setUser={setUser}
                isLoggingIn={isLoggingIn}
                setIsLoggingIn={setIsLoggingIn}/>
          </Route>
          <ProtectedRoute path="/watch-list" exact={true} authenticated={authenticated}>
              <WatchList user={user} />
          </ProtectedRoute>
          <ProtectedRoute path="/review-list" exact={true} authenticated={authenticated}>
              <ReviewList user={user} />
          </ProtectedRoute>
          <Route path="/" exact={true} authenticated={authenticated}>
            <Home 
              mostPopularMovies={mostPopularMovies} 
              setMostPopularMovies={setMostPopularMovies}
              bestPictureMovies={bestPictureMovies}
              setBestPictureMovies={setBestPictureMovies}
              comingSoonMovies={comingSoonMovies}
              setComingSoonMovies={setComingSoonMovies}/>
          </Route>
          <ProtectedRoute path="/search-result/:searchInput" exact={true} authenticated={authenticated}>
            <SearchResult/>
          </ProtectedRoute>
          <ProtectedRoute path="/movie/:imdbId" exact={true} authenticated={authenticated}>
            <Movie user={user}/>
          </ProtectedRoute>
        </Switch>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
