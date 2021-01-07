from sqlalchemy import Table
from sqlalchemy.orm import relationship
# from sqlalchemy.ext.declarative import declarative_base
from . import db
# Base = declarative_base()

movies_watchlist = Table('movies_watchlist', db.Model.metadata,
    db.Column('movie_id', db.Integer, db.ForeignKey('movies.id')),
    db.Column('watchlist_id', db.Integer, db.ForeignKey('watchLists.id'))
)

class WatchList(db.Model):
    __tablename__ = 'watchLists'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.ForeignKey('users.id'))

    movies = relationship('Movie', secondary=movies_watchlist, order_by='asc(Movie.id)')

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "movieId": self.movie_id,
            "movies": [movie.to_dict_no_watchlist() for movie in self.movies],
        }

    def to_dict_no_movie(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "movieId": self.movie_id,
        }
