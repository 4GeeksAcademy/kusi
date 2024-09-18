from flask_restx import fields, Resource
from api.models import db, User, Role
from api.namespaces import users_namespace
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required

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
            return all_users,201
        except Exception as error:
            return str(error),500
    
    method_decorators = [jwt_required()]
    @users_namespace.doc(security="jsonWebToken")
    @users_namespace.expect(user_create_model)
    @users_namespace.marshal_with(user_model)
    def post(self):
        '''Create user'''
        try:
            payload = users_namespace.payload
            email=payload["email"]
            user = User.query.filter_by(email=email).first()
            if user:
                return "User already exists",404
            role_name=payload["role"]
            role = Role.query.filter_by(name=role_name).first(),
            if not role:
                return "Rol not found",404
            name=payload["name"]
            email=payload["email"]
            phone_number=payload["phone_number"]
            password=payload["password"]
            passwordHashed = bcrypt.generate_password_hash(password).decode('utf-8')
            user = User(
                role_id=role.id,
                email=email,
                name=name,
                phone_number=phone_number,
                hashed_password=passwordHashed
                )
            db.session.add(user)
            db.session.commit()
            return user,201
        except Exception as error:
            return str(error),500

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
            return user
        except Exception as error:
            return str(error),500
    
    method_decorators = [jwt_required()]
    @users_namespace.doc(security="jsonWebToken")
    @users_namespace.expect(user_update_model)
    @users_namespace.marshal_with(user_model)
    def put(self,id):
        '''Update user'''
        try:
            user = User.query.filter_by(id=id).first()
            if not user:
                users_namespace.abort(404)
            payload = users_namespace.payload
            if "email" in payload:
                user.email = payload["email"]
            if "name" in payload:
                user.name = payload["name"]
            if "phone_number" in payload:
                user.phone_number = payload["phone_number"]
            if "is_active" in payload:
                user.is_active = payload["is_active"]
            if "profile_picture_url" in payload:
                user.profile_picture_url = payload["profile_picture_url"]
            if "password" in payload:
                user.password = payload["password"]
                user.hashed_password = bcrypt.generate_password_hash(payload["password"]).decode('utf-8')
            db.session.commit()
            return user,201
        except Exception as error:
            return str(error),500

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
            return message,201
        except Exception as error:
            return str(error),500
