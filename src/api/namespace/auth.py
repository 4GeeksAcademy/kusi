from datetime import timedelta
from flask import jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from flask_restx import Resource
from api.models import (
    db,
    Dish,
    DishIngredient,
    Ingredient,
    Order,
    OrderDish,
    OrderStatus,
    OrderStatusName,
    Role,
    RoleName,
    User
)
from api.namespaces import api_auth as api
from api.dto.users import credentials_dto
from api.api_models.user_model import user_create_model
from api.utils import InvalidAPIUsage

bcrypt = Bcrypt()

@api.response(200, "OK")
@api.response(401, "Unauthorized")
@api.response(400, "Bad request")
@api.response(404, "User not found")
@api.response(500, "Internal server error")
@api.route("/login")
class Login(Resource):    
    @api.doc("Login")
    @api.expect(credentials_dto)
    def post(self):
        """Given a valid email and password, a user is going to log into the application."""
        payload = api.payload
        
        email = payload.get("email")
        if email is None:
            raise InvalidAPIUsage("Missing email", status_code=400)

        candidate_password = payload.get("password")
        if candidate_password is None:
            raise InvalidAPIUsage("Missing password", status_code=400)

        user = User.query.filter_by(email=email).one_or_none()
        if not user:
            raise InvalidAPIUsage("User not found", status_code=404)
        
        hashed_salted_password, salt = user.hashed_password, user.salt
        salted_candidate_password = f"{candidate_password}{salt}"
        match = bcrypt.check_password_hash(
            hashed_salted_password,
            salted_candidate_password
        )

        if not match:
            raise InvalidAPIUsage("Unauthorized", status_code=401)
        
        access_token = create_access_token(
            identity=user.serialize(),
            fresh=False,
            expires_delta=timedelta(minutes=30)
        )
        return jsonify({ "access_token": access_token }), 200

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
            name=api.payload["name"]
            email=api.payload["email"]
            phone=api.payload["phone"]
            password=api.payload["password"]
            passwordHashed = bcrypt.generate_password_hash(password).decode('utf-8')
            user = User(
                email=email,
                name=name,
                phone_number=phone,
                hashed_password=passwordHashed
                )
            db.session.add(user)
            db.session.commit()
            return "User created",201
        except Exception as error:
            return str(error),500
        
@api.route('/gettoken')
class SignUp(Resource):    
    @api.doc('gettoken')
    def get(self):
        '''Get Token (development)'''
        try:
            jwt_acces_token = create_access_token("development")
            return "Bearer "+jwt_acces_token,201
        except Exception as error:
            return str(error),500
        
