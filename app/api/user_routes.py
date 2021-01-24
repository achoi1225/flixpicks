from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Review, Movie, WatchList
from app.forms import ReviewForm
from sqlalchemy.orm import joinedload

user_routes = Blueprint('users', __name__)

# PUTS FORM VALIDATION ERRORS INTO A LIST
def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

# GET DATA FOR ALL USERS
@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}

# GET DATA FOR ONE USER
@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# CREATE USER PROFILE INFO
@user_routes.route('/<int:id>', methods=["POST"])
@login_required
def create_profile(id):
    # user = User.query.get(id)
    # return user.to_dict()
    pass

# EDIT USER PROFILE INFO 
@user_routes.route('/<int:id>', methods=["PATCH"])
@login_required
def edit_profile(id):
    # user = User.query.get(id)
    # return user.to_dict()
    pass

# GET ALL REVIEWS FOR ONE
@user_routes.route('/<int:id>/reviews', methods=["GET"])
@login_required
def get_reviews(id):
    reviews = Review.query.filter_by(user_id = id).order_by(Review.created_at.desc()).all()
    return { 'allReviews' : [review.to_dict() for review in reviews]}

# CREATE REVIEW
@user_routes.route('/<int:id>/reviews', methods=["POST"])
@login_required
def create_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if request.is_json:
            data = request.get_json()

            new_review = Review(
                content=form.data['content'],
                user_id=data['userId'],
                imdb_id=data['imdbId'],
                stars=data['stars'],
            )

            db.session.add(new_review)
            db.session.commit()

            return new_review.to_dict()
        else:
            return {"error": "The request payload is not in JSON format"}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# EDIT REVIEW
@user_routes.route('/<int:id>/reviews/<int:review_id>', methods=["PATCH"])
@login_required
def edit_review(id, review_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if request.is_json:
            review_to_edit = Review.query.get(review_id);

            if not review_to_edit:
                return {"errors": [f"Review with ID {review_id} does not exist"]}

            data = request.get_json()

            review_to_edit.content = form.data['content']
            review_to_edit.stars = data['stars']

            db.session.add(review_to_edit)
            db.session.commit()

            return review_to_edit.to_dict()
        else:
            return {"error": "The request payload is not in JSON format"}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# DELETE REVIEW
@user_routes.route('/<int:id>/reviews/<int:review_id>', methods=["DELETE"])
@login_required
def delete_review(review_id):
    print("HERE!!!!!!!!")
    review_to_delete = Review.query.get(review_id)

    if review_to_delete:
        review_to_delete.delete()
        return {"response": f"Review with ID {review_id} has been deleted"}
    else:
        return {"errors": [f"Review with ID {review_id} does not exist"]}
# =========================================================================================================

# =========================================================================================================
# GET WATCHLIST
@user_routes.route('/<int:id>/watchlist', methods=["GET"])
@login_required
def get_watchlist(id):
    watchlist = WatchList.query.filter_by(user_id=id).first()
    return watchlist.to_dict()

# ADD MOVIE TO WATCHLIST
@user_routes.route('/<int:id>/movies/<imdb_id>/watchlist', methods=["POST"])
@login_required 
def add_to_watchlist(id, imdb_id):
    movie = Movie.query.filter(Movie.imdb_movie_id.in_([imdb_id])).first()
    watchlist = WatchList.query.filter_by(user_id=id).first()

    if watchlist:
        watchlist.movies.append(movie)

        db.session.add(watchlist)
        db.session.commit()

        return watchlist.to_dict()
    else:
        new_watchlist = create_watchlist(id)
        new_watchlist.append(movie)

        db.session.add(new_watchlist)
        db.session.commit()

        return new_watchlist.to_dict()

@user_routes.route('/<int:id>/movies/<imdb_id>/watchlist', methods=["PATCH"])
@login_required 
def remove_from_watchlist(id, imdb_id):
    watchlist = WatchList.query.filter_by(user_id=id).first()
    # watchlist = get_watchlist(id)
    print(f"WATCHLIST!!!!!! {watchlist}")
    idx = 0
    for i in watchlist.to_dict()['movies']:
        if i['imdbMovieId'] == imdb_id:
            del watchlist.movies[idx]
            break
        idx += 1
    
    db.session.add(watchlist)
    db.session.commit()
    
    return watchlist.to_dict()

def create_watchlist(user_id):
    watchlist = WatchList(
        user_id = user_id
    )
    db.session.add(watchlist)
    db.session.commit()

    return watchlist
# =========================================================================================================


# @user_routes.route('/<int:id>/followed/<int:followed_id>', methods=["POST"])
# @login_required
# def create_follow(id, followed_id):
#     # user = User.query.get(id)
#     # return user.to_dict()
#     pass
