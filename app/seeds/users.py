from app.models import db, User, environment, SCHEMA
from werkzeug.security import generate_password_hash


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', email='demo@aa.io', hashed_password=generate_password_hash('password'))
    Tex = User(
        first_name='Tex', last_name='Agent', email='Tex@aa.io', hashed_password=generate_password_hash('password'))
    Maine = User(
        first_name='Maine', last_name='Agent', email='Maine@aa.io', hashed_password=generate_password_hash('password'))
    Washington = User(
        first_name='Washington', last_name='Agent', email='Washington@aa.io', hashed_password=generate_password_hash('password'))
    Tucker = User(
        first_name='Tucker', last_name='Blue', email='Tucker@aa.io', hashed_password=generate_password_hash('password'))
    Caboose = User(
        first_name='Caboose', last_name='Blue', email='Caboose@aa.io', hashed_password=generate_password_hash('password'))
    Church = User(
        first_name='Church', last_name='Blue', email='Church@aa.io', hashed_password=generate_password_hash('password'))
    Sarge = User(
        first_name='Sarge', last_name='Red', email='Sarge@aa.io', hashed_password=generate_password_hash('password'))
    Griff = User(
        first_name='Griff', last_name='Red', email='Griff@aa.io', hashed_password=generate_password_hash('password'))
    Simmons = User(
        first_name='Simmons', last_name='Red', email='Simmons@aa.io', hashed_password=generate_password_hash('password'))

    db.session.add(demo)
    db.session.add(Tex)
    db.session.add(Washington)
    db.session.add(Tucker)
    db.session.add(Caboose)
    db.session.add(Church)
    db.session.add(Sarge)
    db.session.add(Griff)
    db.session.add(Simmons)
    db.session.add(Maine)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
