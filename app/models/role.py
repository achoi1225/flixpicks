from sqlalchemy.orm import relationship
from .db import db


class Role(db.Model):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.ForeignKey('movies.id'), nullable=False)
    character = db.Column(db.String(300), nullable=False)
    actor = db.Column(db.String(300), nullable=False)

    movie = relationship(
        'Movie', back_populates="roles", order_by='asc(Movie.id)')

    def to_dict(self):
        return {
            "id": self.id,
            "movieId": self.movie_id,
            "character": self.character,
            "actor": self.actor,
            "movie": movie.to_dict_no_role(),
        }

    def to_dict_no_movie(self):
        return {
            "id": self.id,
            "movieId": self.movie_id,
            "character": self.character,
            "actor": self.actor,
        }
