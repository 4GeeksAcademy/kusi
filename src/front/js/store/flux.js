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
			list : [
				{
					"dish_id": 1,
					// "name": "nameproduct con papas fritas y arroz y platano ",
					"unit_price": 30,
					"quantity": 1
				},
				{
					"dish_id": 2,
					// "name": "nameproduct con papas fritas",
					"unit_price": 60,
					"quantity": 2
				},
				{
					"dish_id": 3,
					// "name": "papas fritas y arroz y platano combinados",
					"unit_price": 80,
					"quantity": 1
				} 
			],

			orderDish: [],
			order:[],
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
			  ]
		},
		actions: {
			// Use getActions to call a function within a fuction
			logoRefresh: () => {
				window.location.reload();
			  },


			Login: async (user) => {
				const store = getStore();
				try{
					
					let resp = await fetch(process.env.BACKEND_URL + "/auth/login", {
						method: 'POST',
						body: JSON.stringify(user),
						headers: {
							'Content-Type': 'application/json',
						  },	
					})
					let data = await resp.json()

					if (data) {
						localStorage.setItem("token" , data)
						localStorage.setItem("email" , user.email)
						
						
					}
					else {
						Swal.fire("Oh no!", `Credenciales inválidas`, "error");
					}
					
				}catch(error){
					console.log("Error loading message from backend ", error)
				}
			},


			SignUp: async (newuser) => {
				const store = getStore();
				try{
					
					let resp = await fetch(process.env.BACKEND_URL + "/auth/signup", {
						method: 'POST',
						body: JSON.stringify(newuser),
						headers: {
							'Content-Type': 'application/json',
						  },	
					})
					let data = await resp.json()

					if (data) {
						Swal.fire("Usuario creado!", `Se registró satisfactoriamente`, "error");
					}
					else {
						Swal.fire("Oh no!", ``, "error");
					}
					
				}catch(error){
					console.log("Error loading message from backend ", error)
				}
			},

			incrementDish : (id) => {
				const store = getStore();
				const transitory = store.list.find(product =>
					product.dish_id === id)
					  if(transitory){ 
						getActions().changePrice(id,transitory.quantity+1,transitory.unit_price)
					  }
			},

			decrementDish : (id) => {
				const store = getStore();
				const transitory = store.list.find(product =>
					product.dish_id === id && product.quantity>1)
						if(transitory){ 
							getActions().changePrice(id,transitory.quantity-1,transitory.unit_price)
				 	 }
			  },

			changePrice : (id,quantity) => {
				const store = getStore();
				const transitorylist = store.list.map((product) =>
					product.dish_id === id
					  ? { ...product, quantity: quantity } 
					  : product
				  )
				setStore({list: transitorylist})
				console.log(store.list);
				
			  },

			totalPrice: () => {
				const store = getStore();
				const total = store.list.reduce((total,product)=>total + product.unit_price * product.quantity,0)
				return total.toFixed(2);
				
			},
			
			  

			deleteDish : (id) => {
				const store = getStore();
				const newtransitory = store.list.filter((product) =>
					product.dish_id !== id
				  )
				setStore({list: newtransitory})
				console.log(store.list);
				
			},

			btnContinuar : async (instructionsnote) => {

				
					const store = getStore();
					let token = localStorage.getItem("token");
					const addNote = ({
						client_id: "10", //cambiar id del store
						dishes: store.list, 
						special_instructions: instructionsnote, 
						grand_total: getActions().totalPrice()   
					  });


					if (!token) {
						Swal.fire("Hey!", "Primero debes iniciar sesión", "warning");
						return
					 }
					
					try{
						let resp = await fetch(process.env.BACKEND_URL + "/orders", {
							method: 'POST',
							body: JSON.stringify(addNote),
							headers: {
								Authorization:`Bearer ${token}`
							  },	
						})
						let data = await resp.json()
						console.log(addNote);
						setStore({...getStore(), order: addNote })
					
				}catch(e){
					console.error(e);
					
				}
			},



			exampleFunction: () => {
				getActions().changeColor(0, "green");
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
				}

			}
		}
	};

export default getState;
