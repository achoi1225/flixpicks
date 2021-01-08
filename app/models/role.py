from sqlalchemy.orm import relationship
from .db import db


class Role(db.Model):
    __tablename__ = 'roles'

    id = db.Column(db.Integer, primary_key=True)
    imdb_id = db.Column(db.ForeignKey('movies.imdb_movie_id'), nullable=False)
    character = db.Column(db.String(300), nullable=False)
    actor = db.Column(db.String(300), nullable=False)
    image = db.Column(db.String(300), nullable=True)

    movie = relationship(
        'Movie', back_populates="roles", order_by='asc(Movie.id)')

    def to_dict(self):
        return {
            "id": self.id,
            "imdbId": self.imdb_id,
            "character": self.character,
            "actor": self.actor,
            "image": self.image,
            "movie": self.movie.to_dict_no_role(),
        }

    def to_dict_no_movie(self):
        return {
            "id": self.id,
            "imdbId": self.imdb_id,
            "character": self.character,
            "actor": self.actor,
            "image": self.image,
        }
