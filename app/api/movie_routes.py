from flask import Blueprint, jsonify, request, url_for
import requests
import os
from app.models import db, Movie, Role, Review, Trailer

movie_routes = Blueprint('movies', __name__)

rapid_api_key = os.environ.get('RAPID_API_KEY')

# =========================================================================================================
# GETS ALL MOVIES
# @movie_routes.route('/', methods=["GET"])
# def get_movies():
#     movies = Movie.query.all()
#     return {"movies": [movie.to_dict() for movie in movies]}

# GETS ONE MOVIE
@movie_routes.route('/<id>', methods=["GET"])
def get_one_movie(id):
    movie = Movie.query.filter_by(imdb_movie_id=id).first()
    if movie:
        movie = movie.to_dict()
        trailer = get_one_trailer(id)
        movie['trailer'] = trailer
        # print(f"TRAILER!!!! {movie}")
        return movie
    else:
        # return {'errors': 'Movie does not exist'}, 404
        popular = False
        best_picture = False
        coming_soon = False

        # print(f"BEFORE GOING TO GET ONE TRAILER!!!")
        new_movie = create_movie(id, popular, best_picture, coming_soon)

        if new_movie:
            trailer = get_one_trailer(id)
            new_movie['trailer'] = trailer

            print("MOVIE CREATED!!!")
            return new_movie
        else:
            return {'errors': 'Details for this movie is currently unavailable' }

# CREATE MOVIE
# @movie_routes.route('/', methods=["POST"])
def create_movie(imdb_movie_id, popular, best_picture, coming_soon):
    
    url = "https://imdb8.p.rapidapi.com/title/get-overview-details"
    querystring = {"tconst": imdb_movie_id, "currentCountry": "US"}
    headers = {
        'x-rapidapi-key': rapid_api_key,
        'x-rapidapi-host': "imdb8.p.rapidapi.com"
    }
    response = requests.request(
        "GET", url, headers=headers, params=querystring)

    response = dict(response.json())

    # Check to see if key 'plotOutline' exists
    plotOutline = "* Plot not available *"
    image = "image unavailable"
    year = None

    if 'plotOutline' in response:
        plotOutline = response['plotOutline']['text']
    if 'image' in response['title']:
        image = response['title']['image']['url']
    if 'year' in response['title']:
        year = response['title']['year']

    new_movie = Movie(
        imdb_movie_id=imdb_movie_id,
        title=response['title']['title'],
        image=image,
        description=plotOutline,
        year=year,
        popular=popular,
        best_picture=best_picture,
        coming_soon=coming_soon,
    )

    db.session.add(new_movie)
    db.session.commit()
    return new_movie.to_dict()

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

# =========================================================================================================
# GETS CAST FOR A MOVIE (SENDS BACK 15 ACTORS TO BE DISPLAYED IN THE MOVIE PAGE)
@movie_routes.route('/<imdb_id>/roles/15', methods=["GET"])
def get_cast_15(imdb_id):
    roles = Role.query.filter_by(imdb_id=imdb_id).limit(15).all()
    if roles:
        return {"roles": [role.to_dict() for role in roles]}
    else:
        actors_id_list = get_cast_id_from_imdb(imdb_id)
        if actors_id_list:
            actors_data = get_cast_data_from_imdb(actors_id_list, imdb_id)
            if actors_data:
                create_role(actors_data, imdb_id)
            else:
                return {'errors': 'Cast for movie currently unavailable'}
        else:
            return {'errors': 'Cast for movie currently unavailable'}

        return get_cast_15(imdb_id)

