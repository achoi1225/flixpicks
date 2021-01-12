import React, { useState, useEffect } from 'react';
import './home.css'
import { getMostPopularMovies, getBestPictureMovies, getComingSoonMovies } from '../../services/movie'

const Home = ({ 
                mostPopularMovies, 
                setMostPopularMovies, 
                bestPictureMovies, 
                setBestPictureMovies, 
                comingSoonMovies,
                setComingSoonMovies }) => {
    // const [songs, setSongs] = useState(false)

    useEffect(() => {
        (async () => {
            const mpm = await getMostPopularMovies();
            setMostPopularMovies(mpm.most_popular)
            console.log("MOST POPULAR MOVIES!!! ", mpm)

            const bp = await getBestPictureMovies();
            setBestPictureMovies(bp.best_picture)
            console.log("BEST PICTURE MOVIES!!! ", bp)
        })()
    }, [setMostPopularMovies, setBestPictureMovies]);

    // if(!mostPopularMovies) {
    //     return null;
    // }

    return (
        <div className="main-content">
            <h1>Most Popular</h1>
            <div className="most-popular">
                {mostPopularMovies && mostPopularMovies.map(movie => {
                    return (
                        <div key={movie.id} className="mp-card-container">
                            <div className="mp-poster" style={{ backgroundImage: `url(${ movie.image })`}}>
                            </div>
                            <div className="mp-title-container">
                                <div className="movie-title">{movie.title}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Home;
