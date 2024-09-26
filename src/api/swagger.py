from flask_cors import CORS
from flask_restx import Api
from api.endpoints import (
    ai_namespace,
    auth_namespace,
    dishes_namespace,
    ingredients_namespace,
    fake_namespace,
    orders_namespace,
    users_namespace,
)

def setup_swagger(app):
    api = Api(app,
        title="Kusi API Documentation",
        description="Endpoints and Models",
        version="1.0",
        doc="/docs",
        validate=True
    )
    api.add_namespace(ai_namespace)
    api.add_namespace(auth_namespace)
    api.add_namespace(dishes_namespace)
    api.add_namespace(ingredients_namespace)
    api.add_namespace(fake_namespace)
    api.add_namespace(orders_namespace)
    api.add_namespace(users_namespace)
    CORS(app)
