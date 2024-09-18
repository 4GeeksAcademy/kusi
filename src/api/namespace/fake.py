from flask_bcrypt import Bcrypt
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
from api.namespaces import api_fake

bcrypt = Bcrypt()

# We have to populate the DB in a topologicar order.
# The following order is a valid one:
# 1. Role
# 2. User
# 3. OrderStatus
# TODO: Complete the following ones.
# 4. Order
# 5. Dish
# 6. Ingredient
# 7. DishIngredient
# 8. OrderDish
@api_fake.route("/data")
class Fake(Resource):
    @api_fake.doc("Populate DB")
    def get(self):
        """Populates the database with fake data."""
        Dish.query.delete()
        DishIngredient.query.delete()
        Ingredient.query.delete()
        Order.query.delete()
        OrderDish.query.delete()
        OrderStatus.query.delete()
        User.query.delete()
        Role.query.delete()
        db.session.commit()

        # Role
        client_role = Role(
            id=1,
            name=RoleName.CLIENT.value
        )
        chef_role = Role(
            id=2,
            name=RoleName.CHEF.value
        )
        admin_role = Role(
            id=3,
            name=RoleName.ADMIN.value
        )
        db.session.add(client_role)
        db.session.add(chef_role)
        db.session.add(admin_role)
        db.session.commit()

        # User
        angel = User(
            role_id=admin_role.id,
            email="angel@4geeks.com",
            name="Angel",
            phone_number="+51 987654321",
            profile_picture_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnGr9y_HkjvCaA_xVgnt_YChHNsSbm-Mi5ig&s",
            hashed_salted_password=bcrypt.generate_password_hash("angel-passwordangel-salt").decode("utf-8"),
            salt="angel-salt"
        )
        manuel = User(
            role_id=chef_role.id,
            email="manuel@4geeks.com",
            name="Manuel",
            profile_picture_url="https://static.wikia.nocookie.net/brawlstars/images/3/3c/Barley_Skin-Default.png/revision/latest/scale-to-width/360?cb=20200331165158",
            hashed_salted_password=bcrypt.generate_password_hash("manuel-passwordmanuel-salt").decode("utf-8"),
            salt="manuel-salt"
        )
        rossy = User(
            role_id=chef_role.id,
            email="rossy@4geeks.com",
            name="Rossy",
            phone_number="+51 321654987",
            profile_picture_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuXhEO8kcN_ZHd61vgwMReU-j4sAdjT3vsFw&s",
            hashed_salted_password=bcrypt.generate_password_hash("rossy-passwordrossy-salt").decode("utf-8"),
            salt="rossy-salt"
        )
        ruben = User(
            role_id=client_role.id,
            email="ruben@4geeks.com",
            name="Ruben",
            phone_number="+51 312645978",
            profile_picture_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR82BVp5Ms1HL69pBxnQ0yv7x4x_fbtYX1U0w&s",
            hashed_salted_password=bcrypt.generate_password_hash("ruben-passwordruben-salt").decode("utf-8"),
            salt="ruben-salt"
        )
        jhoel = User(
            role_id=client_role.id,
            email="jhoel@4geeks.com",
            name="Jhoel",
            phone_number="+51 192837465",
            profile_picture_url="https://static.wikia.nocookie.net/brawlstars/images/3/33/Leon_Skin-Default.png/revision/latest/scale-to-width/360?cb=20200303145443",
            hashed_salted_password=bcrypt.generate_password_hash("jhoel-passwordjhoel-salt").decode("utf-8"),
            salt="jhoel-salt"
        )
        db.session.add(angel)
        db.session.add(manuel)
        db.session.add(rossy)
        db.session.add(ruben)
        db.session.add(jhoel)
        db.session.commit()
        
        # OrderStatus
        pending = OrderStatus(
            id=1,
            name=OrderStatusName.PENDING.value
        )
        in_progress = OrderStatus(
            id=2,
            name=OrderStatusName.IN_PROGRESS.value
        )
        completed = OrderStatus(
            id=3,
            name=OrderStatusName.COMPLETED.value
        )
        cancelled = OrderStatus(
            id=4,
            name=OrderStatusName.CANCELLED.value
        )
        db.session.add(pending)
        db.session.add(in_progress)
        db.session.add(completed)
        db.session.add(cancelled)
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

        #Order
        order_ruben_1 = Order(
            client_id = ruben.id,
            status_id = pending.id,
            grand_total=150.90,
            special_instructions="Sin aji"
            )
        order_ruben_2 = Order(
            client_id = ruben.id,
            status_id = completed.id,
            grand_total=94.50,
            special_instructions=""
            )
        order_jhoel_1 = Order(
            client_id = jhoel.id,
            status_id = pending.id,
            grand_total=240.20,
            special_instructions="Sin papa"
            )
        order_jhoel_2 = Order(
            client_id = jhoel.id,
            status_id = completed.id,
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
        
        return (""), 204
