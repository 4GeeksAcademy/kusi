from flask_restx import Resource  
from api.models import db,Dish,DishIngredient,Ingredient
from api.namespaces import api_dish as api
from api.api_models.dish_model import dish_model,ingredient_model
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required

bcrypt = Bcrypt()

@api.response(201, 'Successful')
@api.response(500, 'Server error')
@api.route('/')
class DishAPI(Resource):
    method_decorators = [jwt_required()]
    @api.doc(security="jsonWebToken")
    @api.marshal_list_with(dish_model)
    def get(self):
        '''Get all dishes'''
        try:
            all_dishes = Dish.query.all()
            return all_dishes,201
        except Exception as error:
            return str(error),500
        

@api.route('/<id>')
@api.param('id', 'Dish identifier')
@api.response(201, 'Successful')
@api.response(404, 'Dish not found')
@api.response(500, 'Server error')
class DishAPI(Resource):
    method_decorators = [jwt_required()]
    @api.doc(security="jsonWebToken")
    @api.marshal_with(dish_model)
    def get(self, id):
        '''Get dish by id'''
        try:
            dish = Dish.query.filter_by(id=id).first()
            if not dish:
                return "Dish not found",404
            return dish
        except Exception as error:
            return str(error),500
        

@api.route('/<id>/ingredients')
@api.param('id', 'Dish identifier')
@api.response(201, 'Successful')
@api.response(404, 'Dish not found')
@api.response(500, 'Server error')
class DishAPI(Resource):
    method_decorators = [jwt_required()]
    @api.doc(security="jsonWebToken")
    @api.marshal_list_with(ingredient_model)
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