import React from 'react'

export const Reviews = ({ reviews }) => {

    const createReadOnlyStarRating = (rating) => {
        let stars = []
        for(let i = 0; i < rating; i++) {
            stars.push(
                <>
                <i className="fas fa-star read-only"></i>
                </>
            )
        }
        return stars;
    }

    return (
        <>
        {reviews && reviews.map(review => {
                        return (
                            <div key={review.id} className="review">
                                <div className="review__name-stars-container">
                                    <div className="review__name">{review.user.username}</div>
                                    <div className="review__stars-read-only">
                                        {createReadOnlyStarRating(review.stars)}
                                    </div>
                                </div>
                                <div className="review__content">
                                    {review.content}
                                </div>
                                <div className="review__date">{review.created_at}</div>
                            </div>
                        )
        })}
        </>
    )
}

export default Reviews
