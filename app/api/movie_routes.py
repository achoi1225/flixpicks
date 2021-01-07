from flask import Blueprint, jsonify, request, url_for
# import boto3
# import mimetypes
# from werkzeug.utils import secure_filename
from app.models import db, Movie
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
    movies = Song.query.all()
    print("movies!!!!!!", movies)
    return {"movies": [movie.to_dict() for movie in movies]}


# CREATE MOVIE
@movie_routes.route('/', methods=["POST"])
def create_movie():
        if request.is_json:
            data = request.get_json()
            new_movie = Movie(
                imdb_movie_id=data['imdbMovieId'],
                title=data['title'],
                image=data['image'],
                description=data['description'],
                starring=data['starring'],
                year=data['year'],
            )
        else:
            return {"error": "The request payload is not in JSON format"}

        db.session.add(new_movie)
        db.session.commit()
        return new_movie.to_dict_no_movie()

# GETS ONE MOVIE
@movie_routes.route('/<int:id>', methods=["GET"])
def get_one_movie(id):
    movie = Movie.query.get(id)
    return movie.to_dict()

# DELETE MOVIE
@movie_routes.route('/<int:id>', methods=["DELETE"])
def delete_movie(id):
    movie_to_delete = Movie.query.get(id)
    if movie_to_delete:
        movie_to_delete.delete()
        return {"response": f"Movie with ID {id} has been deleted."}
    else:
        return {"errors": [f"Movie with ID {id} does not exist."]}



