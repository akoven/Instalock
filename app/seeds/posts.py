from ..models import db, Post


# Adds demo posts
def seed_posts():
    demo1 = Post(
        caption="Beat my highscore! #tetris", user_id=1, image_url="https://i.redd.it/kgbhscpkapj11.png")
    demo2 = Post(
        caption="Another Victory Royale! #fortnite", user_id=2, image_url="https://pbs.twimg.com/media/DiBaPYhX4AApm6Z.jpg")
    demo3 = Post(
        caption="First win in Apex Legends! #onlyW's", user_id=3, image_url="https://i.redd.it/kgbhscpkapj11.png")
    demo4 = Post(
        caption="This game has a very interesting story #hollowknight", user_id=1, image_url="https://static.wikia.nocookie.net/hollowknight/images/b/bb/Screenshot_HK_The_Pale_King_05.png")
    demo5 = Post(
        caption="Just built this crazy castle! #minecraft", user_id=2, image_url="https://cdn.mos.cms.futurecdn.net/qAkSrfvdpWmRNiFWw4CC9T.jpg")

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)

    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
