import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css'


const Footer = () => {
    const location = useLocation();
    if(location.pathname === '/') return null

    return (
        <div className="footer">
           <div className="footer__contact">
                <a href="https://angel.co/u/andrew-choi-28" rel="noopener noreferrer" target="_blank"><i className="fab fa-linkedin"></i></a>
                <a href="https://www.linkedin.com/in/andrew-choi-340162201/" rel="noopener noreferrer" target="_blank"><i className="fab fa-github-square"></i></a>
                <a href="https://angel.co/u/andrew-choi-28" rel="noopener noreferrer" target="_blank"><i className="fab fa-angellist"></i></a>
            </div>
            <div className="footer__developer">
                <h3>Contact developer:</h3>
                <a className="footer__developer-email" href="mailto:adc1225.dev@gmail.com" rel="noopener noreferrer" target="_blank">Andrew Choi</a>
            </div>
        </div>
    );
};


export default Footer;
