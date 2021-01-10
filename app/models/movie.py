from sqlalchemy.orm import relationship
# from sqlalchemy import CheckConstraint
from .db import db
from .watch_list import movies_watchlist


class Movie(db.Model):
    __tablename__ = 'movies'

    id = db.Column(db.Integer, primary_key=True)
    imdb_movie_id = db.Column(db.String(300), nullable=False, unique=True)
    title = db.Column(db.String(300), nullable=False)
    image = db.Column(db.String(300), nullable=False)
    description = db.Column(db.Text, nullable=False)
    popular = db.Column(db.Boolean, nullable=True, default=False)
    best_picture = db.Column(db.Boolean, nullable=True, default=False)
    coming_soon = db.Column(db.Boolean, nullable=True, default=False)
    # starring = db.Column(db.String(300), nullable=True)
    year = db.Column(db.Integer, nullable=False)

    reviews = relationship('Review', back_populates="movie", order_by='desc(Review.id)')
    watch_lists = relationship('WatchList', secondary= movies_watchlist)
    roles = relationship('Role', back_populates="movie", order_by='asc(Role.id)')

    def to_dict(self):
        return {
            "id": self.id,
            "imdbMovieId": self.imdb_movie_id,
            "title": self.title,
            "image": self.image,
            "description": self.description,
            # "starring": self.starring,
            "year": self.year,
            "watchLists": [watchlist.to_dict_no_movie() for watchlist in self.watch_lists],
            "reviews": [review.to_dict_no_movie() for review in self.reviews],
            "roles": [role.to_dict_no_movie() for role in self.roles],
        }

    def to_dict_no_review(self):
        return {
            "id": self.id,
            "imdbMovieId": self.imdb_movie_id,
            "title": self.title,
            "image": self.image,
            "description": self.description,
            # "starring": self.starring,
            "year": self.year,
            "watchLists": [watchlist.to_dict_no_movie() for watchlist in self.watch_lists],
            "roles": [role.to_dict_no_movie() for role in self.roles],
        }

    def to_dict_no_watchlist(self):
        return {
            "id": self.id,
            "imdbMovieId": self.imdb_movie_id,
            "title": self.title,
            "image": self.image,
            "description": self.description,
            # "starring": self.starring,
            "year": self.year,
            "reviews": [review.to_dict_no_movie() for review in self.reviews],
            "roles": [role.to_dict_no_movie() for role in self.roles],
        }

    def to_dict_no_role(self):
        return {
            "id": self.id,
            "imdbMovieId": self.imdb_movie_id,
            "title": self.title,
            "image": self.image,
            "description": self.description,
            # "starring": self.starring,
            "year": self.year,
            "reviews": [review.to_dict_no_movie() for review in self.reviews],
            "watchLists": [watchlist.to_dict_no_movie() for watchlist in self.watch_lists],
        }
