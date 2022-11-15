from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import Workspace, db, User
# from .channel_routes import channel_server_routes


workspace_routes = Blueprint('workspaces', __name__)
# workspace_routes.register_blueprint(channel_workspace_routes, url_prefix="/")

@workspace_routes.route('/me', methods=['GET'])
def get_my_workspaces():
    user_id = current_user.id
    user = User.query.get(user_id)
    workspaces = user.workspace_member
    return {'JoinedWorkspaces': [workspace.to_dict() for workspace in workspaces]}

@workspace_routes.route('/owned', methods=['GET'])
def get_owned_workspaces():
    user_id = current_user.id
    user = User.query.get(user_id)
    user_to_dict = user.to_dict()
    user_workspaces = user_to_dict['owned_workspaces']
    return {'OwnedWorkspaces': [workspace for workspace in user_workspaces]}


@workspace_routes.route('/', methods=['GET'])
def get_all_workspaces():
    workspaces = Workspace.query.all()
    return {'Workspaces': [workspace.to_dict() for workspace in workspaces]}


@workspace_routes.route('', methods=['POST'])
def create_one_workspace():
    form = WorkspaceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        workspace = Workspace(
            name=form.data["name"],
            img=form.data["img"]
        )
        db.session.add(workspace)
        db.session.commit()
        return workspace.to_dict()


@workspace_routes.route('/<int:id>', methods=['GET'])
def get_one_workspace(id):
    workspace = Workspace.query.get(id)
    return workspace.to_dict()

@workspace_routes.route('/<int:id>', methods=['DELETE'])
def delete_one_workspace(id):
    workspace = Workspace.query.get(id)
    if(current_user.id != workspace.owner_id):
        return {"error_code": "403", "message": "This ain't yers"}
    else:
        db.session.delete(workspace)
        db.session.commit()
        return {"Message": "Deleted"}

@workspace_routes.route('/<int:id>', methods=['PUT'])
def update_one_workspace(id):
    workspace = Workspace.query.get(id)

    if(current_user.id != workspace.owner_id):
        return {"error_code": "403", "message": "This ain't yers"}
    else:
        form = WorkspaceForm()
        workspace.name = form.data['name']
        workspace.img = form.data['img']
        db.session.commit()

        return {'Message': "updated"}
