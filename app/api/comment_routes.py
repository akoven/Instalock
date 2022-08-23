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
    if comment_form.validate_on_submit():
        comment = Comment.query.get(comment_id)

        comment.content = comment_form.data["content"]

        db.session.commit()
        return comment.to_dict()
    else:
        return "Didn't make it to the if"

@comment_routes.route("/<comment_id>", methods=["DELETE"])
def delete_item(comment_id):
    #TODO user auth for deletion
    comment = Comment.query.get(comment_id)
    if current_user.is_authenticated and current_user.get_id() == comment.user_id:

        db.session.delete(comment)
        db.session.commit()

        return "Successfully Deleted"
    else:
        return "User not logged in"
