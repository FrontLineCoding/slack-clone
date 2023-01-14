from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model):
    __tablename__ = 'comments'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    message_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("messages.id")), nullable=False)
    content = db.Column(db.String(), nullable=False)
    date_created  = db.Column(db.DateTime,  default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime,  default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # owner = db.relationship('User', back_populates="comments")
    message = db.relationship('Message', back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            # 'user': self.owner,
            'message_id': self.message_id,
            'content': self.content,
            'date_created': self.date_created,
            'date_modified': self.date_modified
        }
