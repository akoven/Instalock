from flask import Blueprint, request
from app.models import db, Comment
from app.models.post import Post
from app.forms.post_form import PostForm
from flask_login import current_user

# post_routes = Blueprint("home", __name__, url_prefix="/user") /posts
post_routes = Blueprint("posts", __name__, url_prefix="/posts")


@post_routes.route('/', methods=["GET"])
def user_home():
    if current_user:
        all_posts = Post.query.all()
        posts = [post.to_dict() for post in all_posts]
        response = { "posts": posts }
        print("-- -- -- -- -- -- -- -- -- -- --")
        print("-- -- -- -- -- -- -- -- -- -- --")
        print("-- -- -- -- -- -- -- -- -- -- --")
        print("-- -- -- -- -- -- -- -- -- -- --")
        print("-- -- -- -- -- -- -- -- -- -- --")
        print(response)
        return response


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

@post_routes.route("/<post_id>/comments")
def post_comments(post_id):
    comments = Comment.query.filter(Comment.post_id == post_id ).all()
    return comments

@post_routes.route("/<id>/comments", methods=['POST'])
def add_comment(id):

    content = request.data.content
    user_id = request.data.user_id
    post_id = request.data.pokemonId

    comment = Comment(
        content=content,
        user_id=user_id,
        post_id=post_id
    )

    db.session.add(comment)
    db.session.commit()
    return comment
