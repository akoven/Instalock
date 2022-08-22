from flask import Blueprint, request
from app.models import db, User, Post
from app.forms import post_form
from flask_login import current_user

post_routes = Blueprint("home",__name__,url_prefix="/user/<int:id>")
new_post_routes = Blueprint("posts",__name__,url_prefix="/posts")

@post_routes.route('/', methods=["GET"])
def user_home():
    if current_user:
        all_posts = Post.query.all()
        return all_posts

@new_post_routes.route('/user/<int:id>', methods=["GET","POST"])
def user_posts(id):
    new_post = post_form()
    post = Post(
        caption = new_post.data['caption'],
        image_url = new_post.data['image_url']
    )

    db.session.add(post)
    db.session.commit()