@api.route('/generatedata')
class SignUp(Resource):    
    @api.doc('generatedata')
    def get(self):
        '''Generate Data (development)'''
        try:
            #Delete old data
            DishIngredient.query.delete()
            OrderDish.query.delete()
            Ingredient.query.delete()
            Order.query.delete()
            OrderStatus.query.delete()
            Dish.query.delete()
            User.query.delete()
            Role.query.delete()
            db.session.commit()

            #Generate new data

            #Role
            rol_admin = Role(name=RoleName.ADMIN)
            rol_chef = Role(name=RoleName.CHEF)
            rol_client = Role(name=RoleName.CLIENT)
            db.session.add(rol_admin)
            db.session.add(rol_chef)
            db.session.add(rol_client)
            db.session.commit()

            #User
            passwordHashed = bcrypt.generate_password_hash("123456").decode('utf-8')

            user_angel = User(
                role_id = rol_admin.id,
                email = "angel@gmail.com",
                name = "Angel",
                phone_number="12345678",
                profile_picture_url="https://www.lremanagementllc.com/wp-content/uploads/2019/06/default-avatar.png",
                hashed_password=passwordHashed,
                salt="unknow"
                )
            user_manuel = User(
                role_id = rol_chef.id,
                email = "manuel@gmail.com",
                name = "Manuel",
                phone_number="12345678",
                profile_picture_url="https://www.lremanagementllc.com/wp-content/uploads/2019/06/default-avatar.png",
                hashed_password=passwordHashed,
                salt="unknow"
                )
            user_rossy = User(
                role_id = rol_chef.id,
                email = "rossy@gmail.com",
                name = "Rossy",
                phone_number="12345678",
                profile_picture_url="https://www.lremanagementllc.com/wp-content/uploads/2019/06/default-avatar.png",
                hashed_password=passwordHashed,
                salt="unknow"
                )
            user_ruben = User(
                role_id = rol_client.id,
                email = "ruben@gmail.com",
                name = "Ruben",
                phone_number="12345678",
                profile_picture_url="https://www.lremanagementllc.com/wp-content/uploads/2019/06/default-avatar.png",
                hashed_password=passwordHashed,
                salt="unknow"
                )
            user_jhoel = User(
                role_id = rol_client.id,
                email = "jhoel@gmail.com",
                name = "Jhoel",
                phone_number="12345678",
                profile_picture_url="https://www.lremanagementllc.com/wp-content/uploads/2019/06/default-avatar.png",
                hashed_password=passwordHashed,
                salt="unknow"
                )
            db.session.add(user_angel)
            db.session.add(user_manuel)
            db.session.add(user_rossy)
            db.session.add(user_ruben)
            db.session.add(user_jhoel)
            db.session.commit()
            
            #Dish
            dish_ceviche = Dish(
                name = "Ceviche",
                description = "Plato tipico de peru con pescado y limon",
                image_url="https://trexperienceperu.com/sites/default/files/2024-05/ceviche.jpg",
                price=30,
                discount_percentage=10,
                cooking_time=15,
                quantity=50
                )
            dish_pollo_a_la_brasa = Dish(
                name = "Pollo a la brasa",
                description = "Plato tipico de peru con pollo al carbon",
                image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjezA9-4z0byMCywNsi3n3nBDUzsXJW2YaaA&s",
                price=60,
                discount_percentage=5,
                cooking_time=5,
                quantity=20
                )
            dish_aji_de_gallina = Dish(
                name = "Aji de gallina",
                description = "Plato tipico de peru con gallina y aji",
                image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSWTUO8hei_5TWAQ4lE92JDQwXCCCRbVcxrw&s",
                price=20,
                discount_percentage=15,
                cooking_time=15,
                quantity=80
                )
            dish_estofado_de_carne = Dish(
                name = "Estafado de carne",
                description = "Plato tipico de peru con carne",
                image_url="https://www.recetasnestle.com.pe/sites/default/files/srh_recipes/02d772e59776b9b3566382bbf306f795.jpg",
                price=20,
                discount_percentage=10,
                cooking_time=15,
                quantity=200
                )
            dish_arroz_con_pollo = Dish(
                name = "Arroz con pollo",
                description = "Plato tipico de peru con arroz y pollo",
                image_url="https://i.ytimg.com/vi/H6lgxgEWIs8/maxresdefault.jpg",
                price=15,
                discount_percentage=5,
                cooking_time=15,
                quantity=50
                )
            dish_pollo_al_horno = Dish(
                name = "Pollo al horno",
                description = "Plato tipico de peru con pollo y salsa",
                image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5VXgFC1udztiDcPU8A7LAPe4Pt8ZMUUitQ&s",
                price=30,
                discount_percentage=25,
                cooking_time=25,
                quantity=20
                )
            dish_causa_rellena = Dish(
                name = "Causa rellena",
                description = "Plato tipico de peru papa y aji amarillo",
                image_url="https://cdn0.recetasgratis.net/es/posts/8/6/2/causa_limena_31268_orig.jpg",
                price=20,
                discount_percentage=10,
                cooking_time=10,
                quantity=120
                )
            db.session.add(dish_ceviche)
            db.session.add(dish_pollo_a_la_brasa)
            db.session.add(dish_aji_de_gallina)
            db.session.add(dish_estofado_de_carne)
            db.session.add(dish_arroz_con_pollo)
            db.session.add(dish_causa_rellena)
            db.session.add(dish_pollo_al_horno)
            db.session.commit()
            
            #Ingredient
            ingredient_pollo = Ingredient(name="Pollo")
            ingredient_pescado = Ingredient(name="Pescado")
            ingredient_gallina = Ingredient(name="Gallina")
            ingredient_carne = Ingredient(name="Carne")
            ingredient_cebolla = Ingredient(name="Cebolla")
            ingredient_lechuga = Ingredient(name="Lechuga")
            ingredient_limon = Ingredient(name="Limon")
            ingredient_aji = Ingredient(name="Aji")
            ingredient_arroz = Ingredient(name="Arroz")
            ingredient_papa_sancochada = Ingredient(name="Papa sancochada")
            ingredient_papa_frita = Ingredient(name="Papa frita")
            ingredient_huevo = Ingredient(name="Huevo")
            ingredient_aceituna = Ingredient(name="Aceituna")
            ingredient_zanahoria = Ingredient(name="Zanahoria")
            ingredient_mayonesa = Ingredient(name="Mayonesa")
            db.session.add(ingredient_pollo)
            db.session.add(ingredient_pescado)
            db.session.add(ingredient_gallina)
            db.session.add(ingredient_carne)
            db.session.add(ingredient_cebolla)
            db.session.add(ingredient_lechuga)
            db.session.add(ingredient_limon)
            db.session.add(ingredient_aji)
            db.session.add(ingredient_arroz)
            db.session.add(ingredient_papa_sancochada)
            db.session.add(ingredient_papa_frita)
            db.session.add(ingredient_huevo)
            db.session.add(ingredient_aceituna)
            db.session.add(ingredient_zanahoria)
            db.session.add(ingredient_mayonesa)
            db.session.commit()
            
            #DishIngredient
            dish_ingredient_ceviche_pescado = DishIngredient(
                dish_id=dish_ceviche.id,
                ingredient_id = ingredient_pescado.id
                )
            dish_ingredient_ceviche_limon = DishIngredient(
                dish_id=dish_ceviche.id,
                ingredient_id = ingredient_limon.id
                )
            dish_ingredient_ceviche_cebolla = DishIngredient(
                dish_id=dish_ceviche.id,
                ingredient_id = ingredient_cebolla.id
                )
            dish_ingredient_ceviche_lechuga = DishIngredient(
                dish_id=dish_ceviche.id,
                ingredient_id = ingredient_lechuga.id
                )
            dish_ingredient_pollo_a_la_brasa_pollo = DishIngredient(
                dish_id=dish_pollo_a_la_brasa.id,
                ingredient_id = ingredient_pollo.id
                )
            dish_ingredient_pollo_a_la_brasa_papa_frita = DishIngredient(
                dish_id=dish_pollo_a_la_brasa.id,
                ingredient_id = ingredient_papa_frita.id
                )
            db.session.add(dish_ingredient_ceviche_pescado)
            db.session.add(dish_ingredient_ceviche_limon)
            db.session.add(dish_ingredient_ceviche_cebolla)
            db.session.add(dish_ingredient_ceviche_lechuga)
            db.session.add(dish_ingredient_pollo_a_la_brasa_pollo)
            db.session.add(dish_ingredient_pollo_a_la_brasa_papa_frita)
            db.session.commit()
            
            #OrderStatus
            order_status_pending = OrderStatus(name=OrderStatusName.PENDING)
            order_status_in_progress = OrderStatus(name=OrderStatusName.IN_PROGRESS)
            order_status_completed = OrderStatus(name=OrderStatusName.COMPLETED)
            order_status_cancelled = OrderStatus(name=OrderStatusName.CANCELLED)
            db.session.add(order_status_pending)
            db.session.add(order_status_in_progress)
            db.session.add(order_status_completed)
            db.session.add(order_status_cancelled)
            db.session.commit()

            #Order
            order_ruben_1 = Order(
                client_id = user_ruben.id,
                status_id = order_status_pending.id,
                grand_total=150.90,
                special_instructions="Sin aji"
                )
            order_ruben_2 = Order(
                client_id = user_ruben.id,
                status_id = order_status_completed.id,
                grand_total=94.50,
                special_instructions=""
                )
            order_jhoel_1 = Order(
                client_id = user_jhoel.id,
                status_id = order_status_pending.id,
                grand_total=240.20,
                special_instructions="Sin papa"
                )
            order_jhoel_2 = Order(
                client_id = user_jhoel.id,
                status_id = order_status_in_progress.id,
                grand_total=30,
                special_instructions="Sin cebolla y sin aji"
                )
            db.session.add(order_ruben_1)
            db.session.add(order_ruben_2)
            db.session.add(order_jhoel_1)
            db.session.add(order_jhoel_2)
            db.session.commit()

            #OrderDish
            order_ruben_1_dish_1 = OrderDish(
                order_id = order_ruben_1.id,
                dish_id = dish_ceviche.id,
                unit_price=20.50,
                quantity=4
                )
            order_ruben_1_dish_2 = OrderDish(
                order_id = order_ruben_1.id,
                dish_id = dish_pollo_al_horno.id,
                unit_price=30,
                quantity=1
                )
            order_ruben_2_dish_1 = OrderDish(
                order_id = order_ruben_2.id,
                dish_id = dish_pollo_a_la_brasa.id,
                unit_price=150,
                quantity=2
                )
            order_jhoel_1_dish_1 = OrderDish(
                order_id = order_jhoel_1.id,
                dish_id = dish_pollo_al_horno.id,
                unit_price=15,
                quantity=2
                )
            order_jhoel_1_dish_2 = OrderDish(
                order_id = order_jhoel_1.id,
                dish_id = dish_causa_rellena.id,
                unit_price=30,
                quantity=4
                )
            order_jhoel_1_dish_3 = OrderDish(
                order_id = order_jhoel_1.id,
                dish_id = dish_aji_de_gallina.id,
                unit_price=15,
                quantity=2
                )
            order_jhoel_2_dish_1 = OrderDish(
                order_id = order_jhoel_2.id,
                dish_id = dish_ceviche.id,
                unit_price=40,
                quantity=1
                )
            db.session.add(order_ruben_1_dish_1)
            db.session.add(order_ruben_1_dish_2)
            db.session.add(order_ruben_2_dish_1)
            db.session.add(order_jhoel_1_dish_1)
            db.session.add(order_jhoel_1_dish_2)
            db.session.add(order_jhoel_1_dish_3)
            db.session.add(order_jhoel_2_dish_1)
            db.session.commit()
            
            return "Data generated",201
        except Exception as error:
            return str(error),500