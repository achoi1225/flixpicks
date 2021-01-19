import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import './search-result.css';
import { getSearchResults } from '../../services/search'

export const SearchResult = () => {
    const [errors, setErrors] = useState("");
    const [results, setResults]  = useState("");
    const { searchInput } = useParams();

    useEffect(() => {
        (async () => {
            const results = await getSearchResults(searchInput)
            if(!results.errors) {
                setResults(results.movies)
            } else {
                setErrors(results.errors)
            }
        })()
    }, [searchInput]);

    const showOptions = (id) => {
    //   const options = document.getElementById(`options-${id}`);
      const play = document.getElementById(`play-${id}`);
    //   options.style.display = 'block';
      play.style.display = 'block';
    }

    const hideOptions = (id) => {
    //   const options = document.getElementById(`options-${id}`);
      const play = document.getElementById(`play-${id}`);
    //   options.style.display = 'none';
      play.style.display = 'none';
    }

    return (
        <div className="search-result__container">
            <h1>{results ? 
                    <>
                    {results.length} result(s) found for "{searchInput}" 
                    </> :
                    "searching..."
                }
            </h1>
            <div className="form-errors">
                {errors}
            </div>
            <div className="search_result">
                {results && results.map(movie => {
                    return (
                        <NavLink key={movie.id} exact to={`/movie/${movie.id}`} className="search_result__movie-link">
                            <div className="search_result__card-container"
                                onMouseEnter={() => showOptions(movie.id)}
                                onMouseLeave={() => hideOptions(movie.id)}>
                                <div className="search_result__poster" style={{ backgroundImage: `url(${ movie.image })`}}>
                                    <div className="play" 
                                        id={`play-${movie.id}`}>   
                                        <i className="fas fa-play"></i>
                                    </div>
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

export default SearchResult;
