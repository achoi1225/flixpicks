import React, { useState, useEffect, } from 'react';
import { NavLink } from 'react-router-dom';
import './Profile.css';
import '../search-result/search-result.css';
import { getWatchlist } from '../../services/watchlist';


const Profile = ({ user }) => {
  const [watchList, setWatchList] = useState(null);

  useEffect(() => {
        (async () => {
          const watchlist = await getWatchlist(user.id);
          console.log("WATCHLIST!!!! ", watchlist)
          setWatchList(watchlist.movies)
        })()
    }, []);

  return (
      <div className="profilepage">
        <header className="profilepage-header">
            <div className="profilepage__header-container">
                <div className="profilepage-image" alt="Cover Image">
                  <i className="fas fa-user-circle fa-10x" />
                </div>

                <div className="profilepage-info">
                  <div className="profilepage-title"><span>User name: </span> {user.username}</div> 
                  <div className="profilepage-email"><span>Email: </span> {user.email}</div>
                </div>
            </div>
        </header>
      
        {watchList && 
          <h2>Your Watch List </h2>
        }
      <div className="profilepage-content">
          {watchList && watchList.map(movie => {
              return (
                  <NavLink key={movie.imdbMovieId} exact to={`/movie/${movie.id}`} className="search_result__movie-link">
                      <div className="search_result__card-container">
                          <div className="search_result__poster" style={{ backgroundImage: `url(${ movie.image })`}}>
                          </div>
                          <div className="search_result__title-container">
                              <div className="search_result__movie-title">{movie.title}</div>
                          </div>
                      </div>
                  </NavLink>
              )
          })}      
      </div>
      </div>
  )
}

export default Profile
