from flask_restx import fields  
from api.namespace.ingredients import api

ingredient_model = api.model("Ingredient",{
    "id": fields.Integer,
    "name": fields.String,
})