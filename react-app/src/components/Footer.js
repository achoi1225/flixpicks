import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css'


const Footer = () => {
    const location = useLocation();
    if(location.pathname === '/') return null

    return (
        <div className="footer">
            <div className="title">
                flixpicks
            </div>
            <div className="developer">
                <a href="https://github.com/achoi1225" target="_blank" rel="noopener noreferrer">Andrew Choi</a>
            </div>
        </div>
    );
};


export default Footer;
