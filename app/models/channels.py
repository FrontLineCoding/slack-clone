from .db import db

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=True)
    workspace_id = db.Column(db.Integer, db.ForeignKey("workspace.id"), nullable=True)

    messages = db.relationship("Message", back_populates="channel", cascade="all, delete-orphan")
    workspace = db.relationship("Workspace", back_populates="channels")


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'server_id': self.server_id,
        }
