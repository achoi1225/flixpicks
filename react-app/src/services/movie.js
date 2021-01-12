
// GET MOVIE FOR MOVIE PAGE
export const getMovie = async (imdbMovieId) => {
	const res = await fetch(`/api/movies/${imdbMovieId}`);
	if(res.ok) {
		return await res.json();
	} else {
		console.log(res.error)
	}
}

// CREATE A NEW MOVIE
// export const createMovie = async (imdbMovieId) => {
// 	const res = await fetch("/api/movies/", {
// 		method: "POST",
// 		headers: {
// 		"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			imdbMovieId,
// 			'popular': false,
// 			'bestPicture': false,
// 			'comingSoon': false
// 		}),
// 	});
// 	return res.ok ? await res.json() : console.log(res.error)
// }

// GET MOST POPULAR MOVIES FOR HOMEPAGE (10 MOVIES)
export const getMostPopularMovies = async () => {
	const res = await fetch(`/api/movies/most-popular`);
	if(res.ok) {
		return await res.json();
	} else {
		console.log(res.error)
	}
}

// GET BEST PICTURE MOVIES FOR HOMEPAGE (10 MOVIES)
export const getBestPictureMovies = async () => {
	const res = await fetch(`/api/movies/best-picture`);
	if(res.ok) {
		return await res.json();
	} else {
		console.log(res.error)
	}
}

// GET COMING SOON MOVIES FOR HOMEPAGE (10 MOVIES)
export const getComingSoonMovies = async () => {
	const res = await fetch(`/api/movies/coming-soon`);
	if(res.ok) {
		return await res.json();
	} else {
		console.log(res.error)
	}
}

// GET CAST: First check database to see if movie id exists.  If so, return the data. If not, create a cast
export const getCast = async (imdbMovieId) => {
	const res = await fetch(`/api/movies/${imdbMovieId}/roles`);
	if(res.ok) {
		console.log("ROLES ALREADY EXISTS!!!!")
		return await res.json();
	} else if(res.status === 404) {
		console.log(res.error);
	}
}

// GET CAST OF 15 ONLY
export const getCast15 = async (imdbMovieId) => {
	const res = await fetch(`/api/movies/${imdbMovieId}/roles/15`);
	if(res.ok) {
		console.log("ROLES ALREADY EXISTS!!!!")
		return await res.json();
	} else if(res.status === 404) {
		console.log(res.error);
	}
}

