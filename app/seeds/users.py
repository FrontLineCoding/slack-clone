from app.models import db, User, environment, SCHEMA
from werkzeug.security import generate_password_hash


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', email='demo@aa.io', hashed_password=generate_password_hash('password'))
    Tex = User(
        first_name='Tex', last_name='Agent', email='Tex@aa.io', hashed_password=generate_password_hash('password'), user_profile_img='https://taut.s3.us-east-2.amazonaws.com/seeder++user+photos/Tex.JPG')
    Maine = User(
        first_name='Maine', last_name='Agent', email='Maine@aa.io', hashed_password=generate_password_hash('password'), user_profile_img='https://taut.s3.us-east-2.amazonaws.com/seeder++user+photos/Maine.JPG')
    Washington = User(
        first_name='Washington', last_name='Agent', email='Washington@aa.io', hashed_password=generate_password_hash('password'), user_profile_img='https://taut.s3.us-east-2.amazonaws.com/seeder++user+photos/Washington.JPG')
    Tucker = User(
        first_name='Tucker', last_name='Blue', email='Tucker@aa.io', hashed_password=generate_password_hash('password'), user_profile_img='https://taut.s3.us-east-2.amazonaws.com/seeder++user+photos/Tucker.JPG')
    Caboose = User(
        first_name='Caboose', last_name='Blue', email='Caboose@aa.io', hashed_password=generate_password_hash('password'), user_profile_img='https://taut.s3.us-east-2.amazonaws.com/seeder++user+photos/Caboose.JPG')
    Church = User(
        first_name='Church', last_name='Blue', email='Church@aa.io', hashed_password=generate_password_hash('password'), user_profile_img='https://taut.s3.us-east-2.amazonaws.com/seeder++user+photos/Church.JPG')
    Sarge = User(
        first_name='Sarge', last_name='Red', email='Sarge@aa.io', hashed_password=generate_password_hash('password'), user_profile_img='https://taut.s3.us-east-2.amazonaws.com/seeder++user+photos/Sarge.JPG')
    Griff = User(
        first_name='Grif', last_name='Red', email='Grif@aa.io', hashed_password=generate_password_hash('password'), user_profile_img='https://taut.s3.us-east-2.amazonaws.com/seeder++user+photos/Grif.JPG')
    Simmons = User(
        first_name='Simmons', last_name='Red', email='Simmons@aa.io', hashed_password=generate_password_hash('password'), user_profile_img='https://taut.s3.us-east-2.amazonaws.com/seeder++user+photos/Simmons.JPG')

    db.session.add(demo)
    db.session.add(Tex)
    db.session.add(Maine)
    db.session.add(Washington)
    db.session.add(Tucker)
    db.session.add(Caboose)
    db.session.add(Church)
    db.session.add(Sarge)
    db.session.add(Griff)
    db.session.add(Simmons)

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
