from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required
from flask_restx import Resource, fields
from api.models import db, Dish, DishIngredient, Ingredient
from api.namespaces import dishes_namespace
from api.utils import InvalidAPIUsage

bcrypt = Bcrypt()

ingredient_model = dishes_namespace.model("Ingredient",{
    "id": fields.Integer,
    "name": fields.String,
})

dish_ingredient = dishes_namespace.model("DishIngredient",{
    "dish_id": fields.Integer,
    "ingredient_id": fields.Integer,
    "ingredient": fields.List(fields.Nested(ingredient_model)),
})


dish_model = dishes_namespace.model("Dish",{
    "id": fields.Integer,
    "name": fields.String,
    "description": fields.String,
    "image_url": fields.String,
    "price": fields.Float,
    "discount_percentage": fields.Integer,
    "cooking_time": fields.Integer,
    "quantity": fields.Integer,
    "dish_ingredients": fields.List(fields.Nested(dish_ingredient)),
})

@dishes_namespace.response(200, "OK")
@dishes_namespace.response(500, "Internal server error")
@dishes_namespace.route("/")
class DishList(Resource):
    method_decorators = [jwt_required()]
    @dishes_namespace.doc(security="jsonWebToken")
    def get(self):
        """Fetches all available dishes."""
        try:
            dishes = Dish.query.all()
            return list(map(lambda dish: dish.serialize(), dishes)), 200
        except Exception as e:
            return { "message": str(e) }, 500

@dishes_namespace.response(200, "OK")
@dishes_namespace.response(404, "Dish not found")
@dishes_namespace.response(500, "Internal server error")
@dishes_namespace.route("/<int:dish_id>")
class DishCRUD(Resource):
    method_decorators = [jwt_required()]
    @dishes_namespace.doc(security="jsonWebToken")
    def get(self, dish_id):
        """Fetches the dish with specified ID."""
        dish = Dish.query.filter_by(id=dish_id).one_or_none()
        if dish is None:
            raise InvalidAPIUsage(f"Dish {dish_id} not found.", 404)

        try:
            ingredients = list(
                map(
                    lambda ingredient: ingredient.serialize(),
                    db.session.query(Ingredient).join(DishIngredient).filter(DishIngredient.dish_id == dish_id).all()
                )
            )
            response = dish.serialize()
            response["ingredients"] = ingredients
            return response, 200
        except Exception as e:
            return { "message": str(e) }, 500

# @dishes_namespace.route('/<id>/ingredients')
# @dishes_namespace.param('id', 'Dish identifier')
# @dishes_namespace.response(201, 'Successful')
# @dishes_namespace.response(404, 'Dish not found')
# @dishes_namespace.response(500, 'Server error')
# class DishAPI(Resource):
#     method_decorators = [jwt_required()]
#     @dishes_namespace.doc(security="jsonWebToken")
#     @dishes_namespace.marshal_list_with(ingredient_model)
#     def get(self, id):
#         '''Get ingredients of dish by id'''
#         try:
#             list_ingredients=[]
#             dish_ingredients = DishIngredient.query.filter_by(dish_id=id)
#             for dish_ingredient in dish_ingredients:
#                 ingredient = Ingredient.query.filter_by(id=dish_ingredient.ingredient_id).first()
#                 list_ingredients.append(ingredient)
#             return list_ingredients
#         except Exception as error:
#             return str(error),500