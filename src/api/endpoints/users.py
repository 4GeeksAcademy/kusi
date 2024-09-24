from flask_restx import fields, Resource
from api.models import db, User, Role
from api.namespaces import users_namespace
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required
from api.utils import InvalidAPIUsage
import secrets

bcrypt = Bcrypt()

role_model = users_namespace.model("Role",{
    "id": fields.Integer,
    "name": fields.String,
})

user_model = users_namespace.model("User",{
    "id": fields.Integer,
    "role_id": fields.Integer,
    "role": fields.Nested(role_model),
    "email": fields.String,
    "name": fields.String,
    "phone_number": fields.String,
    "is_active": fields.Boolean,
    "profile_picture_url": fields.String,
    "created_at": fields.DateTime,
    "updated_at": fields.DateTime
})
user_create_model = users_namespace.model("UserCreate",{
    "role_id": fields.Integer,
    "email": fields.String,
    "name": fields.String,
    "phone_number": fields.String,
    "password": fields.String
})
user_update_model = users_namespace.model("UserUpdate",{
    "email": fields.String,
    "name": fields.String,
    "phone_number": fields.String,
    "is_active": fields.Boolean,
    "profile_picture_url": fields.String,
    "password": fields.String
})

@users_namespace.response(200, "OK")
@users_namespace.response(500, "Internal server error")
@users_namespace.route("/")
class UserAPI(Resource):
    method_decorators = [jwt_required()]
    @users_namespace.doc(security="jsonWebToken")
    @users_namespace.marshal_list_with(user_model)
    def get(self):
        '''Get all users'''
        try:
            all_users = User.query.all()
            return all_users,200
        except Exception as error:
            return str(error),500
    
    method_decorators = [jwt_required()]
    @users_namespace.doc(security="jsonWebToken")
    @users_namespace.expect(user_create_model)
    def post(self):
        """Create a new user given her info."""
        try:
            payload = users_namespace.payload

            role_id = payload.get("role_id")
            if role_id is None:
                raise InvalidAPIUsage("Missing role_id", status_code=400)

            name = payload.get("name")
            if name is None:
                raise InvalidAPIUsage("Missing name", status_code=400)

            password = payload.get("password")
            if password is None:
                raise InvalidAPIUsage("Missing password", status_code=400)
            
            email = payload.get("email")
            if email is None:
                raise InvalidAPIUsage("Missing email", status_code=400)

            phone_number = payload.get("phone_number")
            if phone_number is None:
                phone_number = ""

            is_active = payload.get("is_active")
            if is_active is None:
                is_active = True

            existing_user = User.query.filter_by(email=email).one_or_none()
            if existing_user is not None:
                return { "message": "User already exists" }, 409
                raise InvalidAPIUsage("User already exists", 409)

            existing_role = Role.query.filter_by(id=role_id).first()
            if existing_role is None:
                return { "message": "Role not exists" }, 409
                raise InvalidAPIUsage("Role not exists", 409)
            
            # See https://docs.python.org/3/library/secrets.html
            salt = secrets.token_hex(16)
            salted_password = f"{password}{salt}"
            hashed_salted_password = bcrypt.generate_password_hash(salted_password).decode("utf-8")

            try:
                new_user = User(
                    role_id=role_id,
                    email=email,
                    name=name,
                    phone_number=phone_number,
                    is_active=is_active,
                    hashed_salted_password=hashed_salted_password,
                    # profile_picture_url="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
                    salt=salt
                )
                db.session.add(new_user)
                db.session.commit()
                return new_user.serialize(), 201
            except Exception as e:
                return { "message": str(e) }, 500
        except Exception as e:
            return { "message": str(e) }, 500

@users_namespace.route('/<id>')
@users_namespace.param('id', 'User identifier')
@users_namespace.response(201, 'Successful')
@users_namespace.response(404, 'User not found')
@users_namespace.response(500, 'Server error')
class UserAPI(Resource):
    method_decorators = [jwt_required()]
    @users_namespace.doc(security="jsonWebToken")
    @users_namespace.marshal_with(user_model)
    def get(self, id):
        '''Get user by id'''
        try:
            user = User.query.filter_by(id=id).first()
            if not user:
                return "User not found",404
            return user,200
        except Exception as error:
            return str(error),500
    
    method_decorators = [jwt_required()]
    @users_namespace.doc(security="jsonWebToken")
    @users_namespace.expect(user_update_model)
    def put(self,id):
        """Update a user given her info."""
        try:
            
            payload = users_namespace.payload
            user = User.query.filter_by(id=id).first()
            if "name" in payload:
                user.name = payload["name"]
            if "email" in payload:
                email = payload.get("email")
                existing_email = User.query.filter(email==email,id!=id).one_or_none()
                if existing_email is not None:
                    return { "message": "Email already exists" }, 409
                    raise InvalidAPIUsage("User already exists", 409)
                user.email = payload["email"]
            if "phone_number" in payload:
                user.phone_number = payload["phone_number"]
            if "profile_picture_url" in payload:
                user.profile_picture_url = payload["profile_picture_url"]
            if "is_active" in payload:
                user.is_active = payload["is_active"]
            if "role_id" in payload:
                existing_role = Role.query.filter_by(id=payload["role_id"]).first()
                if existing_role is None:
                    return { "message": "Role not exists" }, 409
                    raise InvalidAPIUsage("Role not exists", 409)
                user.role_id = payload["role_id"]
            if "password" in payload:
                password = payload["password"]
                salt = secrets.token_hex(16)
                salted_password = f"{password}{salt}"
                hashed_salted_password = bcrypt.generate_password_hash(salted_password).decode("utf-8")
                user.hashed_salted_password = hashed_salted_password
            db.session.commit()
            return user.serialize(), 200
        except Exception as e:
            return { "message": str(e) }, 500

    method_decorators = [jwt_required()]
    @users_namespace.doc(security="jsonWebToken")
    def delete(self,id):
        '''Delete user'''
        try:
            user = User.query.get(id)
            if not user:
                return "User not found",404
            db.session.delete(user)
            db.session.commit()
            message="User deleted"
            return message,200
        except Exception as error:
            return str(error),500
