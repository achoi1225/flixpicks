import React, {useState, useEffect} from 'react';
import Iframe from 'react-iframe'
import { useParams } from 'react-router-dom';
import './movie.css'
import ReviewForm from '../reviews/ReviewForm'
import Reviews from '../reviews/Reviews'
import {getMovie, getCast15} from '../../services/movie'
import {getReviews} from '../../services/review'
import {addMovie, getWatchlist, removeMovie} from '../../services/watchlist';
import emptyProfile01 from '../../static/empty_profile01.jpeg';
import emptyProfile02 from '../../static/empty_profile02.jpeg';


const Movie = ({ user }) => {
    // const imdbId = "tt0848228";
    // const [watchlist, setWatchlist] = useState(null);
    const { imdbId } = useParams();
    const [errors, setErrors] = useState([]);
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    useEffect(() => {
        (async () => {
            const movie = await getMovie(imdbId);
            console.log("movies", movie)
            if(!movie.errors) {
                setMovie(movie)
                const cast = await getCast15(imdbId);
                setCast(cast.roles)
                setReviews(movie.reviews)
            } else {
                setErrors(movie.errors)
            }
            
            const userWatchlist = await getWatchlist(user.id)
            // setWatchlist(userWatchlist);
            for(const obj of userWatchlist.movies) {
                if (obj.imdbMovieId === imdbId) {
                    setIsInWatchlist(true);
                }
            }
        })()
    }, [imdbId, user.id]);

    const addToWatchlist = (e) => {
        (async () => {
            await addMovie(user.id, imdbId);
            setIsInWatchlist(true);
        })()
    }

     const removeFromWatchlist = (e) => {
        (async () => {
            await removeMovie(user.id, imdbId);
            setIsInWatchlist(false);
        })()
    }

    if(!movie) {
        return null;
    }

    return (
        <div className="movie-page__container">
            <div className="movie-errors__container">
                 {errors.map((error) => (
                    <div className="movie-errors">{error}</div>
                ))}
            </div>
            <div className="movie-page__top-container">
                <div className="movie-page__poster" style={{ backgroundImage: `url(${ movie.image })`}} >
                    <div className="movie-page__info-container ">
                            {isInWatchlist ? 
                                <div className="watchlist-icon__container" data-tooltip="remove from watch list">
                                    <div className="fas fa-check-circle" onClick={removeFromWatchlist}></div> 
                                </div> :
                                <div className="watchlist-icon__container" data-tooltip="add to watch list">
                                    <div className="fas fa-plus-circle" onClick={addToWatchlist}></div> 
                                </div>
                            }
                    </div>
                </div>
                <div className="movie-page__trailer-container">
                    {movie.trailer.trailerId ? 
                        <Iframe 
                            url={`https://www.imdb.com/video/imdb/${movie.trailer.trailerId}/imdb/embed?autoplay=false`}
                            allowFullScreen="true"
                            className="movie-page__trailer"
                            // styles={{height: "25px"}}
                        /> :
                        <div className="trailer-unavailable">
                            Trailer unavailable =(
                        </div>
                    }
                </div> 
            </div>
            <div className="movie-page__content-container">
                <div className="movie-page__title">
                    { movie.title } <span className="movie-page__year">{movie.year && `(${movie.year})`}</span>
                </div>
                <div className="movie-page__plot">
                    { movie.description }
                </div>
                <div className="movie-page__cast-container">
                    <div className="movie-page__cast-header">
                        Cast
                    </div>
                    {cast && cast.map((a, idx) => {
                        return(
                            <div key={a.id} className="movie-page__actor-container">
                                <img className="movie-page__actor-thumbnail" src={a.image !== '' ? a.image : emptyProfile01}/>
                                <div className="movie-page__actor-name">
                                    {a.actor}
                                </div>
                                <div className="movie-page__character">
                                    ... {a.character}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="review-form__container">
                    <ReviewForm user={user} imdbId={imdbId} setReviews={setReviews} getReviews={getReviews}/>
                </div>
                <div className="reviews__container">
                    <Reviews reviews={reviews} />
                </div>
            </div>
        </div>
    );
};

export default Movie;