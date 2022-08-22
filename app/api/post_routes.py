from flask import Blueprint, request
from app.models import db
from app.models.post import Post
from app.forms.post_form import PostForm
from flask_login import current_user

post_routes = Blueprint("home",__name__,url_prefix="/user/<int:id>")
new_post_routes = Blueprint("posts",__name__,url_prefix="/posts")

@post_routes.route('/', methods=["GET"])
def user_home():
    if current_user:
        all_posts = Post.query.all()
        return all_posts

@new_post_routes.route('/user/<int:id>', methods=["POST"])
def user_posts(id):
    new_post = PostForm()
    if new_post.validate_on_submit():
        new_post['csrf_token'].data = request.cookies['csrf_token']

        post = Post(
            user_id = new_post.data['user_id'],
            caption = new_post.data['caption'],
            image_url = new_post.data['image_url']
        )

    db.session.add(post)
    db.session.commit()
