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
                console.log("SEARCH RESULTS!!!! ", results.movies)
            } else {
                setErrors(results.errors)
            }
        })()
    }, []);

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
                        <NavLink exact to={`/movie/${movie.id}`} className="movie-link">
                            <div key={movie.id} className="card-container">
                                <div className="poster" style={{ backgroundImage: `url(${ movie.image })`}}>
                                </div>
                                <div className="title-container">
                                    <div className="movie-title">{movie.title}</div>
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
