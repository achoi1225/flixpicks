from sqlalchemy.orm import relationship
from .db import db

class Trailer(db.Model):
    __tablename__ = 'trailers'

    id = db.Column(db.Integer, primary_key=True)
    imdb_id = db.Column(db.String(300), db.ForeignKey('movies.imdb_movie_id'))
    trailer_id = db.Column(db.String(300), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "imdbMovieId": self.imdb_id,
            "trailerId": self.trailer_id,
        }

