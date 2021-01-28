import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import './home.css';
import FooterHome from '../footer-movie/FooterHome';
// import wwLogo1 from '../../static/Daco_121609.png';
import wwLogo2 from '../../static/wonder-woman-logo.png';
import wwTrailer from '../../static/ww_trailer.mp4';
import gradient from '../../static/black-to-transparent.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getMostPopularMovies, getBestPictureMovies, getComingSoonMovies } from '../../services/movie'

const Home = ({ 
                mostPopularMovies, 
                setMostPopularMovies, 
                bestPictureMovies, 
                setBestPictureMovies, 
                comingSoonMovies,
                setComingSoonMovies }) => {
    const [isMuted, setIsMuted] = useState(true);
    const [soundControlVisible, setSoundControlVisible] = useState(false);
    let history = useHistory();
    const videoRef = useRef();

    useEffect(() => {
        (async () => {
            const mpm = await getMostPopularMovies();
            setMostPopularMovies(mpm.most_popular)
            console.log("MOST POPULAR MOVIES!!! ", mpm)

            const bp = await getBestPictureMovies();
            setBestPictureMovies(bp.best_picture)

            const cs = await getComingSoonMovies();
            setComingSoonMovies(cs.coming_soon)
        })()
    }, [setMostPopularMovies, setBestPictureMovies, setComingSoonMovies]);

    const setMute = () => {
        videoRef.current.muted=true;
        setIsMuted(true);
    }

    const setUnmute = () => {
        videoRef.current.muted=false;
        setIsMuted(false);
    }

    const showSoundControl = () => {
        setSoundControlVisible(true)
    }

    const hideSoundControl = () => {
        setSoundControlVisible(false)
    }

    const reroute = (e) => {
        history.push(`/movie/${e.target.id}`)
    }

    const rerouteFeature = (e) => {
        const featureImdbId = mostPopularMovies[6].imdbMovieId
        history.push(`/movie/${featureImdbId}`)
    }

    const createCarousel = (category, catName) => {
        const sections = [];
        const sectionNum = Math.floor(category.length/6) + 1;
        let movieIdx = 0;
        for(let j = 0; j < sectionNum; j++) {
            const cards = [];
            if(j === 0) {
                // cards.push(<a href={`#${catName}${sectionNum}`} className="arrow__btn">‹</a>);
                // cards.push(<Link to={`#${catName}${sectionNum}`} className="arrow__btn">‹</Link>);
                cards.push(<Link key={`${catName}-${sectionNum}`} to={`#carousel_${catName}${sectionNum}`} className="arrow__btn">‹</Link>);
            } else {
                // cards.push(<a href={`#${catName}${j}`} className="arrow__btn">‹</a>);
                cards.push(<Link key={`${catName}-${j}`} to={`#carousel_${catName}${j}`} className="arrow__btn">‹</Link>);
            }
            for(let count = 0; count < 6; count++) {
                cards.push(
                        <div className="item" 
                            onClick={reroute} 
                            id={`${category[movieIdx].imdbMovieId}`} 
                            key={`${category[movieIdx].imdbMovieId}`} 
                            style={{ backgroundImage: `url(${category[movieIdx].image})`}}>
                        </div>
                )
                movieIdx ++;
                if (movieIdx === category.length) break;
            }
            if(j+1 !== sectionNum) {
                // cards.push(<a href={`#${catName}${j+2}`} className="arrow__btn">›</a>)
                cards.push(<Link key={`${catName}-${j+3}`} to={`#carousel_${catName}${j+2}`} className="arrow__btn">›</Link>)
            }
            sections.push(<section key={`${catName}-${j+1}`} id={`carousel_${catName}${j+1}`}>{cards}</section>)
        }
        return sections;
    }

    return (
        <>
        <div className="feature-holder"
            onMouseEnter={showSoundControl}
            onMouseLeave={hideSoundControl}>
            <video 
                className="feature-1"
                id="videoBg"
                autoPlay="true"
                muted 
                volume='0.2'
                ref={videoRef}>
                    <source src={wwTrailer} type="video/mp4"/>
                </video>
            
            {/************** Alternative bg image ************/}
            {/* <div className="feature-1">
            </div> */}

            <div className="feature-logo2-container">
                <img className="ww-logo2" src={wwLogo2} alt="wonderwoman-logo"/>
            </div>
            <div className="feature__plot-outline-container">
                {mostPopularMovies && mostPopularMovies[6].description}
                <button className="feature__more-details-btn" onClick={rerouteFeature}>
                    <i className="fas fa-caret-right"></i>
                    <span>more details</span>
                </button>
            </div>
            {soundControlVisible && 
                <div className="feature__mute-btn-container">
                    {isMuted ?
                        <div onClick={setUnmute} className="fas fa-volume-mute">
                        </div> :
                        <div onClick={setMute} className="fas fa-volume-up">
                        </div>
                    }
                </div> 
            }   
            <div 
                className="feature__gradient" 
                style={{ backgroundImage: `url(${gradient})`}}>
            </div>
        </div>

        {/* <div className="feature-2">
        </div> */}

        {/* <div className="feature-logo1-container">
            <img className="ww-logo1" src={wwLogo1} alt="wonderwoman-symbol"/>
        </div> */}

        <div className="main-content">
            <h1>{mostPopularMovies && 'Most Popular'}</h1>
            <div className="wrapper">
                {mostPopularMovies ? createCarousel(mostPopularMovies, 'mpm') : 
                    <div className="progress-container">
                        Loading 'Most Popular' list...
                        <CircularProgress color="secondary"/>
                    </div> 
                }
            </div>
            <h1>{bestPictureMovies && 'Best Picture'}</h1>
            <div className="wrapper">
                {bestPictureMovies ? createCarousel(bestPictureMovies, 'bpm') : 
                    <div className="progress-container">
                        Loading 'Best Picture' list...
                        <CircularProgress color="secondary"/>
                    </div> 
                }
            </div>

            <h1>{comingSoonMovies && 'Coming Soon'}</h1>
            <div className="wrapper">
                {comingSoonMovies ? createCarousel(comingSoonMovies, 'csm') : 
                    <div className="progress-container">
                        Loading 'Coming Soon' list...
                        <CircularProgress color="secondary"/>
                    </div> 
                }
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
        <FooterHome />
        </>
    );
};

export default Home;
