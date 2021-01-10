from flask import Blueprint, jsonify, request, url_for
import requests
from app.models import db, Movie, Role, Review
# from flask_login import login_required
# from app.forms import SongForm, AnnotationForm


movie_routes = Blueprint('movies', __name__)

# REGEX TO CHECK FOR EXTENSIONS
#  \.(?i)(jpe?g|png|gif)$

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

# GETS ALL MOVIES
@movie_routes.route('/', methods=["GET"])
def get_movies():
    movies = Movie.query.all()
    print("movies!!!!!!", movies)
    return {"movies": [movie.to_dict() for movie in movies]}

# GETS ONE MOVIE
@movie_routes.route('/<id>', methods=["GET"])
def get_one_movie(id):
    print(f"ID!! {id}")
    movie = Movie.query.filter_by(imdb_movie_id=id).first()
    print(f"MOVIE!!! {movie}")
    if movie:
        return movie.to_dict()
    else:
        return {'errors': 'Movie does not exist'}, 404

# CREATE MOVIE
@movie_routes.route('/', methods=["POST"])
def create_movie():
    if request.is_json:
        data = request.get_json()

        url = "https://imdb8.p.rapidapi.com/title/get-overview-details"
        querystring = {"tconst": data['imdbMovieId'], "currentCountry": "US"}
        headers = {
            'x-rapidapi-key': "55e6dd2a0bmsh654e359f2dcab72p16542cjsn866969df5f18",
            'x-rapidapi-host': "imdb8.p.rapidapi.com"
        }
        print("IN CREATE MOVIE!!!!")
        response = requests.request("GET", url, headers=headers, params=querystring)

        response = dict(response.json())

        # title = response['title']['title']
        # image = response['title']['image']['url']
        # description = response['plotOutline']['text']
        # year = response['title']['year']

        print(f"RESPONSE!!!!!!!!!!!!!! {response}")
        print(f"TITLE!!!!!! {response['title']['title']}")
        print(f"IMAGE!!!!!! {response['title']['image']['url']}")
        print(f"DESCRIPTION!!!!!! {response['plotOutline']['text']}")
        print(f"YEAR!!!!!! {response['title']['year']}")

        new_movie = Movie(
            imdb_movie_id=data['imdbMovieId'],
            title=response['title']['title'],
            image=response['title']['image']['url'],
            description=response['plotOutline']['text'],
            year=response['title']['year'],
        )

        db.session.add(new_movie)
        db.session.commit()
        return new_movie.to_dict()
    else:
        return {"error": "The request payload is not in JSON format"}


# export const getMovieFromIMDB = async (imdbMovieId) => {
# 	const res = await fetch(`https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=${imdbMovieId}&currentCountry=US`, {
# 			"method": "GET",
# 			"headers": {
# 				"x-rapidapi-key": '55e6dd2a0bmsh654e359f2dcab72p16542cjsn866969df5f18',
# 				"x-rapidapi-host": "imdb8.p.rapidapi.com"
# 			}
# 		})
# 		return res.ok ? await res.json() : console.log(res.error)
# }

# DELETE MOVIE
@movie_routes.route('/<int:id>', methods=["DELETE"])
def delete_movie(id):
    movie_to_delete = Movie.query.get(id)
    if movie_to_delete:
        movie_to_delete.delete()
        return {"response": f"Movie with ID {id} has been deleted."}
    else:
        return {"errors": [f"Movie with ID {id} does not exist."]}

# =========================================================================================================
# GETS CAST FOR A MOVIE (SENDS BACK 15 ACTORS TO BE DISPLAYED IN THE MOVIE PAGE)
@movie_routes.route('/<imdb_id>/roles/15', methods=["GET"])
def get_cast_15(imdb_id):
    roles = Role.query.filter_by(imdb_id=imdb_id).limit(15).all()
    if roles:
        return {"roles": [role.to_dict() for role in roles]}
    else:
        actors_id_list = get_cast_id_from_imdb(imdb_id)
        actors_data = get_cast_data_from_imdb(actors_id_list, imdb_id)
        create_role(actors_data, imdb_id)

        return get_cast_15(imdb_id)

# HELPER FUNCTION FOR GETTING CAST IDS
def get_cast_id_from_imdb(imdb_id):
    url = "https://imdb8.p.rapidapi.com/title/get-top-cast"
    querystring = {"tconst": imdb_id}
    headers = {
        'x-rapidapi-key': "55e6dd2a0bmsh654e359f2dcab72p16542cjsn866969df5f18",
        'x-rapidapi-host': "imdb8.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)
    response = list(response.json())
    
    actor_id_list = [el.split("/")[2] for el in response]

    # for el in response:
    #     actorId = el.split("/")[2]
    #     actorIdList.append(actorId)

    return actor_id_list

# HELPER FUNCTION FOR GETTING CAST DATA WITH THE LIST PASSED IN
def get_cast_data_from_imdb(actors_id_list, imdb_id):
    query_string = "&id=".join(actors_id_list)
    # print(f"QUERY STRING!!!! {queryString}")
    url = "https://imdb8.p.rapidapi.com/title/get-charname-list"
    querystring = {"id": f"{query_string}", "tconst": f"{imdb_id}", "currentCountry": "US", "marketplace": "ATVPDKIKX0DER", "purchaseCountry": "US"}
    headers = {
        'x-rapidapi-key': "55e6dd2a0bmsh654e359f2dcab72p16542cjsn866969df5f18",
        'x-rapidapi-host': "imdb8.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)

    return dict(response.json())
# =========================================================================================================


# def get_cast_20(imdb_id):
#     roles = Role.query.filter_by(imdb_id=imdb_id).limit(20).all()
#     if roles:
#         return {"roles": [role.to_dict() for role in roles]}
#     else:
#         return {'errors': 'Roles for movie does not exist'}, 404


# CREATE ROLE
# @movie_routes.route('/<int:id>/roles', methods=["POST"])
def create_role(actors_data, imdb_id):
    for key in actors_data:
        character = ''
        actor = ''
        image = ''
        if 'image' in actors_data[key]['charname'][0]:
            image = actors_data[key]['charname'][0]['image']['url']
            # print(f"IMAGE!!!!! {image}")

        character = ", ".join(actors_data[key]['charname'][0]['characters'])
        actor = actors_data[key]['charname'][0]['name']
        # print(f"CHARACTERS!!!!! {character}")
        # print(f"ACTOR!!!!! {actor}")

        new_role = Role(
            imdb_id=imdb_id,
            character=character,
            actor=actor,
            image=image,
        )

        db.session.add(new_role)
        db.session.commit()

    return {'success': 'Roles successfully created'}, 200

# GET ALL REVIEWS FOR ONE MOVIE
@movie_routes.route('/<imdb_id>/reviews', methods=["GET"])
def get_reviews(imdb_id):
    reviews = Review.query.filter_by(imdb_id=imdb_id).all()
    if reviews:
        return {"reviews": [review.to_dict() for review in reviews]}
    else:
        return {'errors': 'Reviews for movie does not exist'}, 404
