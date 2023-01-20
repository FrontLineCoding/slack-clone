from app.models import db, Comment
import os

# Adds a demo user, you can add other users here if you want
def seed_comments():
   comment_1 = Comment(user_id=4, message_id=2, content="Umm... Maine?")
   comment_2 = Comment(user_id=4, message_id=4, content="Ready for the next mission. How about you?")
   comment_3 = Comment(user_id=9, message_id=7, content="No one cares Simmons")
   comment_4 = Comment(user_id=7, message_id=8, content="It's not for chicks! It's for killing the reds!")
   comment_5 = Comment(user_id=6, message_id=9, content="Can I come?")
   comment_6 = Comment(user_id=5, message_id=10, content="You feeling alright, Caboose?")
   comment_7 = Comment(user_id=9, message_id=12, content="Dude! You can't pick up chicks with a tank!")
   comment_8 = Comment(user_id=7, message_id=12, content="It's not to pick up chicks!")
   comment_9 = Comment(user_id=5, message_id=12, content="Riiiight. Okay, Church.")
   comment_10 = Comment(user_id=6, message_id=12, content="I love Sheila")
   comment_11 = Comment(user_id=9, message_id=13, content="shotgun")

   db.session.add(comment_1)
   db.session.add(comment_2)
   db.session.add(comment_3)
   db.session.add(comment_4)
   db.session.add(comment_5)
   db.session.add(comment_6)
   db.session.add(comment_7)
   db.session.add(comment_8)
   db.session.add(comment_9)
   db.session.add(comment_10)
   db.session.add(comment_11)

   db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    if os.environ.get("FLASK_ENV") == 'development':
        db.session.execute('DELETE FROM comments;')
    else:
        db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
