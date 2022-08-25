from dis import dis
from flask import Blueprint, request, redirect
from app.models import db, Comment, Post
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

    user_id = new_post.data['user_id']
    caption = new_post.data['caption']
    image_url = new_post.data['image_url']

    if new_post.validate_on_submit() and current_user.id == user_id:
        post = Post(
            user_id = user_id,
            caption = caption,
            image_url = image_url
        )

        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    else:
        return '403: unauthorized user'

@post_routes.route('/<post_id>', methods=['PUT'])
def update_post(post_id):
    post = Post.query.get(post_id)

    if not post:
        return "Error 404: The post you're looking for couldn't be found"

    updated_post = PostForm()

    updated_post['csrf_token'].data = request.cookies['csrf_token']
    caption = updated_post.data['caption']
    image_url = updated_post.data['image_url']
    display_comments = updated_post.data['display_comments']

    post.caption = caption
    post.image_url = image_url
    post.display_comments = display_comments

    db.session.commit()
    return post.to_dict()


@post_routes.route("/<post_id>/comments")
def post_comments(post_id):
    comments = Comment.query.filter(Comment.post_id == post_id ).all()

    if not comments:
        return "Error 404: The comments you're looking for couldn't be found"

    response = [comment.to_dict() for comment in comments]
    res = { "comments": response }
    return res


@post_routes.route("/<post_id>")
def single_post(post_id):
    post = Post.query.get(post_id)

    if not post:
        return "Error 404: The post you're looking for couldn't be found"

    return post.to_dict()


@post_routes.route("/<post_id>/comments", methods=['POST'])
def add_comment(post_id):
    comment_form = CommentForm()

    content = comment_form.data['content']
    user_id = comment_form.data['user_id']
    post_id = comment_form.data['post_id']

    comment_form['csrf_token'].data = request.cookies['csrf_token']
    if comment_form.validate_on_submit() and current_user.id == user_id:

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
        return '403: unauthorized user'


@post_routes.route("/<post_id>", methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get(post_id)

    if not post:
        return "Error 404: The post you're looking for couldn't be found"

    # if current_user.id == post.user.id:
    #     post = Post.query.get(post_id)
    # else:
    #     return '403: unauthorized user'

    db.session.delete(post)
    db.session.commit()

    return "Successfully Deleted"
