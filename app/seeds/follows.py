from ..models import db, UserFollower


def seed_followers():
    demo1 = UserFollower(user_id=1, follower_id=2)
    demo2 = UserFollower(user_id=2, follower_id=1)
    demo3 = UserFollower(user_id=2, follower_id=3)
    demo4 = UserFollower(user_id=3, follower_id=1)

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)

    db.session.commit()


def undo_followers():
    db.session.execute('TRUNCATE user_followers RESTART IDENTITY CASCADE;')
    db.session.commit()
