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

export const getCastIdFromIMDB = async (imdbMovieId) => {
	const res = await fetch(`https://imdb8.p.rapidapi.com/title/get-top-cast?tconst=${imdbMovieId}`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": '55e6dd2a0bmsh654e359f2dcab72p16542cjsn866969df5f18',
				"x-rapidapi-host": "imdb8.p.rapidapi.com"
			}
		})

		const actorIdList = [];
		if (res.ok) {
			const castListJson = await res.json();

			// Filter list of actors to just their IDs
			for (const key in castListJson) {
				const actorIdSplit = castListJson[key].split('/');
				actorIdList.push(actorIdSplit[2])
			}
			console.log("ACTOR LIST!!! ", actorIdList);
			// return castListJson
		} else {
			console.log(res.error)
		} 

		const castDetail = await getCastFromIMDB(actorIdList);
		return castDetail;
		// return res.ok ? await res.json() : console.log(res.error)
}

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
// ALSO NEED "GET MOVIE FROM DATABASE" FUNCTION AND
// SAVE TO DATABASE FUNCTION

// export const getMovie = async (search_input) => {
// 	const res = await fetch(`http://www.omdbapi.com/?t=${search_input}&apikey=64fbbec9`, {
// 			"method": "GET",
// 		})
// 		return res.ok ? await res.json() : console.log(res.error)
// }

// tt0848228