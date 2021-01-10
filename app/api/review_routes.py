from flask import Blueprint, jsonify, request, url_for
from app.models import db, Review

review_routes = Blueprint('review', __name__)

@review_routes.route('/movies/<int:id>', methods=["GET"])
def get_one_review(id):
    review = Review.query.all(id)
    return {"review": review.to_dict()}

