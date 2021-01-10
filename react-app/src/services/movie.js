
// export const getMovies = async (search_input) => {
// 	// console.log("TEST!!! ", process.env.RAPID_API_KEY,)
// 	const res = await fetch(`https://imdb8.p.rapidapi.com/title/auto-complete?q=${search_input}`, {
// 			"method": "GET",
// 			"headers": {
// 				"x-rapidapi-key": '55e6dd2a0bmsh654e359f2dcab72p16542cjsn866969df5f18',
// 				"x-rapidapi-host": "imdb8.p.rapidapi.com"
// 			}
// 		})
// 		return res.ok ? await res.json() : console.log(res.error)
// }

export const getMovie = async (imdbMovieId) => {
	const res = await fetch(`/api/movies/${imdbMovieId}`);
	if(res.ok) {
		return await res.json();
	} else if(res.status === 404) {
		console.log("MOVIE NOT FOUND");
		return await createMovie(imdbMovieId)

	}
}

export const createMovie = async (imdbMovieId) => {
	const res = await fetch("/api/movies/", {
		method: "POST",
		headers: {
		"Content-Type": "application/json",
		},
		body: JSON.stringify({
			imdbMovieId,
		}),
	});
	return res.ok ? await res.json() : console.log(res.error)
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

