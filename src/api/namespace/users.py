from flask_restx import Resource  
from api.models import db,User,Role
from api.namespaces import api_user as api
from api.api_models.user_model import user_model,user_create_model,user_update_model
from flask_bcrypt import Bcrypt
from flask_jwt_extended import jwt_required

bcrypt = Bcrypt()

@api.response(201, 'Successful')
@api.response(500, 'Server error')
@api.route('/')
class UserAPI(Resource):
    method_decorators = [jwt_required()]
    @api.doc(security="jsonWebToken")
    @api.marshal_list_with(user_model)
    def get(self):
        '''Get all users'''
        try:
            all_users = User.query.all()
            return all_users,201
        except Exception as error:
            return str(error),500
    
    method_decorators = [jwt_required()]
    @api.doc(security="jsonWebToken")
    @api.expect(user_create_model)
    @api.marshal_with(user_model)
    def post(self):
        '''Create user'''
        try:
            
            email=api.payload["email"]
            user = User.query.filter_by(email=email).first()
            if user:
                return "User already exists",404
            role_name=api.payload["role"]
            role = Role.query.filter_by(name=role_name).first(),
            if not role:
                return "Rol not found",404
            name=api.payload["name"]
            email=api.payload["email"]
            phone_number=api.payload["phone_number"]
            password=api.payload["password"]
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

@api.route('/<id>')
@api.param('id', 'User identifier')
@api.response(201, 'Successful')
@api.response(404, 'User not found')
@api.response(500, 'Server error')
class UserAPI(Resource):
    method_decorators = [jwt_required()]
    @api.doc(security="jsonWebToken")
    @api.marshal_with(user_model)
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
    @api.doc(security="jsonWebToken")
    @api.expect(user_update_model)
    @api.marshal_with(user_model)
    def put(self,id):
        '''Update user'''
        try:
            user = User.query.filter_by(id=id).first()
            if not user:
                api.abort(404)
            if "email" in api.payload:
                user.email = api.payload["email"]
            if "name" in api.payload:
                user.name = api.payload["name"]
            if "phone_number" in api.payload:
                user.phone_number = api.payload["phone_number"]
            if "is_active" in api.payload:
                user.is_active = api.payload["is_active"]
            if "profile_picture_url" in api.payload:
                user.profile_picture_url = api.payload["profile_picture_url"]
            if "password" in api.payload:
                user.password = api.payload["password"]
                user.hashed_password = bcrypt.generate_password_hash(api.payload["password"]).decode('utf-8')
            db.session.commit()
            return user,201
        except Exception as error:
            return str(error),500

    method_decorators = [jwt_required()]
    @api.doc(security="jsonWebToken")
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
