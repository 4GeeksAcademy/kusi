from flask_restx import fields, Resource  
from api.models import db,Ingredient
from api.namespaces import ingredients_namespace
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required

bcrypt = Bcrypt()

ingredient_model = ingredients_namespace.model("Ingredient",{
    "id": fields.Integer,
    "name": fields.String,
})

@ingredients_namespace.response(201, 'Successful')
@ingredients_namespace.response(500, 'Server error')
@ingredients_namespace.route('/')
class IngredientAPI(Resource):
    method_decorators = [jwt_required()]
    @ingredients_namespace.doc(security="jsonWebToken")
    @ingredients_namespace.marshal_list_with(ingredient_model)
    def get(self):
        '''Get all ingredients'''
        try:
            all_orders = Ingredient.query.all()
            return all_orders,201
        except Exception as error:
            return str(error),500        

@ingredients_namespace.route('/<id>')
@ingredients_namespace.param('id', 'Ingredient identifier')
@ingredients_namespace.response(201, 'Successful')
@ingredients_namespace.response(404, 'Ingredient not found')
@ingredients_namespace.response(500, 'Server error')
class IngredientAPI(Resource):
    method_decorators = [jwt_required()]
    @ingredients_namespace.doc(security="jsonWebToken")
    @ingredients_namespace.marshal_with(ingredient_model)
    def get(self, id):
        '''Get ingredient by id'''
        try:
            ingredient = Ingredient.query.filter_by(id=id).first()
            if not ingredient:
                return "Ingredient not found",404
            return ingredient
        except Exception as error:
            return str(error),500