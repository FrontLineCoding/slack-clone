from flask import Blueprint, jsonify, session, request
from app.models import Channel, User, Message, db
from flask_login import current_user, login_required
from ..forms.message_form import MessageForm

message_routes = Blueprint('messages', __name__)


@message_routes.route('/channels/<int:channelId>', methods=['GET'])
@login_required
def get_messages(channelId):
  messages = Message.query.filter(Message.channel_id==channelId)
  return {'messages': [message.to_dict() for message in messages]}


@message_routes.route('/channels/<int:channelId>', methods=['POST'])
@login_required
def create_message(channelId):
  form = MessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  channel = Channel.query.get(channelId)
  # print("FORM", form.data)
  if form.validate_on_submit():
    message = Message(
      user_id=current_user.id,
      channel_id=channelId,
      content=form.data['content']
    )
    db.session.add(message)
    db.session.commit()
    return message.to_dict()


@message_routes.route('/<int:messageId>', methods=['PUT'])
@login_required
def edit_message(messageId):
  message = Message.query.get(messageId)
  form = MessageForm()
  # print("MESSAGE CONTENT", form.data['content'])
  form['csrf_token'].data = request.cookies['csrf_token']
  if current_user.id == message.user_id:
    message.content = form.data["content"]
    db.session.commit()
    return message.to_dict()



@message_routes.route('/<int:messageId>', methods=['DELETE'])
@login_required
def delete_message(messageId):
  message = Message.query.get(messageId)
  if current_user.id == message.user_id:
    db.session.delete(message)
    db.session.commit()
    return {"message": "Message was successfully deleted"}
