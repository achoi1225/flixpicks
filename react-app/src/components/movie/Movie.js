import React, {useState, useEffect} from 'react';
import ReactPlayer from 'react-player';
import Iframe from 'react-iframe'
import { useParams } from 'react-router-dom';
import './movie.css'
import ReviewForm from '../reviews/ReviewForm'
import Reviews from '../reviews/Reviews'
import {getMovie, getCast15} from '../../services/movie'
import {getReviews} from '../../services/review'
import {addMovie, getWatchlist, removeMovie} from '../../services/watchlist'
// import {getArtists} from '../../services/artists'

const Movie = ({ user }) => {
    // const imdbId = "tt0848228";
    // const imdbId = "tt0091326";
    // const imdbId = "tt10539608";
    const { imdbId } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [watchlist, setWatchlist] = useState(null);
    const [isInWatchlist, setIsInWatchlist] = useState(false);



    useEffect(() => {
        (async () => {
            // const movie = await getMovie("tt0848228");
            const movie = await getMovie(imdbId);
            setMovie(movie)
            setReviews(movie.reviews)
            
            console.log("movies", movie)
            const cast = await getCast15(imdbId);
            setCast(cast.roles)
            // const reviews = await getReviews(imdbId)
            // console.log("TRAILER!!!!! ", movie)

            // const watchlistMovies = movie.watchLists[0];
            // for (const movie of watchlistMovies) {
            //     console.log(movie);
            // }
            // console.log(watchlistMovies)
            const userWatchlist = await getWatchlist(user.id)
            setWatchlist(userWatchlist);
            for(const obj of userWatchlist.movies) {
                console.log(obj);
                if (obj.imdbMovieId === imdbId) {
                    setIsInWatchlist(true);
                }
            }
        })()
    }, [imdbId, user.id]);

    const addToWatchlist = (e) => {
        (async () => {
            const updatedWatchlist = await addMovie(user.id, imdbId);
            setIsInWatchlist(true);
        })()
    }

     const removeFromWatchlist = (e) => {
        (async () => {
            const updatedWatchlist = await removeMovie(user.id, imdbId);
            console.log("REMOVED!!!!!! ", updatedWatchlist);
            setIsInWatchlist(false)
        })()
    }

    if(!movie) {
        return null;
    }

    return (
        <div className="movie-page__container">
            <div className="movie-page__top-container">
                <div className="movie-page__poster" style={{ backgroundImage: `url(${ movie.image })`}} >
                    <div className="movie-page__info-container ">
                            {isInWatchlist ? 
                                <div className="fas fa-check-circle" data-tooltop="remove from watch list" onClick={removeFromWatchlist}></div> :
                                <div className="fas fa-plus-circle" data-tooltop="add to watch list" onClick={addToWatchlist}></div> 
                            }
                            <div className="movie-page__add-to-watchlist">
                                add the watch list
                            </div>
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
                        "Trailer unavailable =("
                    }
                </div> 
            </div>
            <div className="movie-page__content-container">
                <div className="movie-page__title">
                    { movie.title } <span className="movie-page__year">({ movie.year })</span>
                </div>
                <div className="movie-page__plot">
                    { movie.description }
                </div>
                <div className="movie-page__cast-container">
                    {cast && cast.map((a, idx) => {
                        return(
                            <div key={a.id} className="movie-page__actor-container">
                                <img className="movie-page__actor-thumbnail" src={a.image}/>
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