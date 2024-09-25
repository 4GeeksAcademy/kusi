import Swal from 'sweetalert2'

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			roles: Object.freeze({ 
				CLIENT :1,
				CHEF :2,
				ADMIN :3
			  }),
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			dishes: [
				{
				  "id": 1,
				  "name": "Ceviche",
				  "description": "Plato tipico de peru con pescado y limon",
				  "image_url": "https://trexperienceperu.com/sites/default/files/2024-05/ceviche.jpg",
				  "price": 30,
				  "discount_percentage": 10,
				  "cooking_time": 15,
				  "quantity": 50,
				  "dish_ingredients": null
				},
				{
				  "id": 2,
				  "name": "Pollo a la brasa",
				  "description": "Plato tipico de peru con pollo al carbon",
				  "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjezA9-4z0byMCywNsi3n3nBDUzsXJW2YaaA&s",
				  "price": 60,
				  "discount_percentage": 5,
				  "cooking_time": 5,
				  "quantity": 20,
				  "dish_ingredients": null
				},
				{
				  "id": 3,
				  "name": "Aji de gallina",
				  "description": "Plato tipico de peru con gallina y aji",
				  "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSWTUO8hei_5TWAQ4lE92JDQwXCCCRbVcxrw&s",
				  "price": 20,
				  "discount_percentage": 15,
				  "cooking_time": 15,
				  "quantity": 80,
				  "dish_ingredients": null
				},
				{
				  "id": 4,
				  "name": "Estafado de carne",
				  "description": "Plato tipico de peru con carne",
				  "image_url": "https://www.recetasnestle.com.pe/sites/default/files/srh_recipes/02d772e59776b9b3566382bbf306f795.jpg",
				  "price": 20,
				  "discount_percentage": 10,
				  "cooking_time": 15,
				  "quantity": 200,
				  "dish_ingredients": null
				},
				{
				  "id": 5,
				  "name": "Arroz con pollo",
				  "description": "Plato tipico de peru con arroz y pollo",
				  "image_url": "https://i.ytimg.com/vi/H6lgxgEWIs8/maxresdefault.jpg",
				  "price": 15,
				  "discount_percentage": 5,
				  "cooking_time": 15,
				  "quantity": 50,
				  "dish_ingredients": null
				},
				{
				  "id": 6,
				  "name": "Causa rellena",
				  "description": "Plato tipico de peru papa y aji amarillo",
				  "image_url": "https://cdn0.recetasgratis.net/es/posts/8/6/2/causa_limena_31268_orig.jpg",
				  "price": 20,
				  "discount_percentage": 10,
				  "cooking_time": 10,
				  "quantity": 120,
				  "dish_ingredients": null
				},
				{
				  "id": 7,
				  "name": "Pollo al horno",
				  "description": "Plato tipico de peru con pollo y salsa",
				  "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5VXgFC1udztiDcPU8A7LAPe4Pt8ZMUUitQ&s",
				  "price": 30,
				  "discount_percentage": 25,
				  "cooking_time": 25,
				  "quantity": 20,
				  "dish_ingredients": null
				}
			  ], 
			  amount: 1,
			  btnaditional: false,
			  cantadicional: 1,
			  adicionales: [
					{
						"id": 11,
						"name": "Cancha serrana",
						"description": "Maíz tostado en una sartén con un poco de aceite y sal hasta que adquiere un bonito color, casi siempre dorado.",
						"image_url": "https://www.agraria.pe/imgs/a/lx/cancha-serrana-beneficios-de-incluirla-en-la-dieta-20475.jpg",
						"price": 5,
						"discount_percentage": null,
						"cooking_time": null,
						"quantity": 100
					  },
					  {
						"id": 12,
						"name": "Inca Kola",
						"description": "Con su distintivo color amarillo dorado y su sabor dulce y exótico, Inca Kola ha logrado convertirse en un ícono nacional y un verdadero símbolo de identidad peruana.",
						"image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR4PciVYJze4JLS3P1ew7Slr93iZPHVKQEhw&s",
						"price": 7,
						"discount_percentage": null,
						"cooking_time": null,
						"quantity": 200
					  },
					  {
						"id": 13,
						"name": "Crema de rocoto",
						"description": "Deliciosa receta peruana que consta de una salsa a base de rocoto, especias y hierbas aromáticas que le dan un sabor único.",
						"image_url": "https://i.ytimg.com/vi/A8BLaAizD10/hqdefault.jpg",
						"price": 5,
						"discount_percentage": null,
						"cooking_time": null,
						"quantity": 200
					  }
				]
		},
		actions: {
			// Use getActions to call a function within a fuction
			logoRefresh: () => {
				window.location.reload();
			},
			login: async (user,showModal=true) => {
				try{
					
					let resp = await fetch(process.env.BACKEND_URL + "/auth/login", {
						method: 'POST',
						body: JSON.stringify(user),
						headers: {
							'Content-Type': 'application/json',
						  },	
					})

					let data = await resp.json()
					
					if(!showModal){

						if (data.access_token) {
							localStorage.setItem("token" , data.access_token)
						}

					} else {

						if(resp.status == 404 || resp.status == 401){
							console.log(data.message)
							Swal.fire({
								icon: "error",
								title: "Error",
								text: "Credenciales invalidas",
							});
						} else if(resp.status == 200){
	
							if (data.access_token) {
								localStorage.setItem("token" , data.access_token)
							}
	
							Swal.fire({
								icon: "success",
								title: "Bienvenido",
								text: "Credenciales validas",
							});
						} else {
							Swal.fire({
								icon: "error",
								title: "Error",
								text: "Error desconocido",
							});
						}
					}

					
				}catch(error){
					console.log("Error: ", error)
				}
			},
			signup: async (user) => {

				try{
					
					let resp = await fetch(process.env.BACKEND_URL + "/auth/signup", {
						method: 'POST',
						body: JSON.stringify(user),
						headers: {
							'Content-Type': 'application/json',
						  },	
					})
					
					let data = await resp.json()

					if(resp.status == 409){
						console.log(data.message)
						Swal.fire({
							icon: "error",
							title: "Error",
							text: "Email ya existe",
						});
					} else if(resp.status == 201){
						localStorage.setItem("user_created" , true)
					} else {
						Swal.fire({
							icon: "error",
							title: "Error",
							text: "Error desconocido",
						});
					}
					
				}catch(error){
					console.log("Error: ", error)
				}
								//reset the global store
				setStore({ demo: demo });
			},
			getDishes: async() =>{
				fetch("https://crispy-guacamole-q77gjxqpwwgwf9v59-3001.app.github.dev/dishes/",{
					method: "GET"
				})
					.then((response)=>response.json())
					.then((data)=>setStore({dishes: data.dishes}))
					.catch((error)=>console.log(error))
				},
				incrementAmount: () => {
					const store = getStore();
					setStore({ amount: store.amount + 1 });
				},
				decrementAmount: () => {
					const store = getStore();
					if (store.amount > 1) {
						setStore({ amount: store.amount - 1 });
					}
				},
				incrementAdicional: () => {
					const store = getStore();
					setStore({ cantadicional: store.cantadicional + 1 });
				},
				decrementAdicional: () => {
					const store = getStore();
					if (store.cantadicional > 1) {
						setStore({ cantadicional: store.cantadicional - 1 });
					}
				},
				setBtnAdicional: () => {
					const store = getStore();
					setStore({ btnaditional: !store.btnaditional });
				},

			}
		}
	};

export default getState;
