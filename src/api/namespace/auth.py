from flask_restx import Resource  
from api.models import db,User
from api.namespaces import api_auth as api
from api.api_models.user_model import user_create_model
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token

bcrypt = Bcrypt()

@api.response(201, 'Successful')
@api.response(203, 'Invalid Login')
@api.response(404, 'User not found')
@api.response(500, 'Server error')
@api.route('/login')
class Login(Resource):    
    @api.doc('login')
    @api.expect(user_create_model)
    def post(self):
        '''Login user'''
        try:
            email=api.payload["email"]
            password=api.payload["password"]
            user = User.query.filter_by(email=email).first()
            if not user:
                return "User not found",404
            is_password_valid = bcrypt.check_password_hash(user.password,password)
            if not is_password_valid:
                return "Invalid credentials",203
            jwt_acces_token = create_access_token(email)
            return jwt_acces_token,201
        except Exception as error:
            return str(error),500
        

@api.route('/signup')
class SignUp(Resource):    
    @api.doc('signup')
    @api.expect(user_create_model)
    def post(self):
        '''SignUp user'''
        try:
            email=api.payload["email"]
            user = User.query.filter_by(email=email).first()
            if user:
                return "User already exists",404
            password=api.payload["password"]
            passwordHashed = bcrypt.generate_password_hash(password).decode('utf-8')
            user = User(email=api.payload["email"],password=passwordHashed,is_active=True)
            db.session.add(user)
            db.session.commit()
            return "User created",201
        except Exception as error:
            return str(error),500