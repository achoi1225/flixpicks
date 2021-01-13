export const addMovie = async (userId, imdbMovieId) => {
	const response = await fetch(`/api/users/${userId}/movies/${imdbMovieId}/watchlist`, {
    method: 'POST',
    })
    return response.json();
};

export const getWatchlist = async (userId) => {
	const response = await fetch(`/api/users/${userId}/watchlist`)
    return response.json();
};

export const removeMovie = async (userId, imdbMovieId) => {
	const response = await fetch(`/api/users/${userId}/movies/${imdbMovieId}/watchlist`, {
        method: 'PATCH',
    })
    return response.json();
};
