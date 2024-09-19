from flask_restx import Namespace

authorizations = {
    "jsonWebToken": {
        "type": "apiKey",
        "in": "header",
        "name": "authorization"
    }
}

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

ingredients_namespace = Namespace(
    "ingredients",
    description="Ingredients CRUD.",
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
