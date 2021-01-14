import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
    let history = useHistory();

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
    const reroute = (e) => {
        console.log("CLICKED!", e.target.id);
        history.push(`/movie/${e.target.id}`)
    }

    const createCarousel = () => {
        const sections = [];
        const sectionNum = Math.floor(mostPopularMovies.length/6) + 1;
                   console.log("sectionNUM!!!! ", sectionNum)
        let movieIdx = 0;
        for(let j = 0; j < sectionNum; j++) {
            const cards = [];
            if(j === 0) {
                cards.push(<a href={`#section${sectionNum}`} className="arrow__btn">‹</a>);
            } else {
                cards.push(<a href={`#section${j}`} className="arrow__btn">‹</a>);
            }
            for(let count = 0; count < 6; count++) {
                cards.push(
                        <div className="item" onClick={reroute} id={`${mostPopularMovies[movieIdx].imdbMovieId}`} key={`${mostPopularMovies[movieIdx].id}`} style={{ backgroundImage: `url(${mostPopularMovies[movieIdx].image})`}}>
                        </div>
                )
                movieIdx ++;
                if (movieIdx === mostPopularMovies.length) break;
            }
            if(j+1 !== sectionNum) {
                cards.push(<a href={`#section${j+2}`} className="arrow__btn">›</a>)
            }
            sections.push(<section key={`${j+1}`} id={`section${j+1}`}>{cards}</section>)
        }
        return sections;
    }

    return (
        <div className="main-content">
            <h1>Most Popular</h1>
            <div className="wrapper">
                {mostPopularMovies ? createCarousel() : null}
            </div>

            {/* <h1>Best Picture</h1>
            <div className="category-container">
                {bestPictureMovies && bestPictureMovies.map(movie => {
                    return (
                        <div key={movie.id} className="card-container">
                            <div className="poster" style={{ backgroundImage: `url(${ movie.image })`}}>
                                <div className="title-container">
                                    <div className="movie-title">{movie.title}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div> */}
            <div className="category-container">asdfsadf</div>

            <div className="category-container">asdfsadf</div>

                {/* <h1>Best Picture</h1>
            <div className="category-container">
                {bestPictureMovies && bestPictureMovies.map(movie => {
                    return (
                        <div key={movie.id} className="card-container">
                            <div className="poster" style={{ backgroundImage: `url(${ movie.image })`}}>
                                <div className="title-container">
                                    <div className="movie-title">{movie.title}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div> */}



            
        </div>
    );
};

export default Home;
