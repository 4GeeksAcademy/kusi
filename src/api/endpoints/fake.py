from flask_bcrypt import Bcrypt
from flask_restx import Resource
from api.models import (
    db,
    Dish,
    DishIngredient,
    ExtraDish,
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
# 5. ExtraDish
# 6. Ingredient
# 7. DishIngredient
# TODO: Complete the following ones.
# 8. Order
# 9. OrderDish
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
        ExtraDish.query.delete()        
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
        camila = User(
            role_id=client_role.id,
            email="camila@gmail.com",
            name="Camila",
            phone_number="+51 923452876",
            profile_picture_url="https://www.vhv.rs/dpng/d/550-5509255_brawl-stars-wiki-brawl-stars-brawler-brock-hd.png",
            hashed_salted_password=bcrypt.generate_password_hash("camila-passwordcamila-salt").decode("utf-8"),
            salt="jhoel-salt"
        )
        db.session.add(angel)
        db.session.add(manuel)
        db.session.add(rossy)
        db.session.add(ruben)
        db.session.add(jhoel)
        db.session.add(camila)
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

        # Dish
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
        cancha_serrana = Dish(
            id=11,
            name="Cancha serrana",
            description="Maíz tostado en una sartén con un poco de aceite y sal hasta que adquiere un bonito color, casi siempre dorado.",
            image_url="https://www.agraria.pe/imgs/a/lx/cancha-serrana-beneficios-de-incluirla-en-la-dieta-20475.jpg",
            price=5,
            quantity=100
        )
        inca_kola = Dish(
            id=12,
            name="Inca Kola",
            description="Con su distintivo color amarillo dorado y su sabor dulce y exótico, Inca Kola ha logrado convertirse en un ícono nacional y un verdadero símbolo de identidad peruana.",
            image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR4PciVYJze4JLS3P1ew7Slr93iZPHVKQEhw&s",
            price=7,
            quantity=200
        )
        crema_de_rocoto = Dish(
            id=13,
            name="Crema de rocoto",
            description="Deliciosa receta peruana que consta de una salsa a base de rocoto, especias y hierbas aromáticas que le dan un sabor único.",
            image_url="https://i.ytimg.com/vi/A8BLaAizD10/hqdefault.jpg",
            price=5,
            quantity=200
        )
        tallarines_verdes = Dish(
            id=14,
            name="Tallarines verdes",
            description="La salsa verde es nuestro pesto peruano, adaptado a ingredientes que se usaban y usan comunmente en Perú.",
            image_url="https://assets.tastemadecdn.net/images/225ba1/43b36a4db5a71cba84bb/ba6d44.jpg",
            price=45,
            quantity=50,
            cooking_time=45
        )
        papa_a_la_huancaina = Dish(
            id=15,
            name="Papa a la huancaina",
            description="",
            image_url="https://tofuu.getjusto.com/orioneat-local/resized2/3HrMzCyKfs5FQ99mf-1400-x.webp",
            price=29,
            quantity=100,
            cooking_time=30,
            discount_percentage=10
        )
        seco_de_cabrito = Dish(
            id=16,
            name="Seco de Cabrito",
            description="Un plato típico del norte de Perú que consiste en carne de cabrito guisada con culantro y cerveza, acompañado de yuca y frijoles.",
            image_url="https://ojo.pe/resizer/EpxYmy1s3pTq692uFWpn0yGp2ng=/580x330/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/QX4YGUICI5AHZI44HAKLU73EX4.jpg",
            price=45,
            cooking_time=90,
            quantity=20
        )
        sarsa_criolla = Dish(
            id=17,
            name="Sarsa Criolla",
            description="Es el acompañante clásico de muchos platos de la gastronomía peruana.",
            image_url="https://jameaperu.com/wp-content/uploads/2018/07/sarsa-criolla_700x465.jpg",
            price=5,
            cooking_time=10,
            quantity=100
        )
        cau_cau = Dish(
            id=19,
            name="Cau Cau",
            description="Un guiso de mondongo con papas y hierbas aromáticas, servido con arroz.",
            image_url="https://peru.info/archivos/publicacion/96-imagen-15972012020.jpg",
            price=27,
            cooking_time=60,
            quantity=20
        )
        arroz_blanco = Dish(
            id=20,
            name="Arroz Blanco",
            description="El acompañamiento ideal para cualquier plato principal.",
            image_url="https://www.recetasnestle.com.do/sites/default/files/styles/recipe_detail_mobile/public/srh_recipes/6a98b4c32d678925047bf495f5731d23.webp?itok=UbiVk74q",
            price=4,
            cooking_time=20,
            quantity=50
        )
        carapulcra = Dish(
            id=21,
            name="Carapulcra",
            description="Estofado tradicional peruano a base de papas secas y carne, cocido con maní y ajíes.",
            image_url="https://imgmedia.wapa.pe/650x368/wapa/migration/imagen/2019/07/04/noticia-1562251851-portada-carapulcra-con-sopa-seca.png",
            price=30,
            cooking_time=90,
            quantity=18
        )
        yuca_frita = Dish(
            id=22,
            name="Yuca Frita",
            description="Yuca frita crujiente, perfecta para acompañar platos tradicionales.",
            image_url="https://www.comidastipicasperuanas.com/wp-content/uploads/2022/05/Receta-de-yuca-frita.jpg",
            price=7,
            cooking_time=15,
            quantity=40
        )
        olluquito_charqui = Dish(
            id=23,
            name="Olluquito con Charqui",
            description="Un plato tradicional a base de olluco, un tubérculo andino, y charqui (carne seca de llama o res).",
            image_url="https://recetaculinaria.com/wp-content/uploads/olluquito-con-charqui-768x432.jpg",
            price=26,
            cooking_time=50,
            quantity=30
        )
        arroz_con_pato = Dish(
            id=24,
            name="Arroz con Pato",
            description="Arroz cocido con cilantro, cerveza negra y un delicioso pato tierno.",
            image_url="https://comidaperuana.online/wp-content/uploads/2022/07/arroz-con-pato-1-768x513.webp",
            price=40,
            cooking_time=120,
            quantity=25
        )
        rocoto_relleno = Dish(
            id=25,
            name="Rocoto Relleno",
            description="Delicioso rocoto arequipeño relleno de carne molida, pasas y queso, horneado a la perfección.",
            image_url="https://patasca.net/wp-content/uploads/2021/10/rocoto-relleno.jpg",
            price=28,
            cooking_time=60,
            quantity=40
        )
        arroz_chaufa = Dish(
            id=26,
            name="Arroz Chaufa",
            description="Arroz frito al estilo chino-peruano, preparado con pollo, huevo y cebolla china.",
            image_url="https://micomidaperuana.com/ezoimgfmt/i0.wp.com/micomidaperuana.com/wp-content/uploads/2019/05/Arroz-chaufa.jpg?resize=768%2C512&ssl=1&ezimgfmt=ngcb1/notWebP",
            price=20,
            cooking_time=30,
            quantity=50
        )
        tequeños = Dish(
            id=27,
            name="Tequeños",
            description="Deliciosos bocados de masa rellenos de queso, perfectos para compartir.",
            image_url="https://1.bp.blogspot.com/-a431x4feOBw/V_LQfuV9DFI/AAAAAAAABKs/-1xfDbLHuhckYPvg9ozFv0qejud5gcHCACLcB/s640/tequenos.jpg",
            price=15,
            cooking_time=25,
            quantity=40
        )
        sopa_minuta = Dish(
            id=28,
            name="Sopa a la Minuta",
            description="Sopa espesa con trozos de carne, verduras y fideos, ideal para un día frío.",
            image_url="https://recetascocinaperuana.com/wp-content/uploads/2020/08/sopa-a-la-minuta.jpg",
            price=18,
            cooking_time=60,
            quantity=50
        )
        pan = Dish(
            id=29,
            name="Pan",
            description="Pan fresco, perfecto para acompañar sopas y guisos.",
            image_url="https://poramoralhorno.com/wp-content/uploads/2020/11/20200727_134403-768x373.jpg",
            price=4,
            cooking_time=10,
            quantity=100
        )
        arroz_con_mariscos = Dish(
            id=30,
            name="Arroz con Mariscos",
            description="Arroz cocido con una variedad de mariscos y especias, servido con salsa de ají.",
            image_url="https://lechedetigre.net/wp-content/uploads/2022/12/Arroz-con-Mariscos-Receta-Peruana.jpg",
            price=35,
            cooking_time=50,
            quantity=50
        )
        papa_rellena = Dish(
            id=31,
            name="Papa Rellena",
            description="Papa hervida y rellena con carne molida, cebolla, ají, huevo duro, y aceitunas. Luego se fríe.",
            image_url="https://blog.redbus.pe/wp-content/uploads/2020/04/noticia-1575907744-papa-rellena-e1587762159322-696x372.png",
            price=25,
            cooking_time=40,
            quantity=30
        )
        ensalada_rusa = Dish(
            id=32,
            name="Ensalada Rusa",
            description="Mezcla de papas, zanahorias, arvejas y mayonesa.",
            image_url="https://mccormick.widen.net/content/yseerqyqia/jpeg/Ensalada_Rusa_2000x1125.jpg?crop=true&anchor=438,0&q=80&color=ffffffff&u=u0bb0o&w=1125&h=1125",
            price=10,
            cooking_time=15,
            quantity=50
        )
        arroz_tapado = Dish(
            id=33,
            name="Arroz Tapado",
            description="Arroz blanco con una capa de carne molida, aceitunas, pasas, huevo duro y plátano frito.",
            image_url="https://www.deliciosi.com/images/1700/1748/arroz-tapado-665.webp",
            price=20,
            cooking_time=30,
            quantity=25
        )
        mondonguito_italiana = Dish(
            id=35,
            name="Mondonguito a la Italiana",
            description="Mondongo cocido con papas, zanahorias y arvejas, en un aderezo con salsa de tomate y vino.",
            image_url="https://recetinas.com/wp-content/uploads/2018/05/mondongo-a-la-italiana-720x480.jpg",
            price=22,
            cooking_time=50,
            quantity=20
        )
        puca_picante = Dish(
            id=36,
            name="Puca Picante",
            description="Tradicional plato ayacuchano a base de papas, maní, beterraga, ají panca y carne de cerdo.",
            image_url="https://origin.cronosmedia.glr.pe/large/2023/02/27/lg_63fcc33d9c7ca8355623c0a3.jpg",
            price=18,
            cooking_time=40,
            quantity=30
        )
        chanfainita = Dish(
            id=37,
            name="Chanfainita",
            description="Plato tradicional peruano a base de bofe de res cocido con papas y aderezado con ají panca.",
            image_url="https://www.recetasnestle.com.pe/sites/default/files/styles/recipe_detail_mobile/public/srh_recipes/c6fc11f68ec8776ef5ca1868e9c11b25.webp?itok=0rSiVyWf",
            price=18,
            cooking_time=60,
            quantity=20
        )
        pure_de_papa = Dish(
            id=38,
            name="Puré de Papa",
            description="Papas cocidas y machacadas, mezcladas con mantequilla y leche.",
            image_url="https://i.ytimg.com/vi/YBsJZ7umVno/maxresdefault.jpg",
            price=10,
            cooking_time=25,
            quantity=40
        )
        quinua = Dish(
            id=39,
            name="Quinua",
            description="Superalimento andino, cocido y acompañado con vegetales y especias.",
            image_url="https://comidasperuanas.net/wp-content/uploads/2020/12/Quinua-con-pollo.webp",
            price=15,
            cooking_time=30,
            quantity=25
        )
        ocopa = Dish(
            id=40,
            name="Ocopa",
            description="Papa sancochada bañada en salsa de ocopa hecha con huacatay, maní, y ají amarillo.",
            image_url="https://i.ytimg.com/vi/IIfkUnKHmBk/maxresdefault.jpg",
            price=22,
            cooking_time=40,
            quantity=30
        )
        patita_con_mani = Dish(
            id=41,
            name="Patita con Maní",
            description="Guiso hecho a base de patitas de cerdo y una salsa de maní, acompañada de yuca.",
            image_url="https://jameaperu.com/wp-content/uploads/2020/03/patita-con-mani_700x465.jpg",
            price=20,
            cooking_time=90,
            quantity=15
        )
        leche_de_tigre = Dish(
            id=42,
            name="Leche de Tigre",
            description="Jugo resultante del ceviche, cargado de sabores de limón, ají y pescado.",
            image_url="https://1.bp.blogspot.com/-2c2xzlQULMs/YKwopsAYGiI/AAAAAAAAN8Y/zJSrBXR5nTgsuK1u00Ls_K2hOi2Vu6GcACLcBGAsYHQ/s706/Leche-de-tigre.jpg",
            price=12,
            cooking_time=15,
            quantity=50
        )
        jalea_mixta = Dish(
            id=43,
            name="Jalea Mixta",
            description="Plato marino compuesto por trozos de pescado frito, acompañado de mariscos como calamar, camarón y conchas.",
            image_url="https://quechuaschicken.com/wp-content/uploads/2023/02/41F90A77-1B45-43FB-9973-820F0FB3275F-scaled.jpeg",
            price=35,
            cooking_time=50,
            quantity=20
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
        db.session.add(cancha_serrana)
        db.session.add(inca_kola)
        db.session.add(crema_de_rocoto)
        db.session.add(tallarines_verdes)
        db.session.add(papa_a_la_huancaina)
        db.session.add(seco_de_cabrito)
        db.session.add(sarsa_criolla)
        db.session.add(cau_cau)
        db.session.add(arroz_blanco)
        db.session.add(carapulcra)
        db.session.add(yuca_frita)
        db.session.add(olluquito_charqui)
        db.session.add(arroz_con_pato)
        db.session.add(rocoto_relleno)
        db.session.add(arroz_chaufa)
        db.session.add(tequeños)
        db.session.add(sopa_minuta)
        db.session.add(pan)
        db.session.add(arroz_con_mariscos)
        db.session.add(papa_rellena)
        db.session.add(ensalada_rusa)
        db.session.add(arroz_tapado)
        db.session.add(mondonguito_italiana)
        db.session.add(puca_picante)
        db.session.add(chanfainita)
        db.session.add(pure_de_papa)
        db.session.add(quinua)
        db.session.add(ocopa)
        db.session.add(patita_con_mani)
        db.session.add(leche_de_tigre)
        db.session.add(jalea_mixta)

        db.session.commit()

        # ExtraDish
        db.session.add(
            ExtraDish(
                dish_id=ceviche.id,
                extra_id=cancha_serrana.id
            )
        )
        db.session.add(
            ExtraDish(
                dish_id=ceviche.id,
                extra_id=inca_kola.id
            )
        )
        db.session.add(
            ExtraDish(
                dish_id=ceviche.id,
                extra_id=crema_de_rocoto.id
            )
        )

        db.session.add(
            ExtraDish(
                dish_id=tallarines_verdes.id,
                extra_id=papa_a_la_huancaina.id
            )
        )

        db.session.add(
            ExtraDish(
                dish_id=seco_de_cabrito.id,
                extra_id=sarsa_criolla.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=cau_cau.id,
            extra_id=arroz_blanco.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=cau_cau.id,
            extra_id=sarsa_criolla.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=carapulcra.id,
            extra_id=sarsa_criolla.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=carapulcra.id,
            extra_id=yuca_frita.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=olluquito_charqui.id,
            extra_id=sarsa_criolla.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=arroz_con_pato.id,
            extra_id=sarsa_criolla.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=rocoto_relleno.id,
            extra_id=inca_kola.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=rocoto_relleno.id,
            extra_id=yuca_frita.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=arroz_chaufa.id,
            extra_id=tequeños.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=arroz_chaufa.id,
            extra_id=inca_kola.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=sopa_minuta.id,
            extra_id=pan.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=arroz_con_mariscos.id,
            extra_id=inca_kola.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=papa_rellena.id,
            extra_id=sarsa_criolla.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=papa_rellena.id,
            extra_id=inca_kola.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=arroz_tapado.id,
            extra_id=sarsa_criolla.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=arroz_tapado.id,
            extra_id=inca_kola.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=ensalada_rusa.id,
            extra_id=inca_kola.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=mondonguito_italiana.id,
            extra_id=sarsa_criolla.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=mondonguito_italiana.id,
            extra_id=inca_kola.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=puca_picante.id,
            extra_id=sarsa_criolla.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=puca_picante.id,
            extra_id=inca_kola.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=chanfainita.id,
            extra_id=sarsa_criolla.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=chanfainita.id,
            extra_id=inca_kola.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=.id,
            extra_id=sarsa_criolla.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=chanfainita.id,
            extra_id=papa_a_la_huancaina.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=pure_de_papa.id,
            extra_id=sarsa_criolla.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=pure_de_papa.id,
            extra_id=inca_kola.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=quinua.id,
            extra_id=sarsa_criolla.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=quinua.id,
            extra_id=inca_kola.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=ocopa.id,
            extra_id=sarsa_criolla.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=ocopa.id,
            extra_id=inca_kola.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=patita_con_mani.id,
            extra_id=sarsa_criolla.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=patita_con_mani.id,
            extra_id=inca_kola.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=leche_de_tigre.id,
            extra_id=inca_kola.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=jalea_mixta.id,
            extra_id=sarsa_criolla.id
            )
        )

        db.session.add(ExtraDish(
            dish_id=jalea_mixta.id,
            extra_id=inca_kola.id
            )
        )


        mariscos = Ingredient(name="Mariscos")
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
        cerdo = Ingredient(name="Cerdo")
        pollo = Ingredient(name="Pollo")
        aji_panca = Ingredient(name="Ají panca")
        chincho = Ingredient(name="Chincho")
        huacatay = Ingredient(name="Huacatay")
        habas = Ingredient(name="Habas")
        papa_huayro = Ingredient(name="Papa huayro")
        yuca = Ingredient(name="Yuca")
        fideos = Ingredient(name="Fideos")
        espinaca = Ingredient(name="Espinaca")
        albahaca = Ingredient(name="Albahaca")
        aceite_de_oliva = Ingredient(name="Aceite de oliva")
        queso = Ingredient(name="Queso")
        nueces = Ingredient(name="Nueces")
        bistec = Ingredient(name="Bistec")
        cabrito = Ingredient(name="Cabrito")
        chicha_de_jora = Ingredient(name="Chicha de jora")
        zapallo_loche = Ingredient(name="Zapallo loche")
        oregano = Ingredient(name="Orégano")
        frejol = Ingredient(name="Frejol")
        tocino = Ingredient(name="Tocino")
        arroz = Ingredient(name="Arroz")
        mondongo = Ingredient(name="Mondongo")
        hierbabuena = Ingredient(name="Hierbabuena")
        papa_blanca = Ingredient(name="Papa blanca")
        palillo = Ingredient(name="Palillo")
        papas_secas = Ingredient(name="Papas secas")
        mani = Ingredient(name="Maní")
        canela = Ingredient(name="Canela")
        olluco = Ingredient(name="Olluco")
        charqui = Ingredient(name="Charqui")
        pato = Ingredient(name="Pato")
        cerveza_negra = Ingredient(name="Cerveza negra")
        rocoto = Ingredient(name="Rocoto")
        carne_molida = Ingredient(name="Carne molida")
        pasas = Ingredient(name="Pasas")
        cebolla_china = Ingredient(name="Cebolla china")
        kion = Ingredient(name="Kion")
        masa_wantan = Ingredient(name="Masa Wantan")
        zanahoria = Ingredient(name="Zanahoria")
        apio = Ingredient(name="Apio")
        carne_res = Ingredient(name="Carne de res")
        arvejas = Ingredient(name="Arvejas")
        beterraga = Ingredient(name="Beterraga")
        plátano_frito = Ingredient(name="Plátano Frito")
        bofe_res = Ingredient(name="Bofe de Res")
        mantequilla = Ingredient(name="Mantequilla")
        calamar = Ingredient(name="Calamar")
        camarones = Ingredient(name="Camarones")
        conchas = Ingredient(name="Conchas")
        patita_cerdo = Ingredient(name="Patita de Cerdo")

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
        db.session.add(cerdo)
        db.session.add(pollo)
        db.session.add(aji_panca)
        db.session.add(chincho)
        db.session.add(huacatay)
        db.session.add(habas)
        db.session.add(papa_huayro)
        db.session.add(yuca)
        db.session.add(fideos)
        db.session.add(espinaca)
        db.session.add(albahaca)
        db.session.add(aceite_de_oliva)
        db.session.add(queso)
        db.session.add(nueces)
        db.session.add(bistec)
        db.session.add(cabrito)
        db.session.add(chicha_de_jora)
        db.session.add(zapallo_loche)
        db.session.add(oregano)
        db.session.add(tocino)
        db.session.add(oregano)
        db.session.add(arroz)
        db.session.add(mondongo)
        db.session.add(papa_blanca)
        db.session.add(hierbabuena)
        db.session.add(palillo)
        db.session.add(papas_secas)
        db.session.add(mani)
        db.session.add(canela)
        db.session.add(olluco)
        db.session.add(charqui)
        db.session.add(pato)
        db.session.add(cerveza_negra)
        db.session.add(rocoto)
        db.session.add(carne_molida)
        db.session.add(pasas)
        db.session.add(cebolla_china)
        db.session.add(kion)
        db.session.add(zanahoria)
        db.session.add(apio)
        db.session.add(carne_res)
        db.session.add(mariscos)
        db.session.add(arvejas)
        db.session.add(beterraga)
        db.session.add(plátano_frito)
        db.session.add(bofe_res)
        db.session.add(mantequilla)
        db.session.add(calamar)
        db.session.add(camarones)
        db.session.add(conchas)
        db.session.add(patita_cerdo)

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
        db.session.add(
            DishIngredient(
                dish_id=pachamanca.id,
                ingredient_id=cerdo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=pachamanca.id,
                ingredient_id=pollo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=pachamanca.id,
                ingredient_id=sal.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=pachamanca.id,
                ingredient_id=pimienta.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=pachamanca.id,
                ingredient_id=comino.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=pachamanca.id,
                ingredient_id=ajo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=pachamanca.id,
                ingredient_id=aji_amarillo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=pachamanca.id,
                ingredient_id=aji_panca.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=pachamanca.id,
                ingredient_id=chincho.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=pachamanca.id,
                ingredient_id=huacatay.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=pachamanca.id,
                ingredient_id=aceite_vegetal.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=pachamanca.id,
                ingredient_id=habas.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=pachamanca.id,
                ingredient_id=camote.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=pachamanca.id,
                ingredient_id=papa_huayro.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=pachamanca.id,
                ingredient_id=choclo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=pachamanca.id,
                ingredient_id=yuca.id
            )
        )

        # Ingredients of tallarines verdes
        db.session.add(
            DishIngredient(
                dish_id=tallarines_verdes.id,
                ingredient_id=fideos.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=tallarines_verdes.id,
                ingredient_id=espinaca.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=tallarines_verdes.id,
                ingredient_id=albahaca.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=tallarines_verdes.id,
                ingredient_id=aceite_de_oliva.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=tallarines_verdes.id,
                ingredient_id=leche.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=tallarines_verdes.id,
                ingredient_id=queso.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=tallarines_verdes.id,
                ingredient_id=cebolla.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=tallarines_verdes.id,
                ingredient_id=nueces.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=tallarines_verdes.id,
                ingredient_id=bistec.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=tallarines_verdes.id,
                ingredient_id=laurel.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=tallarines_verdes.id,
                ingredient_id=ajo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=tallarines_verdes.id,
                ingredient_id=comino.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=tallarines_verdes.id,
                ingredient_id=pimienta.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=tallarines_verdes.id,
                ingredient_id=sal.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=tallarines_verdes.id,
                ingredient_id=pan.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=tallarines_verdes.id,
                ingredient_id=sillao.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=tallarines_verdes.id,
                ingredient_id=aceite_vegetal.id
            )
        )

        # seco_de_cabrito
        db.session.add(
            DishIngredient(
                dish_id=seco_de_cabrito.id,
                ingredient_id=culantro.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=seco_de_cabrito.id,
                ingredient_id=aji_panca.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=seco_de_cabrito.id,
                ingredient_id=ajo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=seco_de_cabrito.id,
                ingredient_id=aji_amarillo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=seco_de_cabrito.id,
                ingredient_id=sal.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=seco_de_cabrito.id,
                ingredient_id=pimienta.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=seco_de_cabrito.id,
                ingredient_id=chicha_de_jora.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=seco_de_cabrito.id,
                ingredient_id=cebolla.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=seco_de_cabrito.id,
                ingredient_id=aceite_vegetal.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=seco_de_cabrito.id,
                ingredient_id=zapallo_loche.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=seco_de_cabrito.id,
                ingredient_id=comino.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=seco_de_cabrito.id,
                ingredient_id=oregano.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=seco_de_cabrito.id,
                ingredient_id=frejol.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=seco_de_cabrito.id,
                ingredient_id=tocino.id
            )
        )

        # sarsa_criolla
        db.session.add(
            DishIngredient(
                dish_id=sarsa_criolla.id,
                ingredient_id=cebolla.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=sarsa_criolla.id,
                ingredient_id=aji_limo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=sarsa_criolla.id,
                ingredient_id=limon.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=sarsa_criolla.id,
                ingredient_id=culantro.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=sarsa_criolla.id,
                ingredient_id=sal.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=sarsa_criolla.id,
                ingredient_id=pimienta.id
            )
        )

        # Caucau
        db.session.add(
            DishIngredient(
                dish_id=cau_cau.id,
                ingredient_id=mondongo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=cau_cau.id,
                ingredient_id=papas.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=cau_cau.id,
                ingredient_id=hierbabuena.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=cau_cau.id,
                ingredient_id=turmeric.id
            )
        )

        # arroz
        db.session.add(
            DishIngredient(
                dish_id=arroz_blanco.id,
                ingredient_id=arroz.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=arroz_blanco.id,
                ingredient_id=ajo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=arroz_blanco.id,
                ingredient_id=aceite_vegetal.id
            )
        )
        

        # carapulcra
        db.session.add(
            DishIngredient(
                dish_id=carapulcra.id,
                ingredient_id=papas_secas.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=carapulcra.id,
                ingredient_id=mani.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=carapulcra.id,
                ingredient_id=cerdo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=carapulcra.id,
                ingredient_id=aji_panca.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=carapulcra.id,
                ingredient_id=ajo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=carapulcra.id,
                ingredient_id=canela.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=carapulcra.id,
                ingredient_id=sal.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=carapulcra.id,
                ingredient_id=comino.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=carapulcra.id,
                ingredient_id=pimienta.id
            )
        )

        #Yuca_Frita
        db.session.add(
            DishIngredient(
                dish_id=yuca_frita.id,
                ingredient_id=yuca.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=yuca_frita.id,
                ingredient_id=sal.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=yuca_frita.id,
                ingredient_id=aceite_vegetal.id
            )
        )

        #Olluquito con charqui
        db.session.add(
            DishIngredient(
                dish_id=olluquito_charqui.id,
                ingredient_id=olluco.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=olluquito_charqui.id,
                ingredient_id=charqui.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=olluquito_charqui.id,
                ingredient_id=aji_panca.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=olluquito_charqui.id,
                ingredient_id=papa_blanca.id
            )
        )


        #Arroz Con Pato
        db.session.add(
            DishIngredient(
                dish_id=arroz_con_pato.id,
                ingredient_id=pato.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=arroz_con_pato.id,
                ingredient_id=arroz.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=arroz_con_pato.id,
                ingredient_id=cerveza_negra.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=arroz_con_pato.id,
                ingredient_id=culantro.id
            )
        )

        #Rocoto Relleno
        db.session.add(
            DishIngredient(
                dish_id=rocoto_relleno.id,
                ingredient_id=rocoto.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=rocoto_relleno.id,
                ingredient_id=carne_molida.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=rocoto_relleno.id,
                ingredient_id=queso.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=rocoto_relleno.id,
                ingredient_id=pasas.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=rocoto_relleno.id,
                ingredient_id=huevo.id
            )
        )

        #Chaufa
        db.session.add(
            DishIngredient(
                dish_id=arroz_chaufa.id,
                ingredient_id=huevo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=arroz_chaufa.id,
                ingredient_id=cebolla_china.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=arroz_chaufa.id,
                ingredient_id=pollo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=arroz_chaufa.id,
                ingredient_id=sillao.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=arroz_chaufa.id,
                ingredient_id=kion.id
            )
        )


        #Tequeños
        db.session.add(
            DishIngredient(
                dish_id=tequeños.id,
                ingredient_id=palta.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=tequeños.id,
                ingredient_id=tomate.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=tequeños.id,
                ingredient_id=sal.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=tequeños.id,
                ingredient_id=limon.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=tequeños.id,
                ingredient_id=masa_wantan.id
            )
        )

        #SOPA A LA MINUTA

        db.session.add(
            DishIngredient(
                dish_id=sopa_minuta.id,
                ingredient_id=carne_res.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=sopa_minuta.id,
                ingredient_id=fideos.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=sopa_minuta.id,
                ingredient_id=zanahoria.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=sopa_minuta.id,
                ingredient_id=apio.id
            )
        )


        #ARROZ CON MARISCOS

        db.session.add(
            DishIngredient(
                dish_id=arroz_con_mariscos.id,
                ingredient_id=arroz.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=arroz_con_mariscos.id,
                ingredient_id=mariscos.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=arroz_con_mariscos.id,
                ingredient_id=aji_limo.id
            )
        )

        # Papa Rellena
        db.session.add(
            DishIngredient(
                dish_id=papa_rellena.id,
                ingredient_id=papa_blanca.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=papa_rellena.id,
                ingredient_id=carne_molida.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=papa_rellena.id,
                ingredient_id=cebolla.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=papa_rellena.id,
                ingredient_id=ajo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=papa_rellena.id,
                ingredient_id=aji_panca.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=papa_rellena.id,
                ingredient_id=huevo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=papa_rellena.id,
                ingredient_id=aceitunas.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=papa_rellena.id,
                ingredient_id=sal.id
            )
        )

        # Arroz Tapado
        db.session.add(
            DishIngredient(
                dish_id=arroz_tapado.id,
                ingredient_id=arroz.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=arroz_tapado.id,
                ingredient_id=carne_molida.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=arroz_tapado.id,
                ingredient_id=cebolla.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=arroz_tapado.id,
                ingredient_id=ajo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=arroz_tapado.id,
                ingredient_id=aceitunas.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=arroz_tapado.id,
                ingredient_id=huevo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=arroz_tapado.id,
                ingredient_id=plátano_frito.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=arroz_tapado.id,
                ingredient_id=sal.id
            )
        )

        # Mondonguito a la Italiana
        db.session.add(
            DishIngredient(
                dish_id=mondonguito_italiana.id,
                ingredient_id=mondongo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=mondonguito_italiana.id,
                ingredient_id=papa_blanca.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=mondonguito_italiana.id,
                ingredient_id=zanahoria.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=mondonguito_italiana.id,
                ingredient_id=arvejas.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=mondonguito_italiana.id,
                ingredient_id=sal.id
            )
        )

        # Puca Picante
        db.session.add(
            DishIngredient(
                dish_id=puca_picante.id,
                ingredient_id=papa_blanca.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=puca_picante.id,
                ingredient_id=cerdo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=puca_picante.id,
                ingredient_id=mani.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=puca_picante.id,
                ingredient_id=beterraga.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=puca_picante.id,
                ingredient_id=aji_panca.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=puca_picante.id,
                ingredient_id=sal.id
            )
        )

        # Ensalada Rusa
        db.session.add(
            DishIngredient(
                dish_id=ensalada_rusa.id,
                ingredient_id=arvejas.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=ensalada_rusa.id,
                ingredient_id=beterraga.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=ensalada_rusa.id,
                ingredient_id=zanahoria.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=ensalada_rusa.id,
                ingredient_id=sal.id
            )
        )

        # Chanfainita
        db.session.add(
            DishIngredient(
                dish_id=chanfainita.id,
                ingredient_id=bofe_res.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=chanfainita.id,
                ingredient_id=papa_blanca.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=chanfainita.id,
                ingredient_id=aji_panca.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=chanfainita.id,
                ingredient_id=ajo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=chanfainita.id,
                ingredient_id=sal.id
            )
        )

        # Puré de Papa
        db.session.add(
            DishIngredient(
                dish_id=pure_de_papa.id,
                ingredient_id=papa_blanca.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=pure_de_papa.id,
                ingredient_id=mantequilla.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=pure_de_papa.id,
                ingredient_id=leche.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=pure_de_papa.id,
                ingredient_id=pollo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=pure_de_papa.id,
                ingredient_id=sal.id
            )
        )

        # Quinua
        db.session.add(
            DishIngredient(
                dish_id=quinua.id,
                ingredient_id=quinua.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=quinua.id,
                ingredient_id=cebolla.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=quinua.id,
                ingredient_id=ajo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=quinua.id,
                ingredient_id=sal.id
            )
        )

        # Ocopa
        db.session.add(
            DishIngredient(
                dish_id=ocopa.id,
                ingredient_id=papa_blanca.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=ocopa.id,
                ingredient_id=huacatay.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=ocopa.id,
                ingredient_id=mani.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=ocopa.id,
                ingredient_id=aji_amarillo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=ocopa.id,
                ingredient_id=sal.id
            )
        )

        # Patita con Maní
        db.session.add(
            DishIngredient(
                dish_id=patita_con_mani.id,
                ingredient_id=patita_cerdo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=patita_con_mani.id,
                ingredient_id=mani.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=patita_con_mani.id,
                ingredient_id=yuca.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=patita_con_mani.id,
                ingredient_id=sal.id
            )
        )

        # Leche de Tigre
        db.session.add(
            DishIngredient(
                dish_id=leche_de_tigre.id,
                ingredient_id=pescado.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=leche_de_tigre.id,
                ingredient_id=limon.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=leche_de_tigre.id,
                ingredient_id=aji_limo.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=leche_de_tigre.id,
                ingredient_id=cebolla.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=leche_de_tigre.id,
                ingredient_id=sal.id
            )
        )

        # Jalea Mixta
        db.session.add(
            DishIngredient(
                dish_id=jalea_mixta.id,
                ingredient_id=pescado.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=jalea_mixta.id,
                ingredient_id=calamar.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=jalea_mixta.id,
                ingredient_id=camarones.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=jalea_mixta.id,
                ingredient_id=conchas.id
            )
        )
        db.session.add(
            DishIngredient(
                dish_id=jalea_mixta.id,
                ingredient_id=sal.id
            )
        )



        db.session.commit()
        
        return (""), 204
