from ast import Str
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class AddUserToWorkspaceForm(FlaskForm):
  user_id = IntegerField("User Id")
  workspace_id = IntegerField("Workspace Id")
