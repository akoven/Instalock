from sqlite3 import Row
from flask import Blueprint
from app.models import db, Comment, Post, Like
from app.forms import LikeForm
from flask_login import current_user
likes_routes = Blueprint("likes",__name__,url_prefix="/likes")

# @likes_routes.route('/<post_id>', methods=["POST"])
# def post_likes():
#     if current_user:
#         all_likes = Like.query.all()
#         return all_likes

# @likes_routes.route('/<comment_id>', methods=["POST"])
# def comment_likes():
#     if current_user:
#         all_likes = Like.query.all()
#         return all_likes

@likes_routes.route('/', methods=["POST"])
def like():
    if not current_user.is_authenticated(): # beginning of error handling
        return { 'errors': ['Unauthorized, please log in'] }


    form = LikeForm()

    user_id = form.data['user_id']
    post_id = form.data['post_id']
    comment_id = form.data['comment_id']

    if form.validate_on_submit():
        if post_id and not comment_id:
            post = Post.query.get(post_id)
            post.likes += 1

            new_like = Like(
                user_id = user_id
                post_id = post_id
            )

            db.session.add(new_like)
            db.session.commit()
            return new_like.to_dict()

        elif comment_id and not post_id:
            comment = Comment.query.get(comment_id)
            comment.likes += 1

            new_like = Like(
                user_id = user_id
                comment_id = comment_id
            )

            db.session.add(new_like)
            db.session.commit()
            return new_like.to_dict()
        else:
            return "Something happened, you're not supposed to see this!"


@likes_routes.route('/<like_id>', methods=['DELETE'])
def remove_like(like_id):
    if not current_user.is_authenticated(): # beginning of error handling
        return { 'errors': ['Unauthorized, please log in'] }

    #TODO make sure it's their like to remove

    like = Like.query.get(like_id)

    db.session.delete(like)
    db.session.commit()
