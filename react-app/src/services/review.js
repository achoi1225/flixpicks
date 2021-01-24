export const getAllReviews = async (userId) => {
  const response = await fetch(`/api/users/${userId}/reviews`);
  return await response.json();
}

export const getReviews = async (imdbMovieId) => {
	const res = await fetch(`/api/movies/${imdbMovieId}/reviews`);
	if(res.ok) {
		return await res.json();
	} else if(res.status === 404) {
		console.log("No reviews for movie");
		return {}
	}
}

export const createReview = async (content, userId, imdbId, stars) => {
  const response = await fetch(`/api/users/${userId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content,
      userId,
      imdbId,
      stars
    })
  });
  return await response.json();
}

export const editReview = async (userId, reviewId, content, stars) => {
  const response = await fetch(`/api/users/${userId}/reviews/${reviewId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content,
      stars
    })
  });
  return await response.json();
}

export const deleteReview = async (userId, reviewId) => {
  // console.log("USER ID ", userId)
  // console.log("review ID ", reviewId)
  const response = await fetch(`/api/users/${userId}/reviews/${reviewId}`, {
    method: 'DELETE',
  });
  return await response.json();
}