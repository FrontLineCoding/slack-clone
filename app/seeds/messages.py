from app.models import db, Message
import os

# Adds a demo user, you can add other users here if you want
def seed_messages():
    tex_report = Message(
        user_id=2, channel_id=2, content="The Blues are clueless to the Reds plans.")
    maine_gone_rouge = Message(
        user_id=3, channel_id=2, content="I will be going rouge. I hope to see you soon. *sinister laughing*")
    washington_report = Message(
        user_id=4, channel_id=2, content="Training with South went well.")
    tex_general = Message(
        user_id=2, channel_id=1, content="How is everyone?")
    sarge_fav_word = Message(
        user_id=8, channel_id=3, content="I said SHOTGUN")
    griff_not_caring = Message(
        user_id=9, channel_id=4, content="I'm gonna go take a nap")
    simmons_always_serious = Message(
        user_id=10, channel_id=4, content="I will be making repairs to the network today.")
    tucker_classic = Message(
        user_id=5, channel_id=5, content="Dude. How are you supposed to pick up chicks in a tank?")
    church_classic = Message(
        user_id=7, channel_id=5, content="I'm going to watch the Reds through the sniper, but not kill any of them")
    caboose_possessed  = Message(
        user_id=6, channel_id=6, content="MY NAME IS O'MALLY")
    griff_blue_fail = Message(
        user_id=9, channel_id=7, content="I totally saw the Blues spying on us through a sniper")
    tucker_church_fail = Message(
        user_id=5, channel_id=7, content="Church got a tank to try to pick up chicks!")
    sarge_hates_griff = Message(
        user_id=8, channel_id=7, content="Griff")
    simmons_joke = Message(
        user_id=10, channel_id=8, content="I'm afraid for the calendar. Its days are numbered.")
    griff_joke = Message(
        user_id=9, channel_id=8, content="What do you call a fish wearing a bowtie?" "Sofishticated")
    tucker_joke = Message(
        user_id=5, channel_id=8, content="Dear Math, grow up and solve your own problems")
    sarge_joke = Message(
        user_id=7, channel_id=8, content="What did the ocean say to the beach?  Nothing, it just waved.")


    db.session.add(tex_report)
    db.session.add(maine_gone_rouge)
    db.session.add(washington_report)
    db.session.add(tex_general)
    db.session.add(sarge_fav_word)
    db.session.add(griff_not_caring)
    db.session.add(simmons_always_serious)
    db.session.add(tucker_classic)
    db.session.add(church_classic)
    db.session.add(caboose_possessed)
    db.session.add(griff_blue_fail)
    db.session.add(tucker_church_fail)
    db.session.add(sarge_hates_griff)
    db.session.add(simmons_joke)
    db.session.add(griff_joke)
    db.session.add(tucker_joke)
    db.session.add(sarge_joke)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_messages():
    if os.environ.get("FLASK_ENV") == 'development':
        db.session.execute('DELETE FROM messages;')
    else:
        db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
