import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import logo from '../static/film.png'
import Search from './search/Search'

const NavBar = ({ setAuthenticated, authenticated, setUser, user }) => {
  const [lastSearch, setLastSearch] = useState('')
  const location = useLocation();

    const clearSearch = (e) => {
      const target = e.target;
      
      const searchInput = document.getElementById('search');
      console.log("clicked on nav!!", searchInput.value)
      searchInput.value = null;
      document.getElementById('search-results').style.display = null;
    }
    
    let history = useHistory()
    const rerouteHome = () => {
      history.push("/")
    }
    
    const rerouteRegister = () => {
      history.push("/sign-up")
    }
    const rerouteProfile = () => {
      history.push("/profile")
    }
    
    if(location.pathname === '/sign-up') return null
    
    return (
      <nav className="nav-bar" >
        {/* <div className="logo"> */}
          <div className="home-link__container">
            <img className="logo" src={logo} onClick={rerouteHome}/>
            <div className="home-link" onClick={rerouteHome}>
              flixpicks
            </div>
          </div>
        {/* </div> */}
        <Search clearSearch={clearSearch} lastSearch={lastSearch} setLastSearch={setLastSearch}/>
        <div className="user-buttons">
          {authenticated?
            <>
              <LogoutButton setAuthenticated={setAuthenticated} setUser={setUser} />
              <button className="nav-button" onClick={rerouteProfile}>
              <div className="profileButton">
                {<i className="fas fa-user-circle " ></i>}
              </div>
              </button>
            </>
            :
            <>
              <button className="nav-button" onClick={rerouteRegister}>Sign up</button>
              <button className="nav-button" onClick={rerouteRegister}>Log in</button>
            </>
          }
        </div>
      </nav>
  );
}

export default NavBar;
