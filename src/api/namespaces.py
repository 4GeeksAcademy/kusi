from flask_restx import Namespace

authorizations = {
    "jsonWebToken": {
        "type": "apiKey",
        "in": "header",
        "name": "authorization"
    }
}

ai_namespace = Namespace(
    "ai",
    description="Kusi AI.",
    authorizations=authorizations
)

auth_namespace = Namespace(
    "auth",
    description="Login, signup, JWT.",
    authorizations=authorizations
)

dishes_namespace = Namespace(
    "dishes",
    description="Dishes CRUD.",
    authorizations=authorizations
)

fake_namespace = Namespace(
    "fake",
    description="Fake token and db population.",
    authorizations=authorizations
)

orders_namespace = Namespace(
    "orders",
    description="Orders CRUD.",
    authorizations=authorizations
)

users_namespace = Namespace(
    "users",
    description="Users CRUD.",
    authorizations=authorizations
)
