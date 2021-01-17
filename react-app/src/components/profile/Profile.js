import React, { useState, useEffect, } from 'react';
import './Profile.css';


const Profile = ({ user }) => {
  return (
      <div className="profilepage">
      <header className="profilepage-header">
        <div className="header-container">
          <div className="profilepage-image" alt="Cover Image">
            <i className="fas fa-user-circle fa-10x" />
          </div>
          <div className="profilepage-info">
          <div className="profilepage-title">{user.username}</div> 
          <div className="profilepage-email">{user.email}</div>
        </div>
        </div>
      </header>
      <div className="profilepage-content">
      </div>
      </div>
  )
}

export default Profile
