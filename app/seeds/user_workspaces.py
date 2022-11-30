from app.models import db
from app.models.workspace import WorkspaceMember
import os

def seed_user_workspaces():
    demo = WorkspaceMember(user_id=1, workspace_id=1)
    demo2 = WorkspaceMember(user_id=1, workspace_id=2)
    demo3 = WorkspaceMember(user_id=1, workspace_id=3)
    demo4 = WorkspaceMember(user_id=1, workspace_id=4)

    tex = WorkspaceMember(user_id=2, workspace_id=1)
    tex2 = WorkspaceMember(user_id=2, workspace_id=3)
    maine = WorkspaceMember(user_id=3, workspace_id=1)
    washington = WorkspaceMember(user_id=4, workspace_id=1)

    caboose_blue = WorkspaceMember(user_id=6, workspace_id=3)
    caboose_rofl = WorkspaceMember(user_id=6, workspace_id=4)
    church_blue = WorkspaceMember(user_id=7, workspace_id=3)
    church_rofl = WorkspaceMember(user_id=7, workspace_id=4)
    tucker_blue = WorkspaceMember(user_id=5, workspace_id=3)
    tucker_rofl = WorkspaceMember(user_id=5, workspace_id=4)

    sarge_red = WorkspaceMember(user_id=8, workspace_id=2)
    sarge_rofl = WorkspaceMember(user_id=8, workspace_id=4)
    griff_red = WorkspaceMember(user_id=9, workspace_id=2)
    griff_rofl = WorkspaceMember(user_id=9, workspace_id=4)
    simmons_red = WorkspaceMember(user_id=10, workspace_id=2)
    simmons_rofl = WorkspaceMember(user_id=10, workspace_id=4)




    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(tex)
    db.session.add(tex2)
    db.session.add(maine)
    db.session.add(washington)
    db.session.add(caboose_blue)
    db.session.add(caboose_rofl)
    db.session.add(tucker_blue)
    db.session.add(tucker_rofl)
    db.session.add(church_blue)
    db.session.add(church_rofl)
    db.session.add(sarge_red)
    db.session.add(sarge_rofl)
    db.session.add(griff_red)
    db.session.add(griff_rofl)
    db.session.add(simmons_red)
    db.session.add(simmons_rofl)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_user_workspaces():
    if os.environ.get("FLASK_ENV") == 'development':
        db.session.execute('DELETE FROM workspace_members;')
    else:
        db.session.execute('TRUNCATE workspace_members RESTART IDENTITY CASCADE;')
    db.session.commit()
