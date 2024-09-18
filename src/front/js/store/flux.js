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
			order:[]
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
			},
			
		}
	};
};

export default getState;
