from flask import Blueprint, jsonify, session, request
from app.models import Comment, User, Message, db
from flask_login import current_user, login_required
from ..forms.comment_form import CommentForm

message_routes = Blueprint('messages', __name__)
comment_routes = Blueprint("comments", __name__)


@message_routes.route('/<int:messageId>/comments', methods=['GET'])
@login_required
def get_comments(messageId):
  comments = Comment.query.filter(Comment.message_id==messageId)
  return {'comments': [comment.to_dict() for comment in comments]}


@message_routes.route('/<int:messageId>/comments', methods=['POST'])
@login_required
def create_comment(messageId):
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    comment = Comment(
      user_id=current_user.id,
      message_id=messageId,
      content=form.data['content']
    )
    db.session.add(comment)
    db.session.commit()
    return comment.to_dict()


@comment_routes.route('/<int:commentId>', methods=['PUT'])
@login_required
def edit_comment(commentId):
  comment = Comment.query.get(commentId)
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if current_user.id == comment.user_id:
    comment.content = form.data["content"]
    db.session.commit()
    return comment.to_dict()



@comment_routes.route('/<int:commentId>', methods=['DELETE'])
@login_required
def delete_comment(commentId):
  comment = Comment.query.get(commentId)
  if current_user.id == comment.user_id:
    db.session.delete(comment)
    db.session.commit()
    return {"comment": "Comment was successfully deleted"}
