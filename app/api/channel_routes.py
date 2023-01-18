from flask import Blueprint, request
# from app.forms import channel_server_form
from app.models import Channel, db
from flask_login import current_user, login_required
from ..forms.channel_workspace_form import ChannelWorkspaceForm


channel_workspace_routes = Blueprint("channel_workspaces", __name__)



def workspace_is_owned_by_user(workspaceId):
  for workspace in current_user.owned_workspaces:
    if workspace.id == workspaceId:
      return True
  return False


@channel_workspace_routes.route("/workspaces/<int:workspaceId>", methods=["GET"])
def get_all_channels(workspaceId):
  channels = Channel.query.filter(Channel.workspace_id == workspaceId)
  return {'WorkspaceChannels': [channel.to_dict() for channel in channels]}

@channel_workspace_routes.route("/workspaces/<int:workspaceId>", methods=["POST"])
@login_required
def create_a_channel(workspaceId):
  form = ChannelWorkspaceForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    if workspace_is_owned_by_user(workspaceId):
      channel = Channel(
        name=form.data["name"],
        workspace_id=workspaceId,
      )
      db.session.add(channel)
      db.session.commit()
      return channel.to_dict()
    else:
      return {"error": "Unauthorized"}
  else:
    return {"error": "Please enter a valid name"}



@channel_workspace_routes.route("/<int:channelId>/workspaces/<int:workspaceId>", methods=["GET"])
@login_required
def get_a_channel(workspaceId, channelId):
  channel = Channel.query.get(channelId)
  return channel.to_dict()


@channel_workspace_routes.route("/<int:channelId>/workspaces/<int:workspaceId>", methods=["PUT"])
@login_required
def edit_a_channel(workspaceId, channelId):
  if workspace_is_owned_by_user(workspaceId):
    channel = Channel.query.get(channelId)
    form = ChannelWorkspaceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
      channel.name = form.data["name"]
      db.session.commit()
      return channel.to_dict()
    else:
      return {"error": "Please enter a valid name"}
  else:
    return {"error": "Unauthorized user"}



@channel_workspace_routes.route("/<int:channelId>/workspaces/<int:workspaceId>", methods=['DELETE'])
@login_required
def delete_a_channel(channelId, workspaceId):
    channel = Channel.query.get(channelId)
    if workspace_is_owned_by_user(workspaceId):
      db.session.delete(channel)
      db.session.commit()
      return {"message": "Channel was successfully deleted"}
    else:
      return {"error": "You cannot delete another person's channel"}
