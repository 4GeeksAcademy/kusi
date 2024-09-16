from flask_restx import fields  
from api.namespace.dishes import api


ingredient_model = api.model("Ingredient",{
    "id": fields.Integer,
    "name": fields.String,
})

dish_ingredient = api.model("DishIngredient",{
    "dish_id": fields.Integer,
    "ingredient_id": fields.Integer,
    "ingredient": fields.List(fields.Nested(ingredient_model)),
})


dish_model = api.model("Dish",{
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