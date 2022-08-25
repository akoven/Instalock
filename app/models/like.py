from .db import db


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=True)
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'), nullable=True)

    user = db.relationship('User', back_populates='likes')
    post = db.relationship('Post', back_populates='likes')
    comment = db.relationship('Comment', back_populates='likes')

    def to_dict(self):
        return {
            'user_id': self.user.to_dict(),
            'post_id': self.post_id,
            'comment_id': self.comment_id,
        }
