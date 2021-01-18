import React, { useState } from "react";
import { createReview } from '../../services/review'
import './review-form.css';

const ReviewForm = ({ user, imdbId, setReviews, getReviews }) => {
    const [errors, setErrors] = useState([]);
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(null);
    // const [isChecked, setIsChecked] = useState(true);
  
    const reviewSubmitHandler = async (e) => {
        e.preventDefault();
        if(!rating) {
            setErrors(["Please rate this movie"])
        } else {
            await createReview(content, user.id, imdbId, rating);
            const reviews = await getReviews(imdbId)
            console.log("REVIEWS!!!", reviews);
            setReviews(reviews.reviews);
            setErrors([]);
            setContent("");
            setRating(null);
        }
    };

    const updateContent = (e) => {
        // console.log(e.target.key)
        e.preventDefault();
        setContent(e.target.value);
    };

    const updateRating = (e) => {
        console.log("RATING!!! ", e.target.id)
        setRating(parseInt(e.target.id));
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
                    <input type="radio" onClick={updateRating} name="rate" id="5"  defaultChecked/>
                    <label htmlFor="5" className="fas fa-star"></label>
                    <input type="radio" onClick={updateRating} name="rate" id="4" />
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
        <button className="review-form__button" type="button" onClick={reviewSubmitHandler}>Submit</button>
        </>
  );
};

export default ReviewForm;
