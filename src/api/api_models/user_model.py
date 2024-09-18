from flask_restx import fields  
from api.namespace.users import api

user_model = api.model("User",{
    "id": fields.Integer,
    "email": fields.String
})
user_create_model = api.model("UserCreate",{
    "email": fields.String,
    "password": fields.String
})
user_update_model = api.model("UserUpdate",{
    "email": fields.String,
    "is_active": fields.Boolean
})

