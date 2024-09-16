from flask_restx import fields  
from api.namespace.orders import api
from api.api_models.user_model import user_model
from api.api_models.dish_model import dish_model

order_status = api.model("OrderStatus",{
    "id": fields.Integer,
    "name": fields.String
})

dish_order = api.model("DishOrder",{
    "dish_id": fields.Integer,
    "dish": fields.Nested(dish_model),
    "quantity": fields.Integer,
    "unit_price": fields.Float
})

order_model = api.model("Order",{
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

dish_create_order = api.model("DishCreateOrder",{
    "dish_id": fields.Integer,
    "quantity": fields.Integer,
    "unit_price": fields.Float
})

order_create_model = api.model("OrderCreate",{
    "client_id": fields.Integer,
    "dishes": fields.List(fields.Nested(dish_create_order)),
    "special_instructions": fields.String
})

order_update_model = api.model("OrderUpdate",{
    "status": fields.String
})

