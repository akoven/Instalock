from .db import db,environment, SCHEMA, add_prefix_for_prod


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=True)
    comment_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('comments.id')), nullable=True)

    user = db.relationship('User', back_populates='likes')
    post = db.relationship('Post', back_populates='like_list')
    comment = db.relationship('Comment', back_populates='like_list')

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'post_id': self.post_id,
            'comment_id': self.comment_id,
        }