# HELPER FUNCTION FOR GETTING CAST IDS
def get_cast_id_from_imdb(imdb_id):
    url = "https://imdb8.p.rapidapi.com/title/get-top-cast"
    querystring = {"tconst": imdb_id}
    headers = {
        'x-rapidapi-key': rapid_api_key,
        'x-rapidapi-host': "imdb8.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)
    
    if response.ok:
        response = list(response.json())
        actor_id_list = [el.split("/")[2] for el in response]
        return actor_id_list
    else:
        return None

    # for el in response:
    #     actorId = el.split("/")[2]
    #     actorIdList.append(actorId)


# HELPER FUNCTION FOR GETTING CAST DATA WITH THE LIST PASSED IN
def get_cast_data_from_imdb(actors_id_list, imdb_id):
    # Join array of actor ids in to one query string
    query_string = "&id=".join(actors_id_list)

    url = "https://imdb8.p.rapidapi.com/title/get-charname-list"
    querystring = {"id": f"{query_string}", "tconst": f"{imdb_id}", "currentCountry": "US", "marketplace": "ATVPDKIKX0DER", "purchaseCountry": "US"}
    headers = {
        'x-rapidapi-key': rapid_api_key,
        'x-rapidapi-host': "imdb8.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)

    if response.ok:
        return dict(response.json())
    else:
        return None

# CREATE ROLE
# @movie_routes.route('/<int:id>/roles', methods=["POST"])
def create_role(actors_data, imdb_id):
    for key in actors_data:
        character = ''
        actor = ''
        image = ''
        if 'image' in actors_data[key]['charname'][0]:
            image = actors_data[key]['charname'][0]['image']['url']
        if 'characters' in actors_data[key]['charname'][0]:
            character = ", ".join(actors_data[key]['charname'][0]['characters'])
        if 'name' in actors_data[key]['charname'][0]:
            actor = actors_data[key]['charname'][0]['name']

        new_role = Role(
            imdb_id=imdb_id,
            character=character,
            actor=actor,
            image=image,
        )

        db.session.add(new_role)
        db.session.commit()

    return {'success': 'Roles successfully created'}, 200
# =========================================================================================================

# =========================================================================================================
# GET MOST POPULAR MOVIES FOR HOMEPAGE
@movie_routes.route('/most-popular', methods=["GET"])
def get_most_popular():
    most_popular = Movie.query.filter_by(popular=True).all()
    if most_popular:
        return {"most_popular": [movie.to_dict() for movie in most_popular]}
    else:
        # return {'errors': 'Most popular movies do not exist'}, 404
        url = "https://imdb8.p.rapidapi.com/title/get-most-popular-movies"
        querystring = {"homeCountry": "US", "purchaseCountry": "US", "currentCountry": "US"}
        headers = {
            'x-rapidapi-key': rapid_api_key,
            'x-rapidapi-host': "imdb8.p.rapidapi.com"
        }

        response = requests.request("GET", url, headers=headers, params=querystring)
        response = list(response.json())
        popular_movies_list = [el.split("/")[2] for el in response]
        create_most_popular_movies(popular_movies_list)

        print("SENDING BACK MOST POPULAR!!!!")
        return get_most_popular()
        # print(f"MOVIES LIST!! {popular_movies_list}")

# Helper function to create most popular movies
def create_most_popular_movies(movie_list):
    print("IN CREATE MOST POPULAR")
    count = 0
    for movie_id in movie_list:
        if count == 10:
            break
        else:
            popular = True
            best_picture = False
            coming_soon = False
            create_movie(movie_id, popular, best_picture, coming_soon)
            count += 1
    
    print("CREATED MOST POPULAR MOVIES")
    return
# =========================================================================================================

# =========================================================================================================
# GET BEST PICTURE MOVIES
@movie_routes.route('/best-picture', methods=["GET"])
def get_best_picture():
    best_picture = Movie.query.filter_by(best_picture=True).all()
    if best_picture:
        return {"best_picture": [movie.to_dict() for movie in best_picture]}
    else:
        url = "https://imdb8.p.rapidapi.com/title/get-best-picture-winners"
        headers = {
            'x-rapidapi-key': rapid_api_key,
            'x-rapidapi-host': "imdb8.p.rapidapi.com"
        }

        response = requests.request("GET", url, headers=headers)

        response = list(response.json())
        best_picture_list = [el.split("/")[2] for el in response]
        print(f"BEST PIC LIST!! {best_picture_list}")

        create_best_picture_movies(best_picture_list)

        print("SENDING BACK BEST PICTURE!!!!")
        return get_best_picture()

# Helper function to create best picture movies
def create_best_picture_movies(movie_list):
    print("IN CREATE BEST PICTURE")
    count = 0
    for movie_id in movie_list:
        if count == 10:
            break
        else:
            popular = False
            best_picture = True
            coming_soon = False
            create_movie(movie_id, popular, best_picture, coming_soon)
            count += 1

    print("CREATED BEST PICTURE MOVIES")
    return
# =========================================================================================================

# =========================================================================================================
# GET COMING SOON MOVIES
@movie_routes.route('/coming-soon', methods=["GET"])
def get_coming_soon():
    coming_soon = Movie.query.filter_by(coming_soon=True).all()
    if coming_soon:
        return {"coming_soon": [movie.to_dict() for movie in coming_soon]}
    else:
        url = "https://imdb8.p.rapidapi.com/title/get-coming-soon-movies"
        querystring = {"homeCountry":"US","purchaseCountry":"US","currentCountry":"US"}
        headers = {
            'x-rapidapi-key': rapid_api_key,
            'x-rapidapi-host': "imdb8.p.rapidapi.com"
        }

        response = requests.request(
            "GET", url, headers=headers, params=querystring)

        response = list(response.json())
        coming_soon_list = [el.split("/")[2] for el in response]

        print(f"COMING SOON LIST!! {coming_soon_list}")

        create_coming_soon_movies(coming_soon_list)

        print("SENDING BACK COMING SOON MOVIES!!!!")
        return get_coming_soon()

# Helper function to create best picture movies
def create_coming_soon_movies(movie_list):
    print("IN CREATE COMING SOON!!!")
    count = 0
    for movie_id in movie_list:
        if count == 10:
            break
        else:
            popular = False
            best_picture = False
            coming_soon = True
            create_movie(movie_id, popular, best_picture, coming_soon)
            count += 1

    print("CREATED COMING SOON MOVIES!!!")
    return
# =========================================================================================================

# def get_cast_20(imdb_id):
#     roles = Role.query.filter_by(imdb_id=imdb_id).limit(20).all()
#     if roles:
#         return {"roles": [role.to_dict() for role in roles]}
#     else:
#         return {'errors': 'Roles for movie does not exist'}, 404


# # CREATE ROLE
# # @movie_routes.route('/<int:id>/roles', methods=["POST"])
# def create_role(actors_data, imdb_id):
#     for key in actors_data:
#         character = ''
#         actor = ''
#         image = ''
#         if 'image' in actors_data[key]['charname'][0]:
#             image = actors_data[key]['charname'][0]['image']['url']
#             # print(f"IMAGE!!!!! {image}")

#         character = ", ".join(actors_data[key]['charname'][0]['characters'])
#         actor = actors_data[key]['charname'][0]['name']
#         # print(f"CHARACTERS!!!!! {character}")
#         # print(f"ACTOR!!!!! {actor}")

#         new_role = Role(
#             imdb_id=imdb_id,
#             character=character,
#             actor=actor,
#             image=image,
#         )

#         db.session.add(new_role)
#         db.session.commit()

#     return {'success': 'Roles successfully created'}, 200


# =========================================================================================================
# GET ALL REVIEWS FOR ONE MOVIE
@movie_routes.route('/<imdb_id>/reviews', methods=["GET"])
def get_reviews(imdb_id):
    reviews = Review.query.filter_by(imdb_id=imdb_id).order_by(Review.created_at.desc()).all()
    if reviews:
        return {"reviews": [review.to_dict() for review in reviews]}
    else:
        return {'errors': 'Reviews for movie does not exist'}, 404
# =========================================================================================================

# =========================================================================================================
# GETS ONE TRAILER FOR A MOVIE
# @movie_routes.route('/<imdb_id>/trailer', methods=["GET"]) 
def get_one_trailer(imdb_id):
    print("IN GET ON TRAILER!!!")
    trailer = Trailer.query.filter_by(imdb_id=imdb_id).first()
    if trailer:
        return trailer.to_dict()
    else:
        url = "https://imdb8.p.rapidapi.com/title/get-videos"
        querystring = {"tconst": imdb_id, "limit": "10", "region": "US"}
        headers = {
            'x-rapidapi-key': rapid_api_key,
            'x-rapidapi-host': "imdb8.p.rapidapi.com"
        }

        response = requests.request("GET", url, headers=headers, params=querystring)

        if response.ok:
            response = dict(response.json())
            return create_trailer(response, imdb_id)
        else:
            print("Request to imdb failed")

# CREATE TRAILER
def create_trailer(data, imdb_id):
    videos = ''
    trailer_id = ''
    if 'videos' in data['resource']:
        videos = data['resource']['videos'][0]
        if videos['contentType'] == "Trailer":
            trailer_id = videos['id'].split("/")[2]
    
    trailer = Trailer(
        imdb_id=imdb_id,
        trailer_id=trailer_id
    )

    db.session.add(trailer)
    db.session.commit()

    return trailer.to_dict()
# =========================================================================================================



