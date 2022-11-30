from .db import db, environment, SCHEMA, add_prefix_for_prod


class Workspace(db.Model):
    __tablename__ = 'workspaces'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    img = db.Column(db.String(), nullable=True)

    members = db.relationship('WorkspaceMember', back_populates='workspace', cascade="all, delete-orphan")
    channels = db.relationship("Channel", back_populates="workspace", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ownerId': self.owner_id,
            'img': self.img,
            'channels': [channel.to_dict() for channel in self.channels],
            'members': [user.to_dict() for user in self.members],
        }
    def to_resource_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ownerId': self.owner_id,
            'channels': [channel.to_dict() for channel in self.channels],
        }

class WorkspaceMember(db.Model):
    __tablename__ = 'workspace_members'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    workspace_id = db.Column(db.Integer, db.ForeignKey("workspaces.id"), nullable=True, default=0)

    workspace = db.relationship('Workspace', back_populates='members')
    member = db.relationship('User', back_populates='workspace_member')

    def to_dict(self):
        return {
            'workspace': self.workspace.to_resource_dict(),
            'members': self.member.to_workspace_dict()
        }
