import React, {useState, useEffect} from 'react';
import ReactPlayer from 'react-player';
import Iframe from 'react-iframe'
import { useParams } from 'react-router-dom';
import './movie.css'
import ReviewForm from '../reviews/ReviewForm'
import {getMovie, getCast15} from '../../services/movie'
import {getReviews} from '../../services/review'
// import {getArtists} from '../../services/artists'

const Movie = ({ user }) => {
    // const [movieId, setMovieId] = useState(0)
    // const [genres, setGenres] = useState([]);
    // const [plotSummary, setPlotSummary] = useState("");
    // const [moviePhotos, setMoviePhotos] = useState("");

    // const imdbId = "tt0848228";
    // const imdbId = "tt0091326";
    // const imdbId = "tt10539608";
    const { imdbId } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState(null);
    const [reviews, setReviews] = useState(null);



    useEffect(() => {
        (async () => {
            // const movie = await getMovie("tt0848228");
            const movie = await getMovie(imdbId);
            setMovie(movie)
            
            console.log("movies", movie)

            // const reviews = await getReviews(imdbId)
            // setReviews(movie.reviews)
            // console.log("TRAILER!!!!! ", movie)
        })()
    }, [imdbId]);

    // const updateRating = (e) => {
    //     console.log("RATING!!! ", e.target.value)
    //     setRating(e.target.value)
    // }

    if(!movie) {
        return null;
    }

    return (
        <div className="movie-page__container">
            <div className="movie-page__top-container">
                <div className="movie-page__poster" style={{ backgroundImage: `url(${ movie.image })`}} >
                    <div className="movie-page__info-container ">
                            <div className="fas fa-plus-circle" data-tooltop="add to watch list"></div> 
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
                <div className="">
                    { movie.title } <span>{ movie.year }</span>
                </div>
                <div className="movie-page__plot">
                    { movie.description }
                </div>
                <div className="movie-page__photos">
                    {/* {moviePhotos && 

                    } */}
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
                    {reviews && reviews.map(review => {
                        return (
                            <div key={review.id} className="review">
                                <div className="review__name-stars-container">
                                    <div className="review__name">{review.user.username}</div>
                                    {/* <div className="review__stars">
                                        <input type="radio" onClick={updateRating} name="rate" id="rate-5" />
                                        <label htmlFor="rate-5" className="fas fa-star"></label>
                                        <input type="radio" name="rate" id="rate-4" />
                                        <label htmlFor="rate-4" className="fas fa-star"></label>
                                        <input type="radio" name="rate" id="rate-3" />
                                        <label htmlFor="rate-3" className="fas fa-star"></label>
                                        <input type="radio" name="rate" id="rate-2" />
                                        <label htmlFor="rate-2" className="fas fa-star"></label>
                                        <input type="radio" name="rate" id="rate-1" />
                                        <label htmlFor="rate-1" className="fas fa-star"></label>
                                    </div> */}
                                </div>
                                <div className="review__content">
                                    {review.content}
                                </div>
                                <div className="review__date">{review.created_at}</div>
                            </div>
                        )
                    })}
                    {/* <div className="review">
                        asdf
                    </div>
                    <div className="review">
                        asdf
                    </div>
                    <div className="review">
                        asdf
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Movie;