from ast import Str
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class WorkspaceForm(FlaskForm):
  name = StringField("Name", validators=[DataRequired()])
  img = StringField("Image")
