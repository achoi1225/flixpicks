import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import logo from '../static/film.png'
import Search from './search/Search'

const NavBar = ({ setAuthenticated, authenticated, setUser, user, setIsLoggingIn}) => {
  const [lastSearch, setLastSearch] = useState('')
  const [menuIsShown, setMenuIsShown] = useState(false)
  const location = useLocation();

    const clearSearch = (e) => {      
      const searchInput = document.getElementById('search');
      searchInput.value = null;
      document.getElementById('search-results').style.display = null;
    }
    
    let history = useHistory()
    const rerouteHome = () => {
      history.push("/")
    }
    
    const rerouteSignup = () => {
      history.push("/sign-up")
    }

    const rerouteLogin = () => {
      setIsLoggingIn(true)
      history.push("/sign-up")
    }

    const rerouteProfile = () => {
      history.push("/profile")
    }

    if(location.pathname === '/sign-up') return null
    
    return (
      <nav className="nav-bar" >
          <div className="home-link__container">
            <img className="logo" src={logo} onClick={rerouteHome} alt="flixpicks-logo"/>
            <div className="home-link" onClick={rerouteHome}>
              flixpicks
            </div>
          </div>
        <Search clearSearch={clearSearch} lastSearch={lastSearch} setLastSearch={setLastSearch}/>
        <div className="user-buttons">
          {authenticated?
            <>
              <LogoutButton setAuthenticated={setAuthenticated} setUser={setUser} />
              <button className="nav-button" 
                onMouseEnter={() => setMenuIsShown(true)}
                onMouseLeave={() => setMenuIsShown(false)}>
              <div className="profileButton">
                {/* {<i className="fas fa-user-circle " ></i>} */}
                <i className="fas fa-user-alt"></i>
              </div>
                {menuIsShown && 
                  <div className="profile-menu">
                    <div className="signed-in-as">
                      Signed in as:
                    </div>
                    <div className="username">{user.username}</div>
                    {/* <NavLink className="watchlist" to="/profile"><i className="fas fa-chevron-right"></i> watch list</NavLink> */}
                    <div className="watchlist" 
                      to="/profile"
                      onClick={rerouteProfile}>
                        {/* <i className="fas fa-chevron-right"></i>  */}
                        watch list
                    </div>
                  </div>  
                }
              </button>
            </>
            :
            <>
              <button className="nav-button" onClick={rerouteSignup}>Sign up</button>
              <button className="nav-button" onClick={rerouteLogin}>Log in</button>
            </>
          }
        </div>
      </nav>
  );
}

export default NavBar;
