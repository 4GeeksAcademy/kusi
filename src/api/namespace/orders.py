from flask_restx import Resource  
from api.models import db,Dish,Order,User,OrderStatus,OrderStatusName,OrderDish
from api.namespaces import api_order as api
from api.api_models.order_model import order_model,order_create_model,order_update_model
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required

bcrypt = Bcrypt()

@api.response(201, 'Successful')
@api.response(500, 'Server error')
@api.route('/')
class OrderAPI(Resource):
    method_decorators = [jwt_required()]
    @api.doc(security="jsonWebToken")
    @api.marshal_list_with(order_model)
    def get(self):
        '''Get all orders'''
        try:
            all_orders = Order.query.all()
            return all_orders,201
        except Exception as error:
            return str(error),500
    
    method_decorators = [jwt_required()]
    @api.doc(security="jsonWebToken")
    @api.expect(order_create_model) 
    @api.marshal_with(order_model)
    def post(self):
        '''Create order'''
        try:
            
            client_id=api.payload["client_id"]
            dishes=api.payload["dishes"]
            special_instructions=api.payload["special_instructions"]
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
        

@api.route('/<id>')
@api.param('id', 'Order identifier')
@api.response(201, 'Successful')
@api.response(404, 'Order not found')
@api.response(500, 'Server error')
class OrderAPI(Resource):
    method_decorators = [jwt_required()]
    @api.doc(security="jsonWebToken")
    @api.marshal_with(order_model)
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
    @api.doc(security="jsonWebToken")
    @api.marshal_with(order_model)
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