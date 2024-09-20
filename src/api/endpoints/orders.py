from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restx import fields, Resource
from functools import reduce
from api.endpoints.users import user_model
from api.models import (
    db,
    Dish,
    Order,
    OrderStatus,
    OrderStatusName,
    OrderDish,
    Role,
    RoleName,
    User
)
from api.namespaces import orders_namespace
from api.utils import InvalidAPIUsage

bcrypt = Bcrypt()

@orders_namespace.response(200, "OK")
@orders_namespace.response(201, "Order created")
@orders_namespace.response(403, "Forbidden")
@orders_namespace.response(404, "Not found")
@orders_namespace.response(500, "Internal server error")
@orders_namespace.route("/<int:order_id>")
class FetchOrderById(Resource):
    @jwt_required()
    @orders_namespace.doc(security="jsonWebToken")
    def get(self, order_id):
        """Fetches an order by ID"""
        # First, we validate if the order exists.
        order = Order.query.get(order_id)
        if order is None:
            raise InvalidAPIUsage(f"Order {order_id} not found", 404)
        
        # Then, we check if the user is allowed to see the details of that order.
        current_user = get_jwt_identity()
        user_id = current_user["id"]
        role_id = current_user["role_id"]
        client_role = Role.query.filter_by(name=RoleName.CLIENT.value).one_or_none()
        if role_id == client_role.id and order.client_id != user_id:
            raise InvalidAPIUsage("Forbidden", 403)
        
        # Finally, we build and return the response.
        try:
            response = order.serialize()
            response["client"] = User.query.get(order.client_id).serialize()
            response["dishes"] = list(
                map(
                    lambda dish: dish.serialize(),
                    db.session.query(Dish).join(OrderDish).filter(OrderDish.order_id == order_id).all()
                )
            )
            return response, 200
        except Exception as e:
            return { "message": str(e) }, 500