from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restx import Resource, fields
from api.models import db, Dish, ExtraDish, DishIngredient, Ingredient, Role, RoleName
from api.namespaces import ingredients_namespace
from api.utils import InvalidAPIUsage

bcrypt = Bcrypt()

@ingredients_namespace.response(200, "OK")
@ingredients_namespace.response(500, "Internal server error")
@ingredients_namespace.route("/")
class FetchIngredients(Resource):
    @jwt_required()
    @ingredients_namespace.doc(security="jsonWebToken")
    def get(self):
        """Fetches all available ingredients."""
        try:
            ingredients = Ingredient.query.all()
            return list(map(lambda ingredients: ingredients.serialize(), ingredients)), 200
        except Exception as e:
            return { "message": str(e) }, 500
