import React from 'react'
import './profile.css';

export const Profile = ({ user }) => {
    return (
        <header className="profile-header">
            <div className="profile__header-container">
                <div className="profile-image" alt="Cover Image">
                  <i className="fas fa-user-circle fa-10x" />
                </div>

                <div className="profile-info">
                  <div className="profile-title"><span>User name: </span> {user.username}</div> 
                  <div className="profile-email"><span>Email: </span> {user.email}</div>
                </div>
            </div>
        </header>
    )
}

export default Profile;
