from crypt import methods
from flask import Blueprint, request, redirect
from app.models import db, Comment
from app.models.post import Post
from app.forms import PostForm, CommentForm
from flask_login import current_user

# post_routes = Blueprint("home", __name__, url_prefix="/user") /posts
post_routes = Blueprint("posts", __name__, url_prefix="/posts")


@post_routes.route('/', methods=["GET"])
def user_home():
    if current_user:
        all_posts = Post.query.all()
        posts = [post.to_dict() for post in all_posts]
        response = { "posts": posts }
        return response
    else:
        return "Unauthorized"


@post_routes.route('/', methods=["POST"])
def user_posts():
    new_post = PostForm()

    new_post['csrf_token'].data = request.cookies['csrf_token']
    if new_post.validate_on_submit():
        post = Post(
            user_id = new_post.data['user_id'],
            caption = new_post.data['caption'],
            image_url = new_post.data['image_url']
        )

        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    else:
        return "Didn't hit the if"
        #TODO error handling


@post_routes.route("/<post_id>/comments")
def post_comments(post_id):
    comments = Comment.query.filter(Comment.post_id == post_id ).all()
    response = [comment.to_dict() for comment in comments]
    res = { "comments": response }
    return res


@post_routes.route("/<post_id>")
def single_post(post_id):
    post = Post.query.get(post_id)
    return post.to_dict()


@post_routes.route("/<post_id>/comments", methods=['POST'])
def add_comment(post_id):
    comment_form = CommentForm()

    comment_form['csrf_token'].data = request.cookies['csrf_token']
    if comment_form.validate_on_submit():
        content = comment_form.data["content"]
        user_id = comment_form.data["user_id"]
        post_id = comment_form.data["post_id"]

        comment = Comment(
            content=content,
            user_id=user_id,
            post_id=post_id
        )

        post = Post.query.get(post_id)

        comment.post = post

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    else:
        return "Didn't hit the if" #TODO error handling


@post_routes.route("/<post_id>", methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get(post_id)

    db.session.delete(post)
    db.session.commit()

    return "Successfully Deleted"

    
