from sqlalchemy.orm import relationship
from .db import db

class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key = True)
    followed_id = db.Column(db.ForeignKey('users.id'), nullable=False)
    follower_id = db.Column(db.ForeignKey('users.id'), nullable=False)

    followed_user = relationship('User', foreign_keys='Follow.followed_id')
    follower_user = relationship('User', foreign_keys='Follow.follower_id')

#    followed_user = relationship('User', foreign_keys='Follow.followed_id', back_populates='followed_users')
#     follower_user = relationship('User', foreign_keys='Follow.follower_id', back_populates='follower_users')

    def to_dict(self):
        return {
            "id": self.id,
            "followedId": self.followed_id,
            "followerId": self.follower_id,
            "followed_user": self.followed_user.to_dict(),
            "following_user": self.following_user.to_dict()
        }
