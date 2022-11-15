from ast import Str
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
  user_id = IntegerField("User Id")
  message_id = IntegerField("Message Id")
  content = TextAreaField("Content", validators=[DataRequired(message="Please enter content")])
