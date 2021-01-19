import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import './home.css';
import FooterMovie from '../footer-movie/FooterMovie';
import wwLogo from '../../static/Daco_121609.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getMostPopularMovies, getBestPictureMovies, getComingSoonMovies } from '../../services/movie'

const Home = ({ 
                mostPopularMovies, 
                setMostPopularMovies, 
                bestPictureMovies, 
                setBestPictureMovies, 
                comingSoonMovies,
                setComingSoonMovies }) => {
    let history = useHistory();

    useEffect(() => {
        (async () => {
            const mpm = await getMostPopularMovies();
            setMostPopularMovies(mpm.most_popular)
            // console.log("MOST POPULAR MOVIES!!! ", mpm)

            const bp = await getBestPictureMovies();
            setBestPictureMovies(bp.best_picture)
            // console.log("BEST PICTURE MOVIES!!! ", bp)

            const cs = await getComingSoonMovies();
            setComingSoonMovies(cs.coming_soon)
            // console.log("COMING SOON MOVIES!!! ", bp)
        })()
    }, [setMostPopularMovies, setBestPictureMovies, setComingSoonMovies]);

    const reroute = (e) => {
        history.push(`/movie/${e.target.id}`)
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
                // console.log("KEYS!!!! ", `${category[movieIdx].imdbMovieId}`)
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
        <div className="feature-holder">
            <div className="feature-1">
            </div>
        </div>
        {/* <div className="feature-2">
        </div> */}
        <div className="feature-logo-container">
            <img className="ww-logo" src={wwLogo} alt="wonderwoman-logo"/>
        </div>

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
        <FooterMovie />
        </>
    );
};

export default Home;
