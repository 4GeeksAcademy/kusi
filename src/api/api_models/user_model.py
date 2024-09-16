from flask_restx import fields  
from api.namespace.users import api

role_model = api.model("Role",{
    "id": fields.Integer,
    "name": fields.String,
})

user_model = api.model("User",{
    "id": fields.Integer,
    "role_id": fields.Integer,
    "role": fields.Nested(role_model),
    "email": fields.String,
    "name": fields.String,
    "phone_number": fields.String,
    "is_active": fields.Boolean,
    "profile_picture_url": fields.String,
    "created_at": fields.DateTime,
    "updated_at": fields.DateTime
})
user_create_model = api.model("UserCreate",{
    "role_id": fields.Integer,
    "email": fields.String,
    "name": fields.String,
    "phone_number": fields.String,
    "password": fields.String
})
user_update_model = api.model("UserUpdate",{
    "email": fields.String,
    "name": fields.String,
    "phone_number": fields.String,
    "is_active": fields.Boolean,
    "profile_picture_url": fields.String,
    "password": fields.String
})

