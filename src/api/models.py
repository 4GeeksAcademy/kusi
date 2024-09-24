from datetime import datetime
from enum import Enum
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class RoleName(str, Enum):
    CLIENT = "Client"
    CHEF = "Chef"
    ADMIN = "Admin"

class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Enum(RoleName), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    def __repr__(self):
        return f"<Role {self.name.value}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name.value
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey("role.id"), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(20))
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    profile_picture_url = db.Column(db.String(1023))
    hashed_salted_password = db.Column(db.String(255), nullable=False)
    salt = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    def __repr__(self):
        return f"<User {self.email}>"

    def serialize(self):
        return {
            "id": self.id,
            "role_id": self.role_id,
            "email": self.email,
            "name": self.name,
            "phone_number": self.phone_number,
            "is_active": self.is_active,
            "profile_picture_url": self.profile_picture_url,
            "created_at": self.created_at.isoformat()
        }

class OrderStatusName(str, Enum):
    PENDING = "Pending"
    IN_PROGRESS = "In progress"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"

class OrderStatus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Enum(OrderStatusName), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now) 

    def __repr__(self):
        return f"<OrderStatus {self.name.value}>"
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name.value
        }

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    chef_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    status_id = db.Column(db.Integer, db.ForeignKey("order_status.id"), nullable=False)
    grand_total = db.Column(db.Float, nullable=False)
    special_instructions = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    def __repr__(self):
        return f"<Order {self.id}>"
    
    def serialize(self):
        return {
            "id": self.id,
            "client_id": self.client_id,
            "chef_id": self.chef_id,
            "status_id": self.status_id,
            "grand_total": self.grand_total,
            "special_instructions": self.special_instructions,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }

class OrderDish(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("order.id"), nullable=False)
    dish_id = db.Column(db.Integer, db.ForeignKey("dish.id"), nullable=False)
    unit_price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    def __repr__(self):
        return f"<OrderDish {self.id}>"

    def serialize(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "dish_id": self.dish_id,
            "unit_price": self.unit_price,
            "quantity": self.quantity
        }

class Dish(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.String(511), nullable=False)
    image_url = db.Column(db.String(1023))
    price = db.Column(db.Float, nullable=False)
    discount_percentage = db.Column(db.Integer)
    cooking_time = db.Column(db.Integer)
    quantity = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    def __repr__(self):
        return f"<Dish {self.name}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "image_url": self.image_url,
            "price": self.price,
            "discount_percentage": self.discount_percentage,
            "cooking_time": self.cooking_time,
            "quantity": self.quantity
        }
 
class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    def __repr__(self):
        return f"<Ingredient {self.name}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }

class DishIngredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    dish_id = db.Column(db.Integer, db.ForeignKey("dish.id"), nullable=False)
    ingredient_id = db.Column(db.Integer, db.ForeignKey("ingredient.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)
    
    def __repr__(self):
        return f"<DishIngredient {self.id}>"
    
    def serialize(self):
        return {
            "id": self.id,
            "dish_id": self.dish_id,
            "ingredient_id": self.ingredient_id
        }
