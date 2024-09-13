from flask_restx import Resource  
from api.models import db,User
from api.namespaces import api_user as api
from api.api_models.user_model import user_model,user_create_model,user_update_model

@api.response(201, 'Successful')
@api.response(500, 'Server error')
@api.route('/')
class UserAPI(Resource):
    @api.doc('get_users')
    @api.marshal_list_with(user_model)
    def get(self):
        '''Get all users'''
        try:
            all_users = User.query.all()
            return all_users,201
        except Exception as error:
            return str(error),500
    
    @api.doc('post_user')
    @api.expect(user_create_model)
    @api.marshal_with(user_model)
    def post(self):
        '''Create user'''
        try:
            user = User(email=api.payload["email"],password=api.payload["password"],is_active=True)
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
    @api.doc('get_user')
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
    
    @api.doc('put_user')
    @api.expect(user_update_model)
    @api.marshal_with(user_model)
    def put(self,id):
        '''Update user'''
        try:
            user = User.query.filter_by(id=id).first()
            if not user:
                api.abort(404)
            user.email = api.payload["email"]
            user.is_active = api.payload["is_active"]
            db.session.commit()
            return user,201
        except Exception as error:
            return str(error),500

    @api.doc('delete_user')
    def delete(self,id):
        '''Update user'''
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
