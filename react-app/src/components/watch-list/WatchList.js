import React, { useState, useEffect, } from 'react';
import { useHistory } from 'react-router-dom';
import Profile from '../profile/Profile';
import './watchlist.css';
import '../search-result/search-result.css';
// import './profile.css';
import { getWatchlist, removeMovie} from '../../services/watchlist';

const WatchList = ({ user }) => {
  const [watchList, setWatchList] = useState(null);
  let history = useHistory();

  useEffect(() => {
        (async () => {
          const watchlist = await getWatchlist(user.id);
          setWatchList(watchlist.movies);
        })()
    }, [user.id]);

     const removeFromWatchlist = (e) => {
        (async () => {
            await removeMovie(user.id, e.target.id);
            const updatedWatchlist = await getWatchlist(user.id);
            setWatchList(updatedWatchlist.movies);
        })()
    }

    const showOptions = (id) => {
      const options = document.getElementById(`options-${id}`);
      const play = document.getElementById(`play-${id}`);
      options.style.display = 'block';
      play.style.display = 'block';
    }

    const hideOptions = (id) => {
      const options = document.getElementById(`options-${id}`);
      const play = document.getElementById(`play-${id}`);
      options.style.display = 'none';
      play.style.display = 'none';
    }

    const rerouteMovie = (id) => {
      history.push(`movie/${id}`);
    }

  return (
      <div className="watchlist">
        <Profile user={user} />  
        {watchList && 
          <h2>Your Watch List </h2>
        }
        <div className="watchlist-content">
            {watchList && watchList.map(movie => {
                return (
                    // <NavLink key={movie.imdbMovieId} exact to={`/movie/${movie.imdbMovieId}`} className="search_result__movie-link">
                        <div key={movie.imdbMovieId} className="search_result__card-container" 
                          onMouseEnter={() => showOptions(movie.imdbMovieId)}
                          onMouseLeave={() => hideOptions(movie.imdbMovieId)}>
                            <div className="search_result__poster" style={{ backgroundImage: `url(${ movie.image })`}}>
                                <div className="play" 
                                  id={`play-${movie.imdbMovieId}`}
                                  onClick={() => rerouteMovie(movie.imdbMovieId)}>
                                    <i className="fas fa-play"></i>
                                </div>
                                <div className="card-options" id={`options-${movie.imdbMovieId}`}>
                                    <div className="fas fa-check-circle" id={movie.imdbMovieId} data-tooltop="remove from watch list" onClick={removeFromWatchlist}></div> 
                                </div>
                            </div>
                            <div className="search_result__title-container">
                                <div className="search_result__movie-title">{movie.title}</div>
                            </div>
                        </div>
                    // </NavLink> 
                )
            })}      
        </div>
      </div>
  )
}

export default WatchList
