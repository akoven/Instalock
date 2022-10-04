from .db import db

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    image_url = db.Column(db.String(2200), nullable=False)

    post = db.relationship("Post", back_populates="images")
    user = db.relationship("User", back_populates="images")

    def to_dict(self):
        return {
            "id": self.id,
            "user": self.user.to_dict(),
            "post": self.post_id,
            "image_url": self.image_url
        }
