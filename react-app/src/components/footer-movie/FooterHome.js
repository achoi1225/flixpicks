import React from 'react';
import './footer-home.css'


const FooterHome = () => {

    return (
        <div className="footer-movie">
            <div className="footer-movie__contact">
                <a href="https://angel.co/u/andrew-choi-28" rel="noopener noreferrer" target="_blank"><i className="fab fa-linkedin"></i></a>
                <a href="https://www.linkedin.com/in/andrew-choi-340162201/" rel="noopener noreferrer" target="_blank"><i className="fab fa-github-square"></i></a>
                <a href="https://angel.co/u/andrew-choi-28" rel="noopener noreferrer" target="_blank"><i className="fab fa-angellist"></i></a>
            </div>
            <div className="footer-movie__developer">
                <h3>Contact developer:</h3>
                <a className="footer-movie__developer-email" href="mailto:adc1225.dev@gmail.com" rel="noopener noreferrer" target="_blank">Andrew Choi</a>
            </div>
        </div>
    );
};

export default FooterHome;