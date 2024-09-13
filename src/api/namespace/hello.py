from flask_restx import Resource  
from api.namespaces import api_hello as api

@api.response(200, 'Successful')
@api.response(500, 'Server error')
@api.route('/')
class Hello(Resource):
    @api.doc('hello')
    def get(self):
        '''Say hello'''
        try:
            message = "Hello World!"
            return message,200
        except Exception as error:
            return str(error),500
