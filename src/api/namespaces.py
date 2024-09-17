from flask_restx import Namespace

authorizations = {
    "jsonWebToken":{
        "type": "apiKey",
        "in": "header",
        "name": "authorization"
    }
}

api_fake = Namespace(
    "fake",
    description="Fake token and db population.",
    authorizations=authorizations
)

api_auth = Namespace(
    "auth",
    description="Login, signup, JWT.",
    authorizations=authorizations
)

api_user = Namespace('users', description='CRUD user',authorizations=authorizations)
api_dish = Namespace('dishes', description='CRUD dish',authorizations=authorizations)
api_order = Namespace('orders', description='CRUD order',authorizations=authorizations)
api_ingredient = Namespace('ingredients', description='CRUD ingredient',authorizations=authorizations)