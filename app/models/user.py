from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    owned_workspaces = db.relationship('Workspace', backref='workspace_owner', cascade="all, delete-orphan")
    # TODO: flask is mad about workspace_member
    # workspace_member = db.relationship('WorkspaceMember', backref="user", cascade="all, delete-orphan")
    workspace_member = db.relationship('WorkspaceMember', back_populates="member", cascade="all, delete-orphan")
    messages = db.relationship("Message", back_populates="owner", cascade="all, delete-orphan")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'owned_workspaces': [workspace.to_dict() for workspace in self.owned_workspaces],
            'joined_workspaces': [workspace.to_dict() for workspace in self.workspace_member],
            'email': self.email
        }

    def to_workspace_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
        }
