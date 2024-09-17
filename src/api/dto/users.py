from flask_restx import fields  
from api.namespaces import api_user as api

credentials_dto = api.model(
    "Credentials",
    {
        "email": fields.String,
        "password": fields.String
    }
)
