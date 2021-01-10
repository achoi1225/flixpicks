from sqlalchemy.orm import relationship
from sqlalchemy import CheckConstraint
from .db import db

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key = True)
    content = db.Column(db.Text, nullable = False)
    user_id = db.Column(db.ForeignKey('users.id'))
    imdb_id = db.Column(db.ForeignKey('movies.imdb_movie_id'), nullable = False)
    stars = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default = db.func.now())

    __table_args__ = (
        CheckConstraint('stars >= 0 and stars <= 5', name='check_stars_limit'),
        {})

    user = relationship('User', back_populates="reviews")
    movie = relationship('Movie', back_populates="reviews")  
    #  
    # DateTime(timezone=True), server_default = func.now()
    # user = relationship('User', foreign_keys='Review.user_id')

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "userId": self.user_id,
            "imdb_id": self.imdb_id,
            "stars": self.stars,
            "user": self.user.to_dict_no_review(),
            "movie": self.movie.to_dict_no_review(),
            "created_at": self.created_at,
        }
    
    def to_dict_no_user(self):
        return {
            "id": self.id,
            "content": self.content,
            "userId": self.user_id,
            "imdb_id": self.imdb_id,
            "stars": self.stars,
            "movie": self.movie.to_dict_no_review(),
            "created_at": self.created_at,
        }

    def to_dict_no_movie(self):
        return {
            "id": self.id,
            "content": self.content,
            "userId": self.user_id,
            "imdb_id": self.imdb_id,
            "stars": self.stars,
            "user": self.user.to_dict_no_review(),
            "created_at": self.created_at,
        }
