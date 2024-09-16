from flask_restx import Resource  
from api.models import db,Ingredient
from api.namespaces import api_ingredient as api
from api.api_models.ingredient_model import ingredient_model
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required

bcrypt = Bcrypt()

@api.response(201, 'Successful')
@api.response(500, 'Server error')
@api.route('/')
class IngredientAPI(Resource):
    method_decorators = [jwt_required()]
    @api.doc(security="jsonWebToken")
    @api.marshal_list_with(ingredient_model)
    def get(self):
        '''Get all ingredients'''
        try:
            all_orders = Ingredient.query.all()
            return all_orders,201
        except Exception as error:
            return str(error),500        

@api.route('/<id>')
@api.param('id', 'Ingredient identifier')
@api.response(201, 'Successful')
@api.response(404, 'Ingredient not found')
@api.response(500, 'Server error')
class IngredientAPI(Resource):
    method_decorators = [jwt_required()]
    @api.doc(security="jsonWebToken")
    @api.marshal_with(ingredient_model)
    def get(self, id):
        '''Get ingredient by id'''
        try:
            ingredient = Ingredient.query.filter_by(id=id).first()
            if not ingredient:
                return "Ingredient not found",404
            return ingredient
        except Exception as error:
            return str(error),500