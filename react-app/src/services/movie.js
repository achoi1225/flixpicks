// require('dotenv').config()


export const getMovies = async (search_input) => {
	// console.log("TEST!!! ", process.env.RAPID_API_KEY,)
	const res = await fetch(`https://imdb8.p.rapidapi.com/title/auto-complete?q=${search_input}`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": '55e6dd2a0bmsh654e359f2dcab72p16542cjsn866969df5f18',
				"x-rapidapi-host": "imdb8.p.rapidapi.com"
			}
		})
		return res.ok ? await res.json() : console.log(res.error)
}

export const getMovie = async (imdbMovieId) => {
	const res = await fetch(`/api/movies/${imdbMovieId}`);
	if(res.ok) {
		return await res.json();
	} else if(res.status === 404) {
		// const movieData = await getMovieFromIMDB(imdbMovieId);
		console.log("MOVIE NOT FOUND");
		// console.log("MOVIE DATA!!! ", movieData);

		// const title = movieData.title.title;
		// const image = movieData.title.image.url;
		// const description = movieData.plotOutline.text;
		// const year = movieData.title.year;

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

export const getMovieFromIMDB = async (imdbMovieId) => {
	const res = await fetch(`https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=${imdbMovieId}&currentCountry=US`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": '55e6dd2a0bmsh654e359f2dcab72p16542cjsn866969df5f18',
				"x-rapidapi-host": "imdb8.p.rapidapi.com"
			}
		})
		return res.ok ? await res.json() : console.log(res.error)
}

// GET CAST: First check database to see if movie id exists.  If so, return the data. If not, create a cast
export const getCast = async (imdbMovieId) => {
	const res = await fetch(`/api/movies/${imdbMovieId}/roles`);
	if(res.ok) {
		console.log("ROLES ALREADY EXISTS!!!!")
		return await res.json();
	} else if(res.status === 404) {
		console.log("CAST NOT FOUND");
		// const castData = await getCastIdFromIMDB(imdbMovieId);
		// console.log("CAST DETAILS!!! ", castData);

		// await createCast(movieId, castData);
		// return await getCast(movieId, imdbMovieId);
	} else {
		console.log(res.error);
	}
}


// export const getCastIdFromIMDB = async (imdbMovieId) => {
// 	const res = await fetch(`https://imdb8.p.rapidapi.com/title/get-top-cast?tconst=${imdbMovieId}`, {
// 			"method": "GET",
// 			"headers": {
// 				"x-rapidapi-key": '55e6dd2a0bmsh654e359f2dcab72p16542cjsn866969df5f18',
// 				"x-rapidapi-host": "imdb8.p.rapidapi.com"
// 			}
// 		})

// 		const actorIdList = [];
// 		if (res.ok) {
// 			const castListJson = await res.json();

// 			// Filter list of actors to just their IDs
// 			for (const key in castListJson) {
// 				const actorIdSplit = castListJson[key].split('/');
// 				actorIdList.push(actorIdSplit[2])
// 			}
// 			console.log("ACTOR LIST!!! ", actorIdList);
// 			// return castListJson
// 		} else {
// 			console.log(res.error)
// 		} 

// 		const castData = await getCastFromIMDB(actorIdList);
// 		return castData
// 		// console.log("CAST DETAIL!!!", castDetail);
// 		// return res.ok ? await res.json() : console.log(res.error)
// }


export const getCastFromIMDB = async (imdbActorIdList) => {
	// const queryString = '';
	// for (actorID of imdbActorIdList) {
	// 	queryString += `id`
	// }
	const queryString = imdbActorIdList.join("&id=");
	console.log("STRING!! ", queryString);

	const res = await fetch(`https://imdb8.p.rapidapi.com/title/get-charname-list?id=${queryString}&tconst=tt0848228&currentCountry=US&marketplace=ATVPDKIKX0DER&purchaseCountry=US`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": '55e6dd2a0bmsh654e359f2dcab72p16542cjsn866969df5f18',
				"x-rapidapi-host": "imdb8.p.rapidapi.com"
			}
		})
	
	if(res.ok) {
		return res.json()
	} else {
		console.log(res.error)
	}
		
}

// export const createMovie = async (imdbMovieId, title, image, description, year) => {
// 	const res = await fetch("/api/movies/", {
// 		method: "POST",
// 		headers: {
// 		"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			imdbMovieId,
// 			title,
// 			image,
// 			description,
// 			year
// 		}),
// 	});
// 	return res.ok ? await res.json() : console.log(res.error)
// }

export const createCast = async (movieId, payload) => {
	for (const key in payload) {
		const character = payload[key].charname[0].characters;
		const actor = payload[key].charname[0].name;
		let image = "";
		// const image = payload[key].charname[0].image.url;

		if(payload[key].charname[0].image) {
			console.log("IMAGE EXISTS FOR THIS ACTOR!!!!")
			image = payload[key].charname[0].image.url
		} 
		console.log("CHAR!!! ", character.join(","));
		console.log("ACTOR!!! ", actor);
		console.log("IMAGE!!! ", image);

		const res = await fetch(`/api/movies/${movieId}/roles`, {
			method: "POST",
			headers: {
			"Content-Type": "application/json",
			},
			body: JSON.stringify({
				// 'movie_id' : movieId,
				character: character.join(","),
				actor,
				image,
			}),
		});
		if (res.ok) {
			console.log("Roles successfully created!")
		} else {
			console.log(res.error)
		}
	}
}

// ALSO NEED "GET MOVIE FROM DATABASE" FUNCTION AND
// SAVE TO DATABASE FUNCTION

// export const getMovie = async (search_input) => {
// 	const res = await fetch(`http://www.omdbapi.com/?t=${search_input}&apikey=64fbbec9`, {
// 			"method": "GET",
// 		})
// 		return res.ok ? await res.json() : console.log(res.error)
// }

// tt0848228