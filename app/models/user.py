from sqlalchemy.orm import relationship
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100), nullable = False, unique = True)
    email = db.Column(db.String(255), nullable = False, unique = True)
    hashed_password = db.Column(db.String(255), nullable = False)
    about = db.Column(db.Text, nullable = True)

    reviews = relationship('Review', back_populates='user', order_by='asc(Review.id)')
    watch_list = relationship('WatchList', backref="user", uselist=False)
    # followed_users = relationship('Follow', back_populates='followed_user', order_by='asc(Follow.id)')
    # follower_users = relationship('Follow', back_populates='follower_user', order_by='asc(Follow.id)')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)


    def check_password(self, password):
        return check_password_hash(self.password, password)


    def to_dict(self):
        return {
        "id": self.id,
        "username": self.username,
        "email": self.email,
        "about": self.about,
        "reviews": [review.to_dict_no_user() for review in self.reviews],
        }

    def to_dict_no_review(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "about": self.about,
        }
    
        # "followed_users": [followed_user.to_dict() for followed_user in self.followed_users],
        # "following_users": [followed_user.to_dict() for followed_user in self.followed_users]

