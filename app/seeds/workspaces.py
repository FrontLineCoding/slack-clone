from app.models import db, Workspace
import os

# Adds a demo user, you can add other users here if you want
def seed_workspaces():
    agents = Workspace(
        name="Agents", owner_id=2, img='https://taut.s3.us-east-2.amazonaws.com/Seed+Workspace+photos/agentsWorkspace.JPG')
    red = Workspace(
        name="Reds ", owner_id=8, img='https://taut.s3.us-east-2.amazonaws.com/Seed+Workspace+photos/redSquare.JPG')
    blue = Workspace(
        name="Blues", owner_id=7, img='https://taut.s3.us-east-2.amazonaws.com/Seed+Workspace+photos/blueSquare.JPG')
    rofl = Workspace(
        name="ROFL COPTER", owner_id=9, img='https://taut.s3.us-east-2.amazonaws.com/Seed+Workspace+photos/rofl-copter.JPG')


    db.session.add(agents)
    db.session.add(red)
    db.session.add(blue)
    db.session.add(rofl)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_workspaces():
    if os.environ.get("FLASK_ENV") == 'development':
        db.session.execute('DELETE FROM workspaces;')
    else:
        db.session.execute('TRUNCATE workspaces RESTART IDENTITY CASCADE;')
    db.session.commit()
