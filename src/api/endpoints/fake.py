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
from api.namespaces import fake_namespace

bcrypt = Bcrypt()

# We have to populate the DB in a topological order.
# The following order is a valid one:
# 1. Role
# 2. User
# 3. OrderStatus
# 4. Dish
# 5. Ingredient
# 6. DishIngredient
# TODO: Complete the following ones.
# 7. Order
# 8. OrderDish
@fake_namespace.route("/data")
class Fake(Resource):
    @fake_namespace.doc("Populate DB")
    def get(self):
        """Populates the database with fake data."""
        # We have to clear the tables in a reverse topological order due to FK constraints.
        OrderDish.query.delete()
        Order.query.delete()
        DishIngredient.query.delete()
        Ingredient.query.delete()
        Dish.query.delete()        
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

        ceviche = Dish(
            id=1,
            name="Ceviche",
            description="Posiblemente, el plato más emblemático del Perú. Hecho con pescados y, dependiendo del gusto, mariscos, es bañado con aliños cítricos que no hacen más que resaltar el sabor.",
            image_url="https://imag.bonviveur.com/ceviche-peruano-de-pescado.jpg",
            price=51,
            cooking_time=25,
            quantity=50
        )
        lomo_saltado = Dish(
            id=2,
            name="Lomo saltado",
            description="Un plato cuyo origen se remonta a la llegada de los chinos-cantoneses a Perú a partir del siglo XIX. El lomo es saltado en sartén hasta adquirir la cocción adecuada junto un poco de vinagre y algunas especias para luego pasar a ser acompañado por papas fritas y arroz.",
            image_url="https://i.ytimg.com/vi/r2oGrH__hT0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBtRrQkJyQYxpAJD7aR3yN2BhJ0Cw",
            price=57,
            discount_percentage=15,
            cooking_time=30,
            quantity=25
        )
        aji_de_gallina = Dish(
            id=3,
            name="Ají de gallina",
            description="Un plato que consiste en una crema con pechuga de gallina deshilachada y acompañada por papa cocida o arroz blanco.",
            image_url="https://www.acozykitchen.com/wp-content/uploads/2023/10/aji_de_gallina_8-scaled.jpg",
            price=32,
            discount_percentage=10,
            cooking_time=45,
            quantity=25
        )
        causa = Dish(
            id=4,
            name="Causa limeña",
            description="Este plato es hecho a base de papa amarilla (uno de los más de 3,000 tipos de papas que existe en el Perú) y su presentación por capas llama la atención. ",
            image_url="https://cdn0.recetasgratis.net/es/posts/8/6/2/causa_limena_31268_orig.jpg",
            price=31,
            discount_percentage=20,
            cooking_time=20,
            quantity=50
        )
        pachamanca = Dish(
            id=5,
            name="Pachamanca",
            description="El nombre proviene de las voces quechuas «Pacha» que significa «tierra» y «manka» que significa «olla», lo cual nos lleva a entender que su significado sería el de \"Olla de Tierra\". Y es que describe muy bien la forma de cocción de este plato. En donde los alimentos son cocinados mediante el contacto con piedras calientes dentro de un hoyo cavado bajo tierra.",
            image_url="https://www.chullostravelperu.com/wp-content/uploads/2023/01/PACHAMANCA.jpg",
            price=140,
            discount_percentage=10,
            cooking_time=120,
            quantity=1
        )
        arroz_con_pollo = Dish(
            id=6,
            name="Arroz con pollo",
            description="Este plato nacido en el siglo XVIII como opción al ya conocido arroz con pato de esa época, comenzó a conquistar las mesas de los peruanos. Se le suele acompañar de papa a la huancaína o salsa criolla. Y puede ser encontrado en cualquier restaurante del país.",
            image_url="https://imgmedia.buenazo.pe/1200x660/buenazo/original/2022/10/24/60d89da6913c240e6725db08.jpg",
            price=37,
            cooking_time=35,
            quantity=25,
        )
        carapulcra = Dish(
            id=7,
            name="Carapulcra con sopa seca",
            description="Su nombre proviene de la palabra \"qala phurka\", que en aimara significa \"cocinar sobre piedras\". Y se basaba en la combinación de insumos como carne de llama o alpaca y mucho ají, que luego fueron parte de una interesante fusión con ingredientes españoles",
            image_url="https://origin.cronosmedia.glr.pe/large/2021/01/15/lg_60023273c6959d0ec119a2ff.jpg",
            price=25,
            discount_percentage=20,
            cooking_time=120,
            quantity=25,
        )
        aguadito = Dish(
            id=8,
            name="Aguadito",
            description="Consiste en una sopa de pollo espesa con arroz y otros vegetales. De una coloración verde debida al uso significativo de culantro en la sopa, es consumido tradicionalmente en invierno.",
            image_url="https://aeronoticias.com.pe/noticiero/wp-content/uploads/2023/08/aguado.jpg",
            price=32,
            discount_percentage=30,
            cooking_time=30,
            quantity=25
        )
        tacu_tacu = Dish(
            id=9,
            name="Tacu Tacu",
            description="Plato criollo que consiste en arroz cocido, menestras y sofrito a base de ají amarillo. Los cuales se mezclan hasta obtener una masa bajo el calor de la sartén.",
            image_url="https://www.infobae.com/new-resizer/VwPhRfteUHhmGPIfAzht4b7ROHo=/arc-anglerfish-arc2-prod-infobae/public/EM3TYZTKMFCWJJ6XGSIHFF2EFU.jpg",
            price=42,
            discount_percentage=10,
            cooking_time=25,
            quantity=25
        )
        pollo_a_la_brasa = Dish(
            id=10,
            name="Pollo a la brasa",
            description="Es un plato que consiste en pollo asado al carbón a través de un sistema rotatorio que permite una cocción uniforme. Es acompañado de papas fritas y actualmente es un ícono cultural peruano.",
            image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjezA9-4z0byMCywNsi3n3nBDUzsXJW2YaaA&s",
            price=34,
            cooking_time=90,
            quantity=25
        )

        db.session.add(ceviche)
        db.session.add(lomo_saltado)
        db.session.add(aji_de_gallina)
        db.session.add(causa)
        db.session.add(pachamanca)
        db.session.add(arroz_con_pollo)
        db.session.add(carapulcra)
        db.session.add(aguadito)
        db.session.add(tacu_tacu)
        db.session.add(pollo_a_la_brasa)
        db.session.commit()

        pescado = Ingredient(name="Pescado")
        cebolla = Ingredient(name="Cebolla")
        aji_limo = Ingredient(name="Ají limo")
        culantro = Ingredient(name="Culantro")
        limon = Ingredient(name="Limón")
        ajo = Ingredient(name="Ajo")
        pimienta = Ingredient(name="Pimienta")
        sal = Ingredient(name="Sal")
        camote = Ingredient(name="Camote")
        choclo = Ingredient(name="Choclo")
        lechuga = Ingredient(name="Lechuga")
        lomo = Ingredient(name="Lomo")
        tomate = Ingredient(name="Tomate")
        aji_amarillo = Ingredient(name="Ají amarillo")
        sillao = Ingredient(name="Sillao")
        vinagre = Ingredient(name="Vinagre")
        papa_amarilla = Ingredient(name="Papa amarilla")
        aceite_vegetal = Ingredient(name="Aceite vegetal")
        comino = Ingredient(name="Comino")
        gallina = Ingredient(name="Gallina")
        laurel = Ingredient(name="Laurel")
        leche = Ingredient(name="Leche")
        pecanas = Ingredient(name="Pecanas")
        pan = Ingredient(name="Pan")
        aceitunas = Ingredient(name="Aceitunas")
        huevo = Ingredient(name="Huevo")
        atun = Ingredient(name="Atún")
        mayonesa = Ingredient(name="Mayonesa")
        palta = Ingredient(name="Palta")
        perejil = Ingredient(name="Perejil")

        db.session.add(pescado)
        db.session.add(cebolla)
        db.session.add(aji_limo)
        db.session.add(culantro)
        db.session.add(limon)
        db.session.add(ajo)
        db.session.add(pimienta)
        db.session.add(sal)
        db.session.add(camote)
        db.session.add(choclo)
        db.session.add(lechuga)
        db.session.add(lomo)
        db.session.add(tomate)
        db.session.add(aji_amarillo)
        db.session.add(sillao)
        db.session.add(vinagre)
        db.session.add(papa_amarilla)
        db.session.add(aceite_vegetal)
        db.session.add(comino)
        db.session.add(gallina)
        db.session.add(laurel)
        db.session.add(leche)
        db.session.add(pecanas)
        db.session.add(pan)
        db.session.add(aceitunas)
        db.session.add(huevo)
        db.session.add(atun)
        db.session.add(mayonesa)
        db.session.add(palta)
        db.session.add(perejil)
        db.session.commit()

        # Ingredients of ceviche
        db.session.add(
            DishIngredient(
                dish_id=ceviche.id,
                ingredient_id=pescado.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=ceviche.id,
                ingredient_id=cebolla.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=ceviche.id,
                ingredient_id=aji_limo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=ceviche.id,
                ingredient_id=culantro.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=ceviche.id,
                ingredient_id=limon.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=ceviche.id,
                ingredient_id=ajo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=ceviche.id,
                ingredient_id=pimienta.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=ceviche.id,
                ingredient_id=sal.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=ceviche.id,
                ingredient_id=camote.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=ceviche.id,
                ingredient_id=choclo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=ceviche.id,
                ingredient_id=lechuga.id
            )
        )

        # Ingredients of lomo saltado
        db.session.add(
            DishIngredient(
                dish_id=lomo_saltado.id,
                ingredient_id=lomo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=lomo_saltado.id,
                ingredient_id=aji_limo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=lomo_saltado.id,
                ingredient_id=cebolla.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=lomo_saltado.id,
                ingredient_id=tomate.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=lomo_saltado.id,
                ingredient_id=aji_amarillo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=lomo_saltado.id,
                ingredient_id=sillao.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=lomo_saltado.id,
                ingredient_id=culantro.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=lomo_saltado.id,
                ingredient_id=vinagre.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=lomo_saltado.id,
                ingredient_id=papa_amarilla.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=lomo_saltado.id,
                ingredient_id=aceite_vegetal.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=lomo_saltado.id,
                ingredient_id=ajo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=lomo_saltado.id,
                ingredient_id=comino.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=lomo_saltado.id,
                ingredient_id=pimienta.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=lomo_saltado.id,
                ingredient_id=sal.id
            )
        )

        # Ingredients of ají de gallina
        db.session.add(
            DishIngredient(
                dish_id=aji_de_gallina.id,
                ingredient_id=gallina.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=aji_de_gallina.id,
                ingredient_id=laurel.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=aji_de_gallina.id,
                ingredient_id=aceite_vegetal.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=aji_de_gallina.id,
                ingredient_id=cebolla.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=aji_de_gallina.id,
                ingredient_id=ajo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=aji_de_gallina.id,
                ingredient_id=aji_amarillo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=aji_de_gallina.id,
                ingredient_id=comino.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=aji_de_gallina.id,
                ingredient_id=leche.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=aji_de_gallina.id,
                ingredient_id=pecanas.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=aji_de_gallina.id,
                ingredient_id=pan.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=aji_de_gallina.id,
                ingredient_id=papa_amarilla.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=aji_de_gallina.id,
                ingredient_id=pimienta.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=aji_de_gallina.id,
                ingredient_id=aceitunas.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=aji_de_gallina.id,
                ingredient_id=sal.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=aji_de_gallina.id,
                ingredient_id=huevo.id
            )
        )

        # Ingredients of causa
        db.session.add(
            DishIngredient(
                dish_id=causa.id,
                ingredient_id=papa_amarilla.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=causa.id,
                ingredient_id=aji_amarillo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=causa.id,
                ingredient_id=aceite_vegetal.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=causa.id,
                ingredient_id=limon.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=causa.id,
                ingredient_id=atun.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=causa.id,
                ingredient_id=cebolla.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=causa.id,
                ingredient_id=mayonesa.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=causa.id,
                ingredient_id=culantro.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=causa.id,
                ingredient_id=aji_limo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=causa.id,
                ingredient_id=palta.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=causa.id,
                ingredient_id=sal.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=causa.id,
                ingredient_id=pimienta.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=causa.id,
                ingredient_id=perejil.id
            )
        )

        # Ingredients of pachamanca
        db.session.add(
            DishIngredient(
                dish_id=pachamanca.id,
                ingredient_id=cebolla.id
            )
        )
        db.session.commit()
        # #Order
        # order_ruben_1 = Order(
        #     client_id = ruben.id,
        #     status_id = order_status_pending.id,
        #     grand_total=150.90,
        #     special_instructions="Sin aji"
        #     )
        # order_ruben_2 = Order(
        #     client_id = ruben.id,
        #     status_id = order_status_completed.id,
        #     grand_total=94.50,
        #     special_instructions=""
        #     )
        # order_jhoel_1 = Order(
        #     client_id = jhoel.id,
        #     status_id = order_status_pending.id,
        #     grand_total=240.20,
        #     special_instructions="Sin papa"
        #     )
        # order_jhoel_2 = Order(
        #     client_id = jhoel.id,
        #     status_id = order_status_in_progress.id,
        #     grand_total=30,
        #     special_instructions="Sin cebolla y sin aji"
        #     )
        # db.session.add(order_ruben_1)
        # db.session.add(order_ruben_2)
        # db.session.add(order_jhoel_1)
        # db.session.add(order_jhoel_2)
        # db.session.commit()

        # #OrderDish
        # order_ruben_1_dish_1 = OrderDish(
        #     order_id = order_ruben_1.id,
        #     dish_id = dish_ceviche.id,
        #     unit_price=20.50,
        #     quantity=4
        #     )
        # order_ruben_1_dish_2 = OrderDish(
        #     order_id = order_ruben_1.id,
        #     dish_id = dish_pollo_al_horno.id,
        #     unit_price=30,
        #     quantity=1
        #     )
        # order_ruben_2_dish_1 = OrderDish(
        #     order_id = order_ruben_2.id,
        #     dish_id = dish_pollo_a_la_brasa.id,
        #     unit_price=150,
        #     quantity=2
        #     )
        # order_jhoel_1_dish_1 = OrderDish(
        #     order_id = order_jhoel_1.id,
        #     dish_id = dish_pollo_al_horno.id,
        #     unit_price=15,
        #     quantity=2
        #     )
        # order_jhoel_1_dish_2 = OrderDish(
        #     order_id = order_jhoel_1.id,
        #     dish_id = dish_causa_rellena.id,
        #     unit_price=30,
        #     quantity=4
        #     )
        # order_jhoel_1_dish_3 = OrderDish(
        #     order_id = order_jhoel_1.id,
        #     dish_id = dish_aji_de_gallina.id,
        #     unit_price=15,
        #     quantity=2
        #     )
        # order_jhoel_2_dish_1 = OrderDish(
        #     order_id = order_jhoel_2.id,
        #     dish_id = dish_ceviche.id,
        #     unit_price=40,
        #     quantity=1
        #     )
        # db.session.add(order_ruben_1_dish_1)
        # db.session.add(order_ruben_1_dish_2)
        # db.session.add(order_ruben_2_dish_1)
        # db.session.add(order_jhoel_1_dish_1)
        # db.session.add(order_jhoel_1_dish_2)
        # db.session.add(order_jhoel_1_dish_3)
        # db.session.add(order_jhoel_2_dish_1)
        # db.session.commit()
        
        return (""), 204
