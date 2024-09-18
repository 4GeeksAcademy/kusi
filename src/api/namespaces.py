from flask_restx import Namespace

authorizations = {
    "jsonWebToken":{
        "type": "apiKey",
        "in": "header",
        "name": "authorization"
    }
}


api_hello = Namespace('hello', description='Say hello',authorizations=authorizations)
api_auth = Namespace('auth', description='JWT authentication',authorizations=authorizations)
api_hello_auth = Namespace('helloAuth', description='Say hello with JWT authentication',authorizations=authorizations)
api_user = Namespace('users', description='CRUD user',authorizations=authorizations)