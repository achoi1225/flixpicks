export const getAllReviews = async (userId) => {
  console.log("HERE!")
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