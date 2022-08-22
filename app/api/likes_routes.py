from flask import Blueprint
from app.models import db
from app.models.likes import Likes
from flask_login import current_user
likes_routes = Blueprint("likes",__name__,url_prefix="/likes")

@likes_routes.route('/user/<int:id>', methods=["GET","DELETE"])
def likes():
    if current_user:
        all_likes = Likes.query.all()
        return all_likes
