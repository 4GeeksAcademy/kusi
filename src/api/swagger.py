from flask_restx import Api
from api.namespace.auth import api_auth
from api.namespace.dishes import api as dishes
from api.namespace.fake import api_fake
from api.namespace.ingredients import api as ingredients
from api.namespace.orders import api as orders
from api.namespace.users import api as users
from flask_cors import CORS

def setup_swagger(app):
    api = Api(app,
        title="Kusi API Documentation",
        description="Endpoints and Models",
        version="1.0",
        doc="/docs",
        validate=True
    )
    
    api.add_namespace(api_fake)
    api.add_namespace(api_auth)
    api.add_namespace(users)
    api.add_namespace(dishes)
    api.add_namespace(orders)
    api.add_namespace(ingredients)
    
    CORS(app)

