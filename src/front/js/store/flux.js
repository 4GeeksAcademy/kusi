import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			roles: Object.freeze({ 
				CLIENT: 1,
				CHEF: 2,
				ADMIN: 3
			}),
			list : [
			// 	{
            //     id:1,
            //     quantity: 1,
            //     unit_price: 51
            //  },
            // {
            //     id:6,
            //     quantity: 2,
            //     unit_price: 37
 
            // }
			],
			orderDish: [],
			order:[],
			dishes: [],
			dataUsers: [],
			dataUsersById: [],
		},
		actions: {
			
			logout: async() =>{
				localStorage.removeItem("token");
				setStore({dataUsersById: []})
			},
			updateListCart: async(dishes) =>{
				const store = getStore()
				console.log(dishes)
				await setStore({list: dishes})
				console.log(store.list)
			},
			getDishes: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/dishes/`, {
						headers:{
							"Access-Control-Allow-Origin": "*",
							"Authorization": `Bearer ${localStorage.getItem("token")}`,
							"Content-Type": "application/json"
						}
					});
					const data = await response.json();
					if (response.status === 200){
						await setStore({ dishes: data })
					}
				} catch (err) {
					console.error("Error:", err);
				}
			},
			getUsersById: async (id) => {
				const store = getStore()

				try{
					let response = await fetch(`${process.env.BACKEND_URL}/users/${id}`,{
						headers:{
							"Access-Control-Allow-Origin": "*",
							"Authorization": `Bearer ${localStorage.getItem("token")}`,
        					"Content-Type": "application/json"
						}
					})

					if(!response.ok){
						console.log("Hubo un error trayendo el id "+id)
					}
					let data = await response.json()
					setStore({dataUsersById: data})
				}catch (e){
					console.error("Error al traer el usuario", e)
				}
			},
			updateUser: async (userId, newUpdateUser) => {
				const store = getStore();
				try{
					const response = await fetch(`${process.env.BACKEND_URL}/users/${userId}`,{
						method: "PUT",
						headers:{
							"Access-Control-Allow-Origin": "*",
							"Authorization": `Bearer ${localStorage.getItem("token")}`,
        					"Content-Type": "application/json"
						},
						body: JSON.stringify({
							"email": newUpdateUser.email,
							"name": newUpdateUser.name,
							"phone_number": newUpdateUser.phone_number,
							"is_active": newUpdateUser.is_active,
							"profile_picture_url": newUpdateUser.profile_picture_url,
							"password": newUpdateUser.password
						})
					})

					if(!response.ok){
						console.log(`El id ${userId} que intentas editar no existe`)
					}

					const data = await response.json();
                    console.log(data);
					setStore({ dataUsersById: data });

					return data;

				}catch (e) {
                    console.error("Error al actualizar el usuario:", e);
                }
			},
			// Use getActions to call a function within a fuction
			logoRefresh: () => {
				window.location.reload();
			},
			incrementDish : (id) => {
				const store = getStore();
				const transitory = store.list.find(product =>
					product.id === id)
					  if(transitory){ 
						getActions().changePrice(id,transitory.quantity+1,transitory.unit_price)
					  }
			},
			decrementDish : (id) => {
				const store = getStore();
				const transitory = store.list.find(product =>
					product.id === id && product.quantity>1)
						if(transitory){ 
							getActions().changePrice(id,transitory.quantity-1,transitory.unit_price)
				 	 }
			  },
			changePrice : (id,quantity) => {
				const store = getStore();
				const transitorylist = store.list.map((product) =>
					product.id === id
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
					product.id !== id
				  )
				setStore({list: newtransitory})
				console.log(store.list);
				
			},
			btnContinuar : async (instructionsnote) => {
				
					const store = getStore();
					let token = localStorage.getItem("token");
				try{
					if (!token) {
						
						Swal.fire({
							title:"Hey!", 
							text: "Primero debes iniciar sesión",
							icon: "warning",
							confirmButtonColor: "#F44322",
							cancelButtonColor: "#F44322"});
						window.location.href = "/login";
						return
					}

					const addNote = ({
						dishes: store.list, 
						special_instructions: instructionsnote, 
					  });

					
					const resp = await fetch(`${process.env.BACKEND_URL}/orders/validate`, {
							method: 'POST',
							body: JSON.stringify(addNote),
							headers: {
								"Authorization":`Bearer ${token}`,
								"Content-Type": "application/json",
								"Access-Control-Allow-Origin": "*",
							  },	
						})

						if (resp.ok) { 
							if (resp.status === 204) {
							  setStore({ ...getStore(), order: addNote });
							  localStorage.setItem("amount", getActions().totalPrice());
							  localStorage.setItem("order", JSON.stringify(addNote));
							  console.log(store.order);
							  window.location.href = "/paypal";
							} else {
							  let data = await resp.json();
							  console.log(data);
							}

						}else if (resp.status === 422){
							let data = await resp.json();
							await Swal.fire({
								title: "Oh no!", 
								text: data.message, 
								icon: "warning",
							  	confirmButtonColor: "#F44322",
							  	cancelButtonColor: "#F44322"});
							localStorage.removeItem("amount");
							window.location.href = "/shopping-cart";
							return
						}

						else if (resp.status===401){
							localStorage.clear()
							window.location.href = "/login";
							return
							
						}

						else{
							Swal.fire({
								title: "Oh no!", 
								text: data.message, 
								icon: "warning",
							  	confirmButtonColor: "#F44322",
							  	cancelButtonColor: "#F44322"});
						}
						
				}catch(e){
					console.error(e);
					
				}
			},

			createOrder: async () => {
				const store = getStore();
				let order = localStorage.getItem("order");
				localStorage.removeItem("amount");
				let token = localStorage.getItem("token");
				try{
					let resp = await fetch(`${process.env.BACKEND_URL}/orders/`, {
						method: 'POST',
						body: order,
						headers: {
							"Authorization":`Bearer ${token}`,
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*",
						},	
					})
					let data = await resp.json()
					console.log(data);
					localStorage.removeItem("order");
					
					
				}catch(e){
					console.error(e);
					
				}
			},


			recoverPassword: async (email) => {
				try{
					let resp = await fetch(process.env.BACKEND_URL + "/", {
						method: 'POST',
						body: JSON.stringify(email),
					})
					let data = await resp.json()
					console.log(data);					
				}catch(e){
					console.error(e);
					
				}
			},

			sendChat: async (chat) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/ai", {
						method: 'POST',
						body: JSON.stringify({ messages: chat }),
						headers: {
							"Authorization":`Bearer ${localStorage.getItem("token")}`,
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*",
						},
					});
					const data = await resp.json();
					localStorage.setItem("responseBot", data.content);
					return data
				} catch(e) {
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
			}

		},
	}
};

export default getState;
