from flask import Blueprint, request
from app.models import db, UserFollower, User
from flask_login import current_user
from app.forms import UserFollowerForm

followers_routes = Blueprint("followers", __name__, url_prefix="/followers")

@followers_routes.route('/<user_id>')
def get_followers(user_id):
    find_follower_connections = UserFollower.query.filter(UserFollower.follower_id == user_id).all()
    # followers_id_list = [connection.user_id for connection in find_follower_connections]]
    # followers = [User.query.get(id).to_dict() for id in followers_id_list]
    followers_dict = { connection.id: User.query.get(connection.user_id).to_dict() for connection in find_follower_connections }
    follower_count = len(followers_dict.values())

    find_following_connections = UserFollower.query.filter(UserFollower.user_id == user_id).all()
    # following_id_list = [connection.follower_id for connection in find_following_connections]
    # following = [User.query.get(id).to_dict() for id in following_id_list]
    following_dict = { connection.id: User.query.get(connection.follower_id).to_dict() for connection in find_following_connections }
    following_count = len(following_dict.values())

    result = {
        'followers': followers_dict,
        'follower_count': follower_count,
        'following': following_dict,
        'following_count': following_count
    }

    return result

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


@followers_routes.route('/<follow_id>', methods=['DELETE'])
def unfollow(follow_id):
    if current_user.is_authenticated:
        follow_log = UserFollower.query.get(follow_id)

        db.session.delete(follow_log)
        db.session.commit()
        return "Successfully unfollowed"

    else:
        return "Please log in to unfollow this User", 403
