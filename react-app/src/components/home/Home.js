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
        let i = 0;
        // for(let j = 0; j < sectionNum; j++) {
        //     let cardCount = 0
        //     for(i; i < mostPopularMovies.length; i++) {
        //         if(i === 0) {
        //             const cards = [<a href="#section{sectionNum}" class="arrow__btn">‹</a>];
        //         } else {
        //             const cards = [<a href="#section{j}" class="arrow__btn">‹</a>];
        //         }
        //         cards.push(
        //             <div className="item" style={{ backgroundImage: `url(${mostPopularMovies[i].image})`}}>
        //             </div>
        //         )
        //         if(cardCount )
        //     }
        //     sections.push(<section id="section{j+1}">{cards}</section>)
        // }
        // return cards;


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
            <div class="wrapper">
                <section id="section1">
                    {mostPopularMovies ? createCarousel() : null}
                </section>
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
