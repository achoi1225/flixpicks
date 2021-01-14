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
                    <div className="item" key={`${mostPopularMovies[movieIdx].id}`} style={{ backgroundImage: `url(${mostPopularMovies[movieIdx].image})`}}>
                    </div>
                )
                movieIdx ++;
                if (movieIdx === mostPopularMovies.length) break;
            }
            cards.push(<a href={`#section${j+2}`} className="arrow__btn">›</a>)
            sections.push(<section key={`${j+1}`} id={`section${j+1}`}>{cards}</section>)
        }
        return sections;
        // console.log("SECTIONS!!! ", sections)


        // <section id="section1">
        //             <a href="#section3" class="arrow__btn">‹</a>

        //             <div className="item" style={{ backgroundImage: `url("https://occ-0-243-299.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABZEK-7pZ1H5FD4cTyUb9qB_KeyJGz5p-kfPhCFv4GU_3mbdm8Xfsy4IBchlG9PFNdGff8cBNPaeMra72VFnot41nt0y3e8RLgaVwwh3UvyM2H2_MkmadWbQUeGuf811K7-cxJJh7gA.jpg")`}}>
        //             </div>

        //             <div className="item" style={{ backgroundImage: `url("https://occ-0-243-299.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABZEK-7pZ1H5FD4cTyUb9qB_KeyJGz5p-kfPhCFv4GU_3mbdm8Xfsy4IBchlG9PFNdGff8cBNPaeMra72VFnot41nt0y3e8RLgaVwwh3UvyM2H2_MkmadWbQUeGuf811K7-cxJJh7gA.jpg")`}}>
        //             </div>

        //             <div className="item" style={{ backgroundImage: `url("https://occ-0-243-299.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABZEK-7pZ1H5FD4cTyUb9qB_KeyJGz5p-kfPhCFv4GU_3mbdm8Xfsy4IBchlG9PFNdGff8cBNPaeMra72VFnot41nt0y3e8RLgaVwwh3UvyM2H2_MkmadWbQUeGuf811K7-cxJJh7gA.jpg")`}}>
        //             </div>

        //             <div className="item" style={{ backgroundImage: `url("https://occ-0-243-299.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABZEK-7pZ1H5FD4cTyUb9qB_KeyJGz5p-kfPhCFv4GU_3mbdm8Xfsy4IBchlG9PFNdGff8cBNPaeMra72VFnot41nt0y3e8RLgaVwwh3UvyM2H2_MkmadWbQUeGuf811K7-cxJJh7gA.jpg")`}}>
        //             </div>

        //             <div className="item" style={{ backgroundImage: `url("https://occ-0-243-299.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABZEK-7pZ1H5FD4cTyUb9qB_KeyJGz5p-kfPhCFv4GU_3mbdm8Xfsy4IBchlG9PFNdGff8cBNPaeMra72VFnot41nt0y3e8RLgaVwwh3UvyM2H2_MkmadWbQUeGuf811K7-cxJJh7gA.jpg")`}}>
        //             </div>
        //             <a href="#section2" class="arrow__btn">›</a>
        //         </section>

        //         <section id="section2">
        //             <a href="#section1" class="arrow__btn">‹</a>

        //             <div className="item" style={{ backgroundImage: `url("https://occ-0-243-299.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABZEK-7pZ1H5FD4cTyUb9qB_KeyJGz5p-kfPhCFv4GU_3mbdm8Xfsy4IBchlG9PFNdGff8cBNPaeMra72VFnot41nt0y3e8RLgaVwwh3UvyM2H2_MkmadWbQUeGuf811K7-cxJJh7gA.jpg")`}}>
        //             </div>

        //             <div className="item" style={{ backgroundImage: `url("https://occ-0-243-299.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABZEK-7pZ1H5FD4cTyUb9qB_KeyJGz5p-kfPhCFv4GU_3mbdm8Xfsy4IBchlG9PFNdGff8cBNPaeMra72VFnot41nt0y3e8RLgaVwwh3UvyM2H2_MkmadWbQUeGuf811K7-cxJJh7gA.jpg")`}}>
        //             </div>

        //             <div className="item" style={{ backgroundImage: `url("https://occ-0-243-299.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABZEK-7pZ1H5FD4cTyUb9qB_KeyJGz5p-kfPhCFv4GU_3mbdm8Xfsy4IBchlG9PFNdGff8cBNPaeMra72VFnot41nt0y3e8RLgaVwwh3UvyM2H2_MkmadWbQUeGuf811K7-cxJJh7gA.jpg")`}}>
        //             </div>

        //             <div className="item" style={{ backgroundImage: `url("https://occ-0-243-299.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABZEK-7pZ1H5FD4cTyUb9qB_KeyJGz5p-kfPhCFv4GU_3mbdm8Xfsy4IBchlG9PFNdGff8cBNPaeMra72VFnot41nt0y3e8RLgaVwwh3UvyM2H2_MkmadWbQUeGuf811K7-cxJJh7gA.jpg")`}}>
        //             </div>

        //             <div className="item" style={{ backgroundImage: `url("https://occ-0-243-299.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABZEK-7pZ1H5FD4cTyUb9qB_KeyJGz5p-kfPhCFv4GU_3mbdm8Xfsy4IBchlG9PFNdGff8cBNPaeMra72VFnot41nt0y3e8RLgaVwwh3UvyM2H2_MkmadWbQUeGuf811K7-cxJJh7gA.jpg")`}}>
        //             </div>
        //             {/* <a href="#section3" class="arrow__btn">›</a> */}
        //         </section>
    }

    return (
        <div className="main-content">
            <h1>Most Popular</h1>
            <div className="wrapper">
                {mostPopularMovies ? createCarousel() : null}
            </div>

            {/* <div className="category-container">
                {mostPopularMovies && mostPopularMovies.map(movie => {
                    return (
                        <div key={movie.id} className="card-container">
                            <div className="poster" style={{ backgroundImage: `url(${ movie.image })`}}>
                            </div>
                            <div className="title-container">
                                <div className="movie-title">{movie.title}</div>
                            </div>
                        </div>
                    )
                })}
            </div> */}

            {/* <h1>Best Picture</h1>
            <div className="category-container">
                {bestPictureMovies && bestPictureMovies.map(movie => {
                    return (
                        <div key={movie.id} className="card-container">
                            <div className="poster" style={{ backgroundImage: `url(${ movie.image })`}}>
                            </div>
                            <div className="title-container">
                                <div className="movie-title">{movie.title}</div>
                            </div>
                        </div>
                    )
                })}
            </div> */}
        </div>
    );
};

export default Home;
