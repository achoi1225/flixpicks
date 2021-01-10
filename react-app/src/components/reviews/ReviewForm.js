import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom'
import { createReview } from '../../services/review'
import './review-form.css';

const ReviewForm = ({ user, imdbId }) => {
    const [errors, setErrors] = useState([]);
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    // const [imdbId, setImdbId] = useState(0);
    // const [stars, setStars] = useState(4);
    const [rating, setRating] = useState(null)

      useEffect(() => {
        if(user) {
            setUserId(user.id)
        }
        // (async () => {
        // })()
        console.log("USER ID! ", userId)
      }, [user]);

    //   let history = useHistory();
  
    const reviewSubmitHandler = async (e) => {
        e.preventDefault();
        if(!rating) {
            setErrors(["Please rate this movie"])
        } else {
            const newReview = await createReview(content, userId, imdbId, rating)
            console.log("NEW REVIEW!!!", newReview)
        }
    };

    const updateContent = (e) => {
        // console.log(e.target.key)
        e.preventDefault();
        setContent(e.target.value);
    };

    const updateRating = (e) => {
        console.log("RATING!!! ", e.target.id)
        setRating(parseInt(e.target.id))
        e.stopPropagation();
    }


    if(!user  || !imdbId) {
        return null;
    }

    return (
        <>
        {/* <form onSubmit={reviewSubmitHandler} encType="multipart/form-data"> */}
        <form className="review-form" encType="multipart/form-data">
            <div className="form-errors">
                {errors.map((error, idx) => (
                    <span key={idx}>{error}</span>
                ))}
            </div>
            <div className="review-form__label-rating-container">
                <label htmlFor="content" className="review-form__label">Add a review</label>
                <div className="review__stars">
                    <input type="radio" onClick={updateRating} name="rate" id="5" defaultChecked />
                    <label htmlFor="5" className="fas fa-star"></label>
                    <input type="radio" onClick={updateRating} name="rate" id="4"/>
                    <label htmlFor="4" className="fas fa-star"></label>
                    <input type="radio" onClick={updateRating} name="rate" id="3"/>
                    <label htmlFor="3" className="fas fa-star"></label>
                    <input type="radio" onClick={updateRating} name="rate" id="2"/>
                    <label htmlFor="2" className="fas fa-star"></label>
                    <input type="radio" onClick={updateRating} name="rate" id="1"/>
                    <label htmlFor="1" className="fas fa-star"></label>
                </div>
            </div>
            <textarea
                name="content"
                placeholder="Add your review"
                value={content}
                onChange={updateContent}
            />
        </form>
        <button className="" type="button" onClick={reviewSubmitHandler}>Submit</button>
        </>
  );
};

export default ReviewForm;
