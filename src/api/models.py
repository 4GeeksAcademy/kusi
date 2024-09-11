from datetime import datetime
from enum import Enum
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class RoleName(str, Enum):
    CLIENT = "client"
    CHEF = "chef"
    ADMIN = "admin"

class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Enum(RoleName), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    def __repr__(self):
        return f"<Role {self.name.value}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name.value
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey("role.id"), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(20))
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    profile_picture_url = db.Column(db.String(255))
    hashed_password = db.Column(db.String(255), nullable=False)
    salt = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    def __repr__(self):
        return f"<User {self.email}>"

    def serialize(self):
        return {
            "id": self.id,
            "role_id": self.role_id,
            "email": self.email,
            "name": self.name,
            "phone_number": self.phone_number,
            "is_active": self.is_active,
            "profile_picture_url": self.profile_picture_url,
            "created_at": self.created_at
        }
