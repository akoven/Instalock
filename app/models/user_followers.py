from .db import db

class UserFollower(db.Model):
    __tablename__ = 'user_followers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


    user = db.relationship("User", back_populates="user_followers")

    def to_dict(self):
        return {
            "id": self.id,
            "user": self.user.to_dict(),
            "follower_id": self.follower_id
        }

