from flask_restx import Resource  
from api.namespaces import api_hello_auth as api
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required

bcrypt = Bcrypt()

@api.response(201, 'Successful')
@api.response(500, 'Server error')
@api.route('/')
class HelloAuth(Resource):
    method_decorators = [jwt_required()]
    @api.doc(security="jsonWebToken")
    def get(self):
        '''Say hello JWT authorization'''
        try:
            message = "Hello World!"
            return message,201
        except Exception as error:
            return str(error),500

