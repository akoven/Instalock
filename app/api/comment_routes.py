from flask import Blueprint, redirect, request, jsonify
from app.models import db, User, Post, Comment
from app.forms.post_form import PostForm
from flask_login import current_user

comment_routes = Blueprint("comments", __name__, url_prefix="/")

@comment_routes.route("/<commentId>", methods=["PUT"])
def edit_comment(id):
    comment = Comment.query.get(id)
    content = request.json["content"]
    user_id = request.json["user_id"]
    post_id = request.json["post_id"]

    comment.content = content
    comment.user_id = user_id
    comment.post_id = post_id

    db.session.commit()
    return jsonify(comment)

@comment_routes.route("/<commentId>", methods=["DELETE"])
def delete_item(id):
    comment = Comment.query.get(id)

    db.session.delete(comment)
    db.session.commit()

    return redirect("/")
