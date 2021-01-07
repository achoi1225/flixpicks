import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom'
import { createReview } from '../../services/review'

const ReviewForm = ({ user }) => {
    const [errors, setErrors] = useState([]);
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    const [movieId, setMovieId] = useState(1);
    const [stars, setStars] = useState(4);

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
        const newReview = await createReview(content, userId, movieId, stars)
        console.log("NEW REVIEW!!!", newReview)
    };

    const updateContent = (e) => {
        setContent(e.target.value);
    };

    if(!user) {
        return null;
    }
    console.log("ID ", user.id)
    return (
        <form onSubmit={reviewSubmitHandler} encType="multipart/form-data">
            <div>
            {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
            ))}
            </div>
            <label htmlFor="content">Review</label>
            <input
                name="content"
                type="text"
                placeholder="Add your review"
                value={content}
                onChange={updateContent}
            />
            <button className="" type="submit">Submit</button>
        </form>
  );
};

export default ReviewForm;
