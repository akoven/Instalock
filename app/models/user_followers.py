from .db import db,environment, SCHEMA, add_prefix_for_prod

class UserFollower(db.Model):
    __tablename__ = 'user_followers'

    if environment == "production":
        __table_args__ = {'schema':SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    # user = db.relationship("User", back_populates="following", foreign_keys=[user_id])
    # follower = db.relationship("User", back_populates="followers", foreign_keys=[follower_id])

    def to_dict(self):
        return {
            "id": self.id,
            "user": self.user_id,
            "follower_id": self.follower_id,
        }
