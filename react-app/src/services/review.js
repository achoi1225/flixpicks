export const createReview = async (content, userId, movieId, stars) => {
  const response = await fetch(`/api/users/${userId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content,
      userId,
      movieId,
      stars
    })
  });
  return await response.json();
}