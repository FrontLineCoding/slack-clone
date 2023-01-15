from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import Workspace, db, User
from ..forms.workspace_form import WorkspaceForm
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)


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
        url = None
        print(request.files)

        if "img" in request.files:
            img = request.files['img']
            if not allowed_file(img.filename):
                return {"errors": "file type not permitted"}
            img.filename = get_unique_filename(img.filename)
            upload = upload_file_to_s3(img)

            if "url" not in upload:
                return upload, 400
            url = upload["url"]

        workspace = Workspace(
            name=form.data["name"],
            owner_id=current_user.id,
            img=url
        )
        db.session.add(workspace)
        db.session.commit()
        return workspace.to_dict()
    else:
        return{"error": "Could not create workspace"}


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
    form = WorkspaceForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if(current_user.id != workspace.owner_id):
        return {"error_code": "403", "message": "This ain't yers"}
    else:
        workspace.name = form.data["name"]
        workspace.img = form.data["img"]
        db.session.commit()

        return {'Message': "updated"}
