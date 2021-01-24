import React, { useState } from "react";
import { editReview } from '../../services/review'
// import '../reviews/review-form.css';
import './review-edit-form.css';


const ReviewEditForm = ({ currentReview, setReviews, getAllReviews, setIsFormVisible }) => {
    const [errors, setErrors] = useState([]);
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(null);
    // const [isChecked, setIsChecked] = useState(true);
  
    const reviewSubmitHandler = async (e) => {
        e.preventDefault();
        if(!rating) {
            setErrors(["Please rate this movie"])
        } else {
            console.log("current review", currentReview)
            await editReview(currentReview.userId, currentReview.id, content, rating);
            const reviews = await getAllReviews(currentReview.userId)
            console.log("REVIEWS!!!", reviews);
            setReviews(reviews.allReviews);
            setErrors([]);
            setContent("");
            setRating(null);
            setIsFormVisible(false);
        }
    };

    const updateContent = (e) => {
        setContent(e.target.value);
    };

    const updateRating = (e) => {
        setRating(parseInt(e.target.id));
    }

    const closeForm = () => {
        setIsFormVisible(false);
    }
    // if(!user  || !imdbId) {
    //     return null;
    // }

    return (
        <>
        {/* <form onSubmit={reviewSubmitHandler} encType="multipart/form-data"> */}
        <div className="review-edit-form-container">
            <form className="review-form" encType="multipart/form-data">
                <div className="form-errors">
                    {errors.map((error, idx) => (
                        <span key={idx}>{error}</span>
                    ))}
                </div>
                <div className="review-form__label-rating-container">
                    <label htmlFor="content" className="review-form__label">Edit your review</label>
                    <div className="review__stars">
                        <input type="radio" onClick={updateRating} name="rate" id="5" defaultChecked/>
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
                    <button className="review-edit-form__close-btn" onClick={closeForm}>
                        close
                    </button>
                </div>
                <textarea
                    name="content"
                    placeholder={currentReview && currentReview.content}
                    value={content}
                    onChange={updateContent}
                />
            </form>
            <button className="review-form__button" type="button" onClick={reviewSubmitHandler}>Submit</button>
        </div>
        </>
  );
};

export default ReviewEditForm;