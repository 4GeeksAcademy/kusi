from flask_restx import fields, Resource
from api.models import db, Dish, Order, OrderStatus, OrderStatusName, OrderDish
from api.endpoints.dishes import dish_model
from api.namespaces import orders_namespace
from api.endpoints.users import user_model
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required

order_status = orders_namespace.model("OrderStatus",{
    "id": fields.Integer,
    "name": fields.String
})

dish_order = orders_namespace.model("DishOrder",{
    "dish_id": fields.Integer,
    "dish": fields.Nested(dish_model),
    "quantity": fields.Integer,
    "unit_price": fields.Float
})

order_model = orders_namespace.model("Order",{
    "id": fields.Integer,
    "client_id": fields.Integer,
    "user": fields.Nested(user_model),
    "status_id": fields.Integer,
    "order_status": fields.Nested(order_status),
    "order_dishes": fields.List(fields.Nested(dish_order)),
    "grand_total": fields.Float,
    "special_instructions": fields.String,
    "created_at": fields.DateTime,
    "updated_at": fields.DateTime
})

dish_create_order = orders_namespace.model("DishCreateOrder",{
    "dish_id": fields.Integer,
    "quantity": fields.Integer,
    "unit_price": fields.Float
})

order_create_model = orders_namespace.model("OrderCreate",{
    "client_id": fields.Integer,
    "dishes": fields.List(fields.Nested(dish_create_order)),
    "special_instructions": fields.String
})

order_update_model = orders_namespace.model("OrderUpdate",{
    "status": fields.String
})

bcrypt = Bcrypt()

@orders_namespace.response(201, 'Successful')
@orders_namespace.response(500, 'Server error')
@orders_namespace.route('/')
class OrderAPI(Resource):
    method_decorators = [jwt_required()]
    @orders_namespace.doc(security="jsonWebToken")
    @orders_namespace.marshal_list_with(order_model)
    def get(self):
        '''Get all orders'''
        try:
            all_orders = Order.query.all()
            return all_orders,201
        except Exception as error:
            return str(error),500
    
    method_decorators = [jwt_required()]
    @orders_namespace.doc(security="jsonWebToken")
    @orders_namespace.expect(order_create_model) 
    @orders_namespace.marshal_with(order_model)
    def post(self):
        '''Create order'''
        try:
            
            client_id=orders_namespace.payload["client_id"]
            dishes=orders_namespace.payload["dishes"]
            special_instructions=orders_namespace.payload["special_instructions"]
            # user = User.query.filter_by(id=client_id).first()
            # if user:
            #     return "Client not found",404
            grand_total = 0
            for dish in dishes:
                grand_total = grand_total + dish["unit_price"]
            order_status = OrderStatus.query.filter_by(name=OrderStatusName.PENDING).first()
            order = Order(
                client_id=client_id,
                status_id=order_status.id,
                grand_total=grand_total,
                special_instructions=special_instructions
                )
            db.session.add(order)
            db.session.commit()

            
            for dish in dishes:
                dishExists = Dish.query.filter_by(id=dish["dish_id"]).first()
                if not dishExists:
                    return "Dish not found",404
                orderdish = OrderDish(
                    order_id=order.id,
                    dish_id=dish["dish_id"],
                    unit_price=dish["unit_price"],
                    quantity=dish["quantity"]
                    )
                db.session.add(orderdish)
                db.session.commit()

            return order,201
        except Exception as error:
            return str(error),500
        

@orders_namespace.route('/<id>')
@orders_namespace.param('id', 'Order identifier')
@orders_namespace.response(201, 'Successful')
@orders_namespace.response(404, 'Order not found')
@orders_namespace.response(500, 'Server error')
class OrderAPI(Resource):
    method_decorators = [jwt_required()]
    @orders_namespace.doc(security="jsonWebToken")
    @orders_namespace.marshal_with(order_model)
    def get(self, id):
        '''Get order by id'''
        try:
            order = Order.query.filter_by(id=id).first()
            if not order:
                return "Order not found",404
            return order
        except Exception as error:
            return str(error),500
    
    method_decorators = [jwt_required()]
    @orders_namespace.doc(security="jsonWebToken")
    @orders_namespace.marshal_with(order_model)
    def put(self,id):
        '''Update order'''
        try:
            order = Order.query.filter_by(id=id).first()
            if not order:
                  return "Order not found",404
            order_status = OrderStatus.query.filter_by(id=order.status_id).first()
            if not order_status:
                  return "Order Status not found",404
            new_order_status=OrderStatusName.PENDING
            if order_status.name==OrderStatusName.PENDING:
                new_order_status=OrderStatusName.IN_PROGRESS
            if order_status.name==OrderStatusName.IN_PROGRESS:
                new_order_status=OrderStatusName.COMPLETED
            if order_status.name==OrderStatusName.CANCELLED:
                new_order_status=OrderStatusName.CANCELLED
            order_status = OrderStatus.query.filter_by(name=new_order_status).first()
            order.status_id = order_status.id
            db.session.commit()
            return order,201
        except Exception as error:
            return str(error),500