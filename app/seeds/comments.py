from ..models import db, Comment

def seed_comments():
    demo1 = Comment(
        content="Nice highscore!", user_id=2, post_id=1)
    demo2 = Comment(
        content="Nice victory! How many kills?", user_id=1, post_id=2)
    demo3 = Comment(
        content="First win in Apex Legends! #onlyW's", user_id=2, post_id=3)
    demo4 = Comment(
        content="This game has a very interesting story #hollowknight", user_id=3, post_id=4)
    demo5 = Comment(
        content="Just built this crazy castle! #minecraft", user_id=3, post_id=5)

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)

    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
