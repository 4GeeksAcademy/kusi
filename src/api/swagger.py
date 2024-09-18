from flask_restx import Api
from api.namespace.hello import api as hello
from api.namespace.users import api as users
from api.namespace.hello_auth import api as hello_auth
from api.namespace.auth import api as auth

def setup_swagger(app):
    api = Api(app,
        title="Kusi API Documentation",
        description="Endpoints and Models",
        version="1.0",
        doc="/docs",
        validate=True
    )
    
    api.add_namespace(hello)
    api.add_namespace(auth)
    api.add_namespace(hello_auth)
    api.add_namespace(users)