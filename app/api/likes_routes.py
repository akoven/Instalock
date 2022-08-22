from sqlite3 import Row
from flask import Blueprint
from app.models import db
from app.models import Comment, Post
from app.models.likes import Like
from app.models.post import Post
from app.forms import LikeForm, PostForm
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

@likes_routes.route('/<comment_id>', method=["POST"])
def comment_likes(comment_id):
    form = LikeForm()

    content = form.data['content']
    user_id = form.data['user_id']
    post_id = form.data['post_id']
    comment_id = form.data['comment_id']
    total_likes = Comment.likes

    if comment_id:
        total_likes += 1
        comment = Comment(
            content = content,
            user_id = user_id,
            post_id = post_id,
            likes = total_likes
        )

        db.session.add(comment)
        db.session.commit()
    else:
        'something went wrong'
@likes_routes.route('/<post_id>', method=["POST"])
def post_likes(post_id):
    form = Post()

    caption = form.data['caption']
    user_id = form.data['user_id']
    likes = form.data['likes']
    image_url = form.data['image_url']
    total_likes = Post.likes

    if post_id:
        total_likes += 1

        post = Post(
            caption = caption,
            user_id = user_id,
            likes = total_likes,
            image_url = image_url,
        )

        db.session.add(post)
        db.session.commit()
    else:
        'something went wrong'

@likes_routes.route('<post_id>', methods=["DELETE"])
def delete_post_like(post_id):
    form = Post()

    caption = form.data['caption']
    user_id = form.data['user_id']
    likes = form.data['likes']
    image_url = form.data['image_url']
    total_likes = Post.likes

    if post_id:
        total_likes -= 1

        post = Post(
            caption = caption,
            user_id = user_id,
            likes = total_likes,
            image_url = image_url,
            total_likes = total_likes
        )
        db.session.add(post)
        db.session.commit()
    else:
        return 'Something went wrong'

@likes_routes.route('<comment_id>', methods=["DELETE"])
def delete_comment_like():
    form = LikeForm()

    content = form.data['content']
    user_id = form.data['user_id']
    post_id = form.data['post_id']
    comment_id = form.data['comment_id']
    total_likes = Comment.likes

    if comment_id:
        total_likes -= 1
        comment = Comment(
            content = content,
            user_id = user_id,
            post_id = post_id,
            likes = total_likes
        )
        db.session.add(comment)
        db.session.commit()
    else:
        return 'Something went wrong'
