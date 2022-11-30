from app.models import db, Channel
import os


# Adds a demo user, you can add other users here if you want
def seed_channels():
    agents_channel_one = Channel( name="General", workspace_id=1)
    agents_channel_two = Channel( name="Reports", workspace_id=1)
    reds_channel_one = Channel( name="Shotgun", workspace_id=2)
    reds_channel_two = Channel( name="No One Likes Griff", workspace_id=2)
    blues_channel_one = Channel( name="Chaos Crew", workspace_id=3)
    blues_channel_two = Channel( name="No Caboose", workspace_id=3)
    rofl_channel_one = Channel( name="Epic Fails", workspace_id=4)
    rofl_channel_two = Channel( name="Dad Jokes", workspace_id=4)


    db.session.add(agents_channel_one)
    db.session.add(agents_channel_two)
    db.session.add(reds_channel_one)
    db.session.add(reds_channel_two)
    db.session.add(blues_channel_one)
    db.session.add(blues_channel_two)
    db.session.add(rofl_channel_one)
    db.session.add(rofl_channel_two)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_channels():
    if os.environ.get("FLASK_ENV") == 'development':
        db.session.execute('DELETE FROM channels;')
    else:
        db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')

    db.session.commit()
