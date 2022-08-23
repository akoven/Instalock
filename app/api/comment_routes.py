from flask import Blueprint, redirect, request, jsonify
from app.models import db, User, Post, Comment
from app.forms import CommentForm
from flask_login import current_user


comment_routes = Blueprint("comments", __name__, url_prefix="/comments")

@comment_routes.route("/<comment_id>", methods=["PUT"])
def edit_comment(comment_id):
    #TODO check if user logged in is comment author

    comment_form = CommentForm()
    comment_form['csrf_token'].data = request.cookies['csrf_token']
    comment = Comment.query.get(comment_id)

    if current_user.id == comment.user_id:

        comment.content = comment_form.data["content"]

        db.session.commit()
        return comment.to_dict()
    else:
         return '404: unauthorized user'

@comment_routes.route("/<comment_id>", methods=["DELETE"])
def delete_item(comment_id):
    comment = Comment.query.get(comment_id)
    if current_user.id == comment.user_id:

        db.session.delete(comment)
        db.session.commit()

        return "Successfully Deleted"
    else:
        return '404: unauthorized user'
