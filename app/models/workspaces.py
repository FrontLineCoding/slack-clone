from .db import db


class Workspace(db.Model):
    __tablename__ = 'workspaces'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    img = db.Column(db.String(), nullable=True)

    members = db.relationship('WorkspaceMember', backref='workspace', cascade="all, delete-orphan")
    channels = db.relationship("Channel", back_populates="workspace", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ownerId': self.owner_id,
            'img': self.img,
            'members': [user.to_dict() for user in self.members],
        }
    def to_resource_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ownerId': self.owner_id,
        }

class WorkspaceMember(db.Model):
    __tablename__ = 'workspace_members'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    server_id = db.Column(db.Integer, db.ForeignKey("workspaces.id"), nullable=True)

    # user = db.relationship('User', secondary=user_servers, back_ref="servers")


    def to_dict(self):
        return {
            'id': self.user.id,
            'name': self.user.username,
            'user_profile_img': self.user.user_profile_img,
            'server_id': self.server_id,
            'server': self.server.to_resource_dict()
        }
