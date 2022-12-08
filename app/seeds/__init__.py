from flask.cli import AppGroup
from .users import seed_users, undo_users
from .workspaces import seed_workspaces, undo_workspaces
from .channels import seed_channels, undo_channels
from .messages import seed_messages, undo_messages
from .comments import seed_comments, undo_comments
from .user_workspaces import seed_user_workspaces, undo_user_workspaces

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        # undo_users()
         # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.workspaces RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.workspace_members RESTART IDENTITY CASCADE;")


        # Add a truncate command here for every table that will be seeded.
        db.session.commit()
    seed_users()
    seed_workspaces()
    seed_user_workspaces()
    seed_channels()
    seed_messages()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_workspaces()
    undo_user_workspaces()
    undo_channels()
    undo_messages()
    undo_comments()
    # Add other undo functions here
