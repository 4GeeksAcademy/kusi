from flask_restx import fields, Resource
from api.models import db, User, Role, RoleName
from api.namespaces import users_namespace
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity
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

user_update_model = users_namespace.model("UserUpdate",{
    "email": fields.String,
    "name": fields.String,
    "phone_number": fields.String,
    "is_active": fields.Boolean,
    "password": fields.String
})

new_employee = users_namespace.model(
    "NewEmployee",
    {
        "email": fields.String,
        "name": fields.String,
        "phone_number": fields.String,
        "role_id": fields.Integer
    }
)

@users_namespace.response(200, "OK")
@users_namespace.response(400, "Bad request")
@users_namespace.response(403, "Forbidden")
@users_namespace.response(500, "Internal server error")
@users_namespace.route("/")
class CreateAndFetchUsers(Resource):
    @jwt_required()
    @users_namespace.doc(security="jsonWebToken")
    @users_namespace.marshal_list_with(user_model)
    def get(self):
        """Fetches all users."""
        current_user = get_jwt_identity()
        admin_role = Role.query.filter_by(name=RoleName.ADMIN.value).one_or_none()
        if current_user["role_id"] != admin_role.id:
            raise InvalidAPIUsage("Only admins can see users", 403)
        try:
            users = User.query.all()
            return users, 200
        except Exception as e:
            return { "message": str(e) }, 500

    @jwt_required()
    @users_namespace.doc(security="jsonWebToken")
    @users_namespace.expect(new_employee)
    def post(self):
        """Creates a new user given her info."""
        payload = users_namespace.payload
        current_user = get_jwt_identity()
        admin_role = Role.query.filter_by(name=RoleName.ADMIN.value).one_or_none()
        if current_user["role_id"] != admin_role.id:
            raise InvalidAPIUsage("Only admins can create employees", 403)

        name = payload.get("name")
        if name is None:
            raise InvalidAPIUsage("Missing name", status_code=400)
        
        email = payload.get("email")
        if email is None:
            raise InvalidAPIUsage("Missing email", status_code=400)

        phone_number = payload.get("phone_number")

        existing_user = User.query.filter_by(email=email).one_or_none()
        if existing_user is not None:
            raise InvalidAPIUsage("User already exists", 409)

        role_id = payload.get("role_id")
        if role_id is None:
            raise InvalidAPIUsage("Missing role ID", status_code=400)
        existing_role = Role.query.get(role_id)
        if existing_role is None:
            raise InvalidAPIUsage("Role does", 404)
        
        password = secrets.token_hex(16)
        salt = secrets.token_hex(16)
        salted_password = f"{password}{salt}"
        hashed_salted_password = bcrypt.generate_password_hash(salted_password).decode("utf-8")

        try:
            new_employee = User(
                role_id=role_id,
                email=email,
                name=name,
                phone_number=phone_number,
                hashed_salted_password=hashed_salted_password,
                salt=salt
            )
            db.session.add(new_employee)
            db.session.commit()
            return new_employee.serialize(), 201
        except Exception as e:
            return { "message": str(e) }, 500

@users_namespace.route('/<id>')
@users_namespace.param('id', 'User identifier')
@users_namespace.response(201, 'Successful')
@users_namespace.response(404, 'User not found')
@users_namespace.response(500, 'Server error')
class UserAPI(Resource):
    @jwt_required()
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
    
    @jwt_required()
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
                user.email = payload["email"]
            if "phone_number" in payload:
                user.phone_number = payload["phone_number"]
            if "profile_picture_url" in payload and payload["profile_picture_url"] is not None:
                profile_picture_url = payload["profile_picture_url"]
                profile_picture_url = profile_picture_url.strip()
                if len(profile_picture_url) > 0:
                    user.profile_picture_url = profile_picture_url
            if "is_active" in payload:
                user.is_active = payload["is_active"]
            if "role_id" in payload:
                existing_role = Role.query.filter_by(id=payload["role_id"]).first()
                if existing_role is None:
                    raise InvalidAPIUsage("Role not exists", 409)
                user.role_id = payload["role_id"]
            if "password" in payload:
                password = payload["password"]
                password = password.strip()
                if len(password) > 0:
                    salted_password = f"{password}{user.salt}"
                    hashed_salted_password = bcrypt.generate_password_hash(salted_password).decode("utf-8")
                    user.hashed_salted_password = hashed_salted_password
            db.session.commit()
            return user.serialize(), 200
        except Exception as e:
            return { "message": str(e) }, 500

    @jwt_required()
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
