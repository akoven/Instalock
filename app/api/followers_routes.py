from flask import Blueprint, request
from app.models import db, UserFollower
from flask_login import current_user
from app.forms import UserFollowerForm

followers_routes = Blueprint("followers", __name__, url_prefix="/followers")

@followers_routes.route('/', methods=['POST'])
def follow():
    form = UserFollowerForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = form.data["user_id"]
        follower_id = form.data["follower_id"]

        follow_log = UserFollower.query.filter(UserFollower.user_id == user_id).filter(UserFollower.follower_id == follower_id).first()

        if not follow_log:
            new_follow = UserFollower(
                user_id = user_id,
                follower_id = follower_id
            )

            db.session.add(new_follow)
            db.session.commit()

            return new_follow.to_dict()
        else:
            return 'Already following this user'


@followers_routes.route('/<user_id>/<follower_id>', methods=['DELETE'])
def unfollow(user_id, follower_id):
    follow_log = UserFollower.query.filter(UserFollower.user_id == user_id).filter(UserFollower.follower_id == follower_id).first()

    db.session.delete(follow_log)
    db.session.commit()

    return "Successfully unfollowed"
