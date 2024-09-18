from flask_restx import Resource, fields
from api.models import db,Dish,DishIngredient,Ingredient
from api.namespaces import dishes_namespace
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required

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

@dishes_namespace.response(201, 'Successful')
@dishes_namespace.response(500, 'Server error')
@dishes_namespace.route('/')
class DishAPI(Resource):
    method_decorators = [jwt_required()]
    @dishes_namespace.doc(security="jsonWebToken")
    @dishes_namespace.marshal_list_with(dish_model)
    def get(self):
        '''Get all dishes'''
        try:
            all_dishes = Dish.query.all()
            return all_dishes,201
        except Exception as error:
            return str(error),500
        

@dishes_namespace.route('/<id>')
@dishes_namespace.param('id', 'Dish identifier')
@dishes_namespace.response(201, 'Successful')
@dishes_namespace.response(404, 'Dish not found')
@dishes_namespace.response(500, 'Server error')
class DishAPI(Resource):
    method_decorators = [jwt_required()]
    @dishes_namespace.doc(security="jsonWebToken")
    @dishes_namespace.marshal_with(dish_model)
    def get(self, id):
        '''Get dish by id'''
        try:
            dish = Dish.query.filter_by(id=id).first()
            if not dish:
                return "Dish not found",404
            return dish
        except Exception as error:
            return str(error),500
        

@dishes_namespace.route('/<id>/ingredients')
@dishes_namespace.param('id', 'Dish identifier')
@dishes_namespace.response(201, 'Successful')
@dishes_namespace.response(404, 'Dish not found')
@dishes_namespace.response(500, 'Server error')
class DishAPI(Resource):
    method_decorators = [jwt_required()]
    @dishes_namespace.doc(security="jsonWebToken")
    @dishes_namespace.marshal_list_with(ingredient_model)
    def get(self, id):
        '''Get ingredients of dish by id'''
        try:
            list_ingredients=[]
            dish_ingredients = DishIngredient.query.filter_by(dish_id=id)
            for dish_ingredient in dish_ingredients:
                ingredient = Ingredient.query.filter_by(id=dish_ingredient.ingredient_id).first()
                list_ingredients.append(ingredient)
            return list_ingredients
        except Exception as error:
            return str(error),500