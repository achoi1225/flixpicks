import React, {useState, useEffect} from 'react';
import './movie.css'
import {getMovieFromIMDB, getCastIdFromIMDB, getCastFromIMDB} from '../../services/movie'
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
    const [imdbId, setImdbId] = useState("")
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [poster, setPoster] = useState("");
    const [genres, setGenres] = useState([]);
    const [plotOutline, setPlotOutline] = useState("");
    const [plotSummary, setPlotSummary] = useState("");
    const [moviePhotos, setMoviePhotos] = useState("");
    const [cast, setCast] = useState(null);


    useEffect(() => {
        (async () => {
            const movie = await getMovieFromIMDB("tt0848228")
            console.log("MOVIE!! ", movie)
            setTitle(movie.title.title);
            setYear(movie.title.year)
            setPoster(movie.title.image.url)
            setPlotOutline(movie.plotOutline.text);

            // const cast = await getCastIdFromIMDB("tt0848228");
            const castData = await getCastIdFromIMDB("tt0848228");
            await setCast(castData)
            console.log("CAST!!! ", castData)
        })()
    }, []);

    return (
        <div className="movie-page__container">
            <div className="movie-page__trailer-container">
                <div className="movie-page__poster" style={{ backgroundImage: `url(${ poster })`}} >
                    poster here
                </div>
                <div className="movie-page__trailer">
                    trailer here
                </div>
            </div>
            <div className="movie-page__content-container">
                    <div className="">
                        { title } <span>{ year }</span>
                    </div>
                    <div className="movie-page__plot">
                        { plotOutline }
                    </div>
                    {/* <div className="movie-page__starring"> 
                        stars
                    </div> */}
                    <div className="movie-page__photos">
                        {/* {moviePhotos && 

                        } */}
                    </div>
                    <div className="movie-page__cast-container">
                        <div className="movie-page__actor-container">
                            <div>
                                {cast && cast.nm0000168.name.name}
                                {cast && cast.nm0000168.charname[0].name}
                                {/* {cast ? cast.nm0000168.charname[0].name: null} */}
                                {/* {cast ? 
                                    <div>{console.log("CAST!!! ", cast)}</div> :
                                    null
                                } */}
                            </div>
                        </div>
                    </div>
                {/* <div className="movie-page__left-col"></div>
                <div className="movie-page__right-col"></div> */}
            </div>
        </div>
    );
};

export default Movie;