from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import Workspace, db, User
from ..models.workspace import WorkspaceMember
from ..forms.workspace_form import WorkspaceForm
from ..forms.add_user_to_workspace import AddUserToWorkspaceForm


workspacemember_routes = Blueprint('workspacemember', __name__)

@workspacemember_routes.route('/<int:userId>/<int:workspaceId>', methods=['POST'])
def add_user_to_workspace(userId, workspaceId):
    print('///////////////////////////////////////////////////////////')
    print(userId)
    print(workspaceId)
    print('///////////////////////////////////////////////////////////')

    form =AddUserToWorkspaceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        workspace_member = WorkspaceMember(
            user_id=userId,
            workspace_id=workspaceId
        )
        print(workspace_member.user_id)
        print(workspace_member.workspace_id)
        db.session.add(workspace_member)
        db.session.commit()
        return{"message": f"{userId} added to workspace: {workspaceId}"}
    else:
        return {"error": "User unable to be added"}
