from .db import db, environment, SCHEMA, add_prefix_for_prod


class Channel(db.Model):
    __tablename__ = 'channels'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=True)
    workspace_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("workspaces.id")), nullable=True)

    messages = db.relationship("Message", back_populates="channel", cascade="all, delete-orphan")
    workspace = db.relationship("Workspace", back_populates="channels")


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'workspace_id': self.workspace_id,
        }
