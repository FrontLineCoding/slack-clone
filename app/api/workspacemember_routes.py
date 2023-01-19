from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import Workspace, db, User
from ..models.workspace import WorkspaceMember
from ..forms.workspace_form import WorkspaceForm
from ..forms.add_user_to_workspace import AddUserToWorkspaceForm


workspacemember_routes = Blueprint('workspacemember', __name__)

@workspacemember_routes.route('/<int:userId>/<int:workspaceId>', methods=['POST'])
def add_user_to_workspace(userId, workspaceId):

    form =AddUserToWorkspaceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        workspace_member = WorkspaceMember(
            user_id=userId,
            workspace_id=workspaceId
        )
        db.session.add(workspace_member)
        db.session.commit()
        return{"message": f"{userId} added to workspace: {workspaceId}"}
    else:
        return {"error": "User unable to be added"}

@workspacemember_routes.route('/<int:userId>/<int:workspaceId>', methods=['DELETE'])
def remove_user_from_workspace(userId, workspaceId):
    workspace_member = db.session.query(WorkspaceMember).filter(WorkspaceMember.user_id == userId, WorkspaceMember.workspace_id == workspaceId).first()

    if(workspace_member):
        db.session.delete(workspace_member)
        db.session.commit()
        return{"message": f"{userId} was removed from workspace: {workspaceId}"}
    else:
        return {"error": "User unable to be removed"}
