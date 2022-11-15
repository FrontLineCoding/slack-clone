from ast import Str
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ChannelServerForm(FlaskForm):
  name = StringField("Name", validators=[DataRequired(message="Provide a valid name")])
  workspace_id = IntegerField("Workspace Id")
