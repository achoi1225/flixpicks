import React, { useState, useEffect, } from 'react';
import { useHistory } from 'react-router-dom';
import Profile from '../profile/Profile';
import ReviewEditForm from './ReviewEditForm';
import './reviewlist.css';
import { getAllReviews, deleteReview } from '../../services/review';

const ReviewList = ({ user }) => {
    const [reviews, setReviews] = useState([]);
    // const [currentImdbId, setCurrentImdbId] = useState("");
    const [currentReview, setCurrentReview] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

  let history = useHistory();

    useEffect(() => {
            (async () => {
                const reviews = await getAllReviews(user.id);
                console.log("reviews!! ", reviews.allReviews);
                setReviews(reviews.allReviews);
            })()
    }, [user.id]);

    const createReadOnlyStarRating = (rating) => {
        let stars = []
        for(let i = 0; i < rating; i++) {
            stars.push(
                <>
                <i key={`star-${i+1}`} className="fas fa-star read-only"></i>
                </>
            )
        }
        return stars;
    }

    const showEditForm = (e) => {
        setCurrentReview(reviews[e.target.id]);
        setIsFormVisible(true);
    }

    const reviewDeleteHandler = async (reviewId) => {
        await deleteReview(user.id, reviewId);
        const reviews = await getAllReviews(currentReview.userId);
        setReviews(reviews.allReviews);
        setIsFormVisible(false);
    }

    return (
        <div className="review-list">
            <Profile user={user} />  
            <h2>Your Reviews</h2>
            {isFormVisible &&
                <ReviewEditForm 
                    user={user} 
                    currentReview={currentReview} 
                    setReviews={setReviews} 
                    getAllReviews={getAllReviews} 
                    setIsFormVisible={setIsFormVisible}/>
            }
            <div className="review-list-content">
                <>
                {reviews && reviews.map((review, idx) => {
                    return (
                        <div key={review.id} className="review">
                            <div className="movie-title-container">
                                <div className="movie-title">
                                    {review.movie.title}
                                </div>
                                <button className="edit-btn" id={idx} onClick={showEditForm}>edit</button>
                                <button className="delete-btn" onClick={() => reviewDeleteHandler(review.id)}>delete</button>
                            </div>

                            <div className="review-container">
                                <div className="left">
                                    <div className="poster-container" style={{ backgroundImage: `url(${ review.movie.image })`}} ></div>
                                </div>
                                <div className="right">
                                    <div className="review__stars-container">
                                        <div className="review__stars-read-only">
                                            {createReadOnlyStarRating(review.stars)}
                                        </div>
                                    </div>
                                    <div className="review__content">
                                        {review.content}
                                    </div>
                                    <div className="review__date">{review.created_at}</div>
                                </div>
                            </div>
                        </div>
                        )
                })}
                </>
            </div>
            {/* <ReviewEditForm user={user} currentReview={currentReview} setReviews={setReviews} getAllReviews={getAllReviews} /> */}
        </div>
  )
}

export default ReviewList