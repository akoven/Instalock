from turtle import back
from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(2200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    likes = db.Column(db.Integer, default=0)

    post = db.relationship("Post", back_populates="comments")
    user = db.relationship("User", back_populates="comments")
    like_list = db.relationship("Like", back_populates="comment", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "user": self.user.to_dict(),
            "post": self.post_id,
            "likes": self.likes
        }
