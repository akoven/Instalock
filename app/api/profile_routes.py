from flask import Blueprint, request
from app.forms.profile_form import ProfileEditForm
from app.models import db, Post, User, UserFollower

profile_routes = Blueprint("profile", __name__, url_prefix="/profile")


# Get all
@profile_routes.route('/<user_id>')
def profile_info(user_id):
    profile = User.query.get(user_id)

    find_follower_connections = UserFollower.query.filter(UserFollower.follower_id == user_id).all()
    followers_id_list = [connection.user_id for connection in find_follower_connections]
    follower_count = len(followers_id_list)
    followers = [User.query.get(id).to_dict() for id in followers_id_list]

    find_following_connections = UserFollower.query.filter(UserFollower.user_id == user_id).all()
    following_id_list = [connection.follower_id for connection in find_following_connections]
    following_count = len(following_id_list)
    following = [User.query.get(id).to_dict() for id in following_id_list]

    posts_list = Post.query.filter(Post.user_id == user_id).all()
    posts = [post.to_dict() for post in posts_list]

    result = {
        'profile': profile.to_dict(),
        'followers': followers,
        'follower_count': follower_count,
        'following': following,
        'following_count': following_count,
        'posts': posts,
    }

    return result

@profile_routes.route('/edit/<user_id>', methods=["PUT"])
def edit_profile(user_id):

    edited_profile = ProfileEditForm()
    print("*************************HELLO FROM THE BACKEND****************************")
    print(edited_profile)
    edited_profile['csrf_token'].data = request.cookies['csrf_token']

    profile = User.query.get(user_id)

    if not profile:
        return '404: the object you are looking for is not available'


    username = edited_profile.data['username']
    website = edited_profile.data['website']
    bio = edited_profile.data['bio']
    email = edited_profile.data['email']
    phone = edited_profile.data['phone_number']
    gender = edited_profile.data['gender']
    profile_image_url = edited_profile.data['profile_image_url']


    print("**************************USERNAME**************************************: ", profile.username)

    profile.username = username
    profile.website =  website
    profile.bio = bio
    profile.email = email
    profile.phone = phone
    profile.gender = gender
    profile.profile_image_url = profile_image_url

    print('PROFILE FROM BACKEND: ',profile)
    db.session.commit()
    print('***********************PROFILE*****************************')
    return profile.to_dict()

@profile_routes.route('/edit/<user_id>', methods=['DELETE'])
def deleting_profile(user_id):
    profile = User.query.get(user_id)

    if not profile:
        return '404: the object you are looking for is not available'

    db.session.delete(profile)
    db.session.commit()
