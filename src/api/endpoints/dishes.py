from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restx import Resource, fields
from api.models import db, Dish, ExtraDish, DishIngredient, Ingredient, Role, RoleName
from api.namespaces import dishes_namespace
from api.utils import InvalidAPIUsage

bcrypt = Bcrypt()

@dishes_namespace.response(200, "OK")
@dishes_namespace.response(500, "Internal server error")
@dishes_namespace.route("/")
class FetchDishes(Resource):
    @jwt_required()
    @dishes_namespace.doc(security="jsonWebToken")
    def get(self):
        """Fetches all available dishes."""
        try:
            dishes = Dish.query.all()
            return list(map(lambda dish: dish.serialize(), dishes)), 200
        except Exception as e:
            return { "message": str(e) }, 500

new_dish = dishes_namespace.model(
    "Dish",
    {
        "name": fields.String,
        "description": fields.String,
        "price": fields.Float,
        "discount_percentage": fields.Integer,
        "cooking_time": fields.Integer,
        "quantity": fields.Integer 
    }
)

@dishes_namespace.response(200, "OK")
@dishes_namespace.response(403, "Forbidden")
@dishes_namespace.response(404, "Dish not found")
@dishes_namespace.response(422, "Unprocessable entity")
@dishes_namespace.response(500, "Internal server error")
@dishes_namespace.route("/<int:dish_id>")
class FetchAndUpdateDishById(Resource):
    @jwt_required()
    @dishes_namespace.doc(security="jsonWebToken")
    def get(self, dish_id):
        """Fetches the dish with specified ID."""
        dish = Dish.query.filter_by(id=dish_id).one_or_none()
        if dish is None:
            raise InvalidAPIUsage(f"Dish {dish_id} not found.", 404)

        try:
            ingredients = list(
                map(
                    lambda ingredient: ingredient.serialize(),
                    db.session.query(Ingredient).join(DishIngredient).filter(DishIngredient.dish_id == dish_id).all()
                )
            )
            response = dish.serialize()
            response["ingredients"] = ingredients
            return response, 200
        except Exception as e:
            return { "message": str(e) }, 500

    @jwt_required()
    @dishes_namespace.doc(security="jsonWebToken")
    @dishes_namespace.expect(new_dish)
    def put(self, dish_id):
        """Updates the quantity of specified dish if the user has admin role."""
        current_user = get_jwt_identity()
        admin_role = Role.query.filter_by(name=RoleName.ADMIN.value).one_or_none()
        if current_user["role_id"] != admin_role.id:
            raise InvalidAPIUsage("Only admins can update dishes", 403)

        dish = Dish.query.filter_by(id=dish_id).one_or_none()
        if dish is None:
            raise InvalidAPIUsage(f"Dish {dish_id} not found", 404)
        
        payload = dishes_namespace.payload

        new_name = payload.get("name")
        if new_name is not None:
            if type(new_name) != str:
                raise InvalidAPIUsage("New name should be a string", 422)
            new_name = new_name.strip()
            if new_name == "":
                raise InvalidAPIUsage("New name should not be empty", 422)
            dish.name = new_name

        new_description = payload.get("description")
        if new_description is not None:
            if type(new_description) != str:
                raise InvalidAPIUsage("New description should be a string", 422)
            new_description = new_description.strip()
            if new_description == "":
                raise InvalidAPIUsage("New description should not be empty", 422)
            dish.description = new_description
        
        new_image_url = payload.get("image_url")
        if new_image_url is not None:
            if type(new_image_url) != str:
                raise InvalidAPIUsage("New image URL should be a string", 422)
            new_image_url = new_image_url.strip()
            if new_image_url == "":
                raise InvalidAPIUsage("New image URL should not be empty", 422)
            dish.image_url = new_image_url

        new_price = payload.get("price")
        if new_price is not None:
            if type(new_price) != float and type(new_price) != int:
                raise InvalidAPIUsage("New price should be a real number", 422)
            new_price = float(new_price)
            if new_price <= 0:
                raise InvalidAPIUsage("New price should be positive", 422)
            dish.price = new_price

        new_discount_percentage = payload.get("discount_percentage")
        if new_discount_percentage is not None:
            if type(new_discount_percentage) != int:
                raise InvalidAPIUsage("New discount percentage should be an integer", 422)
            if new_discount_percentage < 0 or new_discount_percentage > 100:
                raise InvalidAPIUsage("New discount percentage should be between 0 and 100", 422)
            dish.discount_percentage = None if new_discount_percentage == 0 else new_discount_percentage
        
        new_cooking_time = payload.get("cooking_time")
        if new_cooking_time is not None:
            if type(new_cooking_time) != int:
                raise InvalidAPIUsage("New cooking time should be an integer", 422)
            if new_cooking_time < 0:
                raise InvalidAPIUsage("New cooking time should be a non-negative integer", 422)
            dish.cooking_time = None if new_cooking_time == 0 else new_cooking_time
        
        new_quantity = payload.get("quantity")
        if new_quantity is not None:
            if type(new_quantity) != int:
                raise InvalidAPIUsage("New quantity should be an integer", 422)
            if new_quantity < 0:
                raise InvalidAPIUsage("New quantity should be a non-negative integer", 422)
            dish.quantity = new_quantity
        
        try:
            db.session.commit()
        except Exception as e:
            return { "message": str(e) }, 500
        
        return dish.serialize(), 200

@dishes_namespace.response(200, "OK")
@dishes_namespace.response(403, "Forbidden")
@dishes_namespace.response(404, "Dish not found")
@dishes_namespace.response(500, "Internal server error")
@dishes_namespace.route("/<int:dish_id>/extras")
class FetchExtraDishes(Resource):
    @jwt_required()
    @dishes_namespace.doc(security="jsonWebToken")
    def get(self, dish_id):
        """Fetches the extra dishes of the dish with specified ID."""
        dish = Dish.query.filter_by(id=dish_id).one_or_none()
        if dish is None:
            raise InvalidAPIUsage(f"Dish {dish_id} not found.", 404)

        try:
            extra_dishes = list(
                map(
                    lambda extra: extra.serialize(),
                    db.session.query(Dish).join(
                        ExtraDish, ExtraDish.extra_id == Dish.id
                    ).filter(
                        ExtraDish.dish_id == dish_id
                    ).all()
                )
            )
            return extra_dishes, 200
        except Exception as e:
            return { "message": str(e) }, 500
