import React, {useState, useEffect} from 'react';
import './movie.css'
import {getMovie, getCast, getMovieFromIMDB, getCastIdFromIMDB, getCastFromIMDB} from '../../services/movie'
// import {getArtists} from '../../services/artists'

// tt0848228
// nm0262635
// nm0424060
// nm0719637
// nm0749263
// nm1165110
// nm1089991
// nm0163988
// nm0000375
const Movie = () => {
    const [movieId, setMovieId] = useState(0)
    const [imdbId, setImdbId] = useState("")
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [poster, setPoster] = useState("");
    const [plotOutline, setPlotOutline] = useState("");
    // const [genres, setGenres] = useState([]);
    // const [plotSummary, setPlotSummary] = useState("");
    // const [moviePhotos, setMoviePhotos] = useState("");
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState(null);


    useEffect(() => {
        (async () => {
            const movie = await getMovie("tt0848228");
            setMovie(movie)
            const cast = await getCast("tt0848228");
            setCast(cast.roles)

            // console.log("MOVIE!!!! ", movie)
            // setMovieId(movie.id)
            // setTitle(movie.title);
            // setYear(movie.year)
            // setPoster(movie.image)
            // setPlotOutline(movie.description);

            // const castData = await getCast(movie.id, "tt0848228");
            // console.log("CAST DATA!!!!!!!!", castData)
            // setCast(castData.roles);
            // console.log("CAST DATA!!!!!!!!", castData.roles)
        })()
    }, []);

    if(!movie || !cast) {
        return null;
    }

    return (
        <div className="movie-page__container">
            <div className="movie-page__trailer-container">
                <div className="movie-page__poster" style={{ backgroundImage: `url(${ movie.image })`}} >
                    poster here
                </div>
                <div className="movie-page__trailer">
                    trailer here
                </div>
            </div>
            <div className="movie-page__content-container">
                <div className="">
                    { movie.title } <span>{ movie.year }</span>
                </div>
                <div className="movie-page__plot">
                    { movie.description }
                </div>
                {/* <div className="movie-page__starring"> 
                    stars
                </div> */}
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
                                    {a.character}
                                </div>
                            </div>
                        )
                    })}
                </div>
                {/* <div className="movie-page__left-col"></div>
                <div className="movie-page__right-col"></div> */}
            </div>
        </div>
    );
};

export default Movie;