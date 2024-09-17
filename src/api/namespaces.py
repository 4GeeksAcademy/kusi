from flask_restx import Namespace

authorizations = {
    "jsonWebToken":{
        "type": "apiKey",
        "in": "header",
        "name": "authorization"
    }
}

api_auth = Namespace(
    "auth",
    description="Login, signup, JWT.",
    authorizations=authorizations
)

api_hello = Namespace('hello', description='Say hello',authorizations=authorizations)
api_hello_auth = Namespace('helloAuth', description='Say hello with JWT authentication',authorizations=authorizations)

api_user = Namespace('users', description='CRUD user',authorizations=authorizations)
api_dish = Namespace('dishes', description='CRUD dish',authorizations=authorizations)
api_order = Namespace('orders', description='CRUD order',authorizations=authorizations)
api_ingredient = Namespace('ingredients', description='CRUD ingredient',authorizations=authorizations)