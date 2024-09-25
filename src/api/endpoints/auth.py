from datetime import timedelta
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from flask_restx import fields, Resource
from api.models import db, User, Role, RoleName
from api.namespaces import auth_namespace
from api.utils import InvalidAPIUsage
import secrets

bcrypt = Bcrypt()

credentials = auth_namespace.model(
    "Credentials",
    {
        "email": fields.String,
        "password": fields.String
    }
)

sign_up_form = auth_namespace.model(
    "SignUpForm",
    {
        "role": fields.Integer,
        "email": fields.String,
        "name": fields.String,
        "phone_number": fields.String,
        "password": fields.String
    }
)

@auth_namespace.response(200, "OK")
@auth_namespace.response(401, "Unauthorized")
@auth_namespace.response(400, "Bad request")
@auth_namespace.response(404, "User not found")
@auth_namespace.response(500, "Internal server error")
@auth_namespace.route("/login")
class Login(Resource):
    @auth_namespace.doc("Login")
    @auth_namespace.expect(credentials)
    def post(self):
        """Logs a user into Kusi given its credentials."""
        payload = auth_namespace.payload
        
        email = payload.get("email")
        if email is None:
            raise InvalidAPIUsage("Missing email", status_code=400)

        candidate_password = payload.get("password")
        if candidate_password is None:
            raise InvalidAPIUsage("Missing password", status_code=400)

        user = User.query.filter_by(email=email).one_or_none()
        if not user:
            raise InvalidAPIUsage("User not found", status_code=404)
        
        try:
            hashed_salted_password, salt = user.hashed_salted_password, user.salt
            salted_candidate_password = f"{candidate_password}{salt}"
            match = bcrypt.check_password_hash(
                hashed_salted_password,
                salted_candidate_password
            )
        except Exception as e:
            return { "message": str(e) }, 500

        if not match:
            raise InvalidAPIUsage("Unauthorized", status_code=401)
        
        access_token = create_access_token(
            identity=user.serialize(),
            fresh=False,
            expires_delta=timedelta(minutes=30)
        )
        return { "access_token": access_token }, 200

@auth_namespace.response(201, "Created")
@auth_namespace.response(400, "Bad request")
@auth_namespace.response(409, "User already exists")
@auth_namespace.response(500, "Internal server error")
@auth_namespace.route("/signup")
class SignUp(Resource):    
    @auth_namespace.doc("Sign Up")
    @auth_namespace.expect(sign_up_form)
    def post(self):
        """Registers a new user given her info."""
        payload = auth_namespace.payload

        name = payload.get("name")
        if name is None:
            raise InvalidAPIUsage("Missing name", status_code=400)

        phone_number = payload.get("phone_number")

        password = payload.get("password")
        if password is None:
            raise InvalidAPIUsage("Missing password", status_code=400)
        
        email = payload.get("email")
        if email is None:
            raise InvalidAPIUsage("Missing email", status_code=400)

        existing_user = User.query.filter_by(email=email).one_or_none()
        if existing_user is not None:
            raise InvalidAPIUsage("User already exists", 409)
        
        # See https://docs.python.org/3/library/secrets.html
        salt = secrets.token_hex(16)
        salted_password = f"{password}{salt}"
        hashed_salted_password = bcrypt.generate_password_hash(salted_password).decode("utf-8")
        
        client_role = Role.query.filter_by(name=RoleName.ADMIN.value).one_or_none()

        try:
            new_user = User(
                role_id=client_role.id,
                email=email,
                name=name,
                phone_number=phone_number,
                is_active=True,
                hashed_salted_password=hashed_salted_password,
                salt=salt
            )
            db.session.add(new_user)
            db.session.commit()
            return new_user.serialize(), 201
        except Exception as e:
            return { "message": str(e) }, 500
