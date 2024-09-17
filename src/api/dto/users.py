from flask_restx import fields  
from api.namespaces import api_user as api

credentials_dto = api.model(
    "Credentials",
    {
        "email": fields.String,
        "password": fields.String
    }
)

signup_form_dto = api.model(
    "SignUpForm",
    {
        "role": fields.Integer,
        "email": fields.String,
        "name": fields.String,
        "phone_number": fields.String,
        "password": fields.String
    }
)
