from .db import db,environment, SCHEMA, add_prefix_for_prod

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.String(2200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    likes = db.Column(db.Integer, default=0)
    image_url = db.Column(db.String, nullable=False)
    display_comments = db.Column(db.Boolean, default=True)

    user = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="post", cascade="all, delete-orphan")
    like_list = db.relationship("Like", back_populates="post", cascade="all, delete-orphan")
    images = db.relationship("Image", back_populates="post", cascade="all, delete-orphan")


    def to_dict(self):
        return {
            "id": self.id,
            "caption": self.caption,
            "user": self.user.to_dict(),
            "likes": self.likes,
            "like_list": [like.to_dict() for like in self.like_list],
            "image_url": self.image_url,
            "comments": [comment.to_dict() for comment in self.comments],
            "display_comments": self.display_comments
        }

    def __repr__(self):
        return f"""
            < Post ID: {self.id}\n
              Caption: {self.caption}\n
              User: {self.user.to_dict()}\n
              Likes: {self.likes}\n
              Image URL: {self.image_url} >
            """
