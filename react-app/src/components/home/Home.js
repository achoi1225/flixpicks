import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './home.css'
import wwLogo from '../../static/Daco_121609.png';
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

            const cs = await getComingSoonMovies();
            setComingSoonMovies(cs.coming_soon)
            console.log("COMING SOON MOVIES!!! ", bp)
        })()
    }, [setMostPopularMovies, setBestPictureMovies, setComingSoonMovies]);

    // if(!mostPopularMovies) {
    //     return null;
    // }
    const reroute = (e) => {
        history.push(`/movie/${e.target.id}`)
    }

    const createCarousel = (category, catName) => {
        const sections = [];
        const sectionNum = Math.floor(category.length/6) + 1;
                   console.log("sectionNUM!!!! ", sectionNum)
        let movieIdx = 0;
        for(let j = 0; j < sectionNum; j++) {
            const cards = [];
            if(j === 0) {
                cards.push(<a href={`#${catName}${sectionNum}`} className="arrow__btn">‹</a>);
            } else {
                cards.push(<a href={`#${catName}${j}`} className="arrow__btn">‹</a>);
            }
            for(let count = 0; count < 6; count++) {
                cards.push(
                        <div className="item" onClick={reroute} id={`${category[movieIdx].imdbMovieId}`} key={`${category[movieIdx].id}`} style={{ backgroundImage: `url(${category[movieIdx].image})`}}>
                        </div>
                )
                movieIdx ++;
                if (movieIdx === category.length) break;
            }
            if(j+1 !== sectionNum) {
                cards.push(<a href={`#${catName}${j+2}`} className="arrow__btn">›</a>)
            }
            sections.push(<section key={`${j+1}`} id={`${catName}${j+1}`}>{cards}</section>)
        }
        return sections;
    }

    return (
        <>
        <div className="feature-1">
        </div>
        <div className="feature-2">
        </div>
        <div className="feature-logo-container">
            <img className="ww-logo" src={wwLogo} />
        </div>

        <div className="main-content">
            <h1>Most Popular</h1>
            <div className="wrapper">
                {mostPopularMovies ? createCarousel(mostPopularMovies, 'mpm') : "Loading Most Popular Movies"}
            </div>

            <h1>Best Picture</h1>
            <div className="wrapper">
                {bestPictureMovies ? createCarousel(bestPictureMovies, 'bpm') : "Loading Best Picture Movies"}
            </div>

            <h1>Coming Soon</h1>
            <div className="wrapper">
                {comingSoonMovies ? createCarousel(comingSoonMovies, 'csm') : "Loading Coming Soon Movies"}
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
        </div>
        </>
    );
};

export default Home;
