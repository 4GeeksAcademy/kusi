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

new_order_dish = orders_namespace.model(
    "NewOrderDish",
    {
        "id": fields.Integer,
        "quantity": fields.Integer,
        "unit_price": fields.Float
    }
)

new_order = orders_namespace.model(
    "NewOrder",
    {
        "dishes": fields.List(fields.Nested(new_order_dish)),
        "special_instructions": fields.String
    }
)

def validate_new_order(current_user, payload):
    client_role = Role.query.filter_by(name=RoleName.CLIENT.value).one_or_none()
    if current_user["role_id"] != client_role.id:
        raise InvalidAPIUsage("Only client can create orders", 403)

    client_id = current_user["id"]
    client = User.query.get(client_id)
    if client is None:
        raise InvalidAPIUsage("User not found", 404)
    
    payload = orders_namespace.payload
    dishes = payload.get("dishes")
    if dishes is None:
        raise InvalidAPIUsage("Missing dishes", 422)

    for dish in dishes:
        dish_id = dish.get("id")
        if dish_id is None:
            raise InvalidAPIUsage(f"Missing dish ID", 422)
        existing_dish = Dish.query.get(dish_id)
        if existing_dish is None:
            raise InvalidAPIUsage(f"Dish {dish_id} does not exist", 404)
        if dish["quantity"] > existing_dish.quantity:
            raise InvalidAPIUsage(f"{existing_dish.quantity} {existing_dish.name}(s) left", 422)
        if dish["unit_price"] < 0:
            raise InvalidAPIUsage(f"Cost of {existing_dish.name} should be non-negative", 422)

@orders_namespace.response(200, "OK")
@orders_namespace.response(201, "Order created")
@orders_namespace.response(403, "Forbidden")
@orders_namespace.response(404, "Not found")
@orders_namespace.response(422, "Unprocessable entity")
@orders_namespace.response(500, "Internal server error")
@orders_namespace.route("/")
class CreateAndFetchOrder(Resource):
    @jwt_required()
    @orders_namespace.doc(security="jsonWebToken")
    def get(self):
        """Fetches all the orders."""
        current_user = get_jwt_identity()
        role_id = current_user["role_id"]
        client_role = Role.query.filter_by(name=RoleName.CLIENT.value).one_or_none()
        if role_id == client_role.id:
            raise InvalidAPIUsage("Forbidden", 403)

        try:
            orders = list(map(lambda order: order.serialize(), Order.query.all()))
            return orders, 200
        except Exception as e:
            return { "message": str(e) }, 500

    @jwt_required()
    @orders_namespace.doc(security="jsonWebToken")
    @orders_namespace.expect(new_order)
    def post(self):
        """Creates an order given some dishes and special instructions."""
        current_user = get_jwt_identity()
        payload = orders_namespace.payload
        validate_new_order(current_user, payload)
        
        # First, we create the order.
        special_instructions = payload.get("special_instructions")
        pending_status = OrderStatus.query.filter_by(name=OrderStatusName.PENDING.value).one_or_none()
        dishes = payload["dishes"]
        grand_total = reduce(lambda s, dish: s + dish["unit_price"] * dish["quantity"], dishes, 0)
        order = Order(
            client_id=current_user["id"],
            status_id=pending_status.id,
            grand_total=grand_total,
            special_instructions=special_instructions
        )
        db.session.add(order)
        db.session.commit()
        
        # Then, we proceed to link each dish with the created order.
        for dish in dishes:
            db.session.add(
                OrderDish(
                    order_id=order.id,
                    dish_id=dish["id"],
                    unit_price=dish["unit_price"],
                    quantity=dish["quantity"]
                )
            )
            existing_dish = Dish.query.get(dish["id"])
            existing_dish.quantity -= dish["quantity"]
            db.session.commit()

        return order.serialize(), 201

@orders_namespace.response(204, "No content")
@orders_namespace.response(403, "Forbidden")
@orders_namespace.response(404, "Not found")
@orders_namespace.response(422, "Unprocessable entity")
@orders_namespace.response(500, "Internal server error")
@orders_namespace.route("/validate")
class ValidateOrder(Resource):
    @jwt_required()
    @orders_namespace.doc(security="jsonWebToken")
    @orders_namespace.expect(new_order)
    def post(self):
        """Validates order before checkout."""
        current_user = get_jwt_identity()
        payload = orders_namespace.payload
        validate_new_order(current_user, payload)
        return (""), 204

@orders_namespace.response(200, "OK")
@orders_namespace.response(403, "Forbidden")
@orders_namespace.response(404, "Not found")
@orders_namespace.response(500, "Internal server error")
@orders_namespace.route("/<int:order_id>/update")
class UpdateOrderStatus(Resource):
    @jwt_required()
    @orders_namespace.doc(security="jsonWebToken")
    def put(self, order_id):
        """Updates the status of the order to its following one."""
        current_user = get_jwt_identity()
        chef_role = Role.query.filter_by(name=RoleName.CHEF.value).one_or_none()
        if current_user["role_id"] != chef_role.id:
            raise InvalidAPIUsage("Only chefs can update orders", 403)
        order = Order.query.get(order_id)
        if order is None:
            raise InvalidAPIUsage(f"Order {order_id} not found", 404)
        
        pending = OrderStatus.query.filter_by(name=OrderStatusName.PENDING.value).one_or_none()
        in_progress = OrderStatus.query.filter_by(name=OrderStatusName.IN_PROGRESS.value).one_or_none()
        completed = OrderStatus.query.filter_by(name=OrderStatusName.COMPLETED.value).one_or_none()
        
        if order.status_id == pending.id:
            order.status_id = in_progress.id
            order.chef_id = current_user["id"]
        elif order.status_id == in_progress.id:
            order.status_id = completed.id

        try:
            db.session.commit()
        except Exception as e:
            return { "message": str(e) }, 500
        
        return order.serialize(), 200
        

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