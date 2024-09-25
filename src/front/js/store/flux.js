import Swal from 'sweetalert2'

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			roles: Object.freeze({ 
				CLIENT :1,
				CHEF :2,
				ADMIN :3
			}),
			dataAditionalById: [],
			list : [],
			listCart : [],
			orderDish: [],
			order:[],
			dishes: [],
			dishSelected: {},
			dataDishesById: [],
			dataUsers: [],
			dataUsersById: [],
			dataOrders: [],
			dataOrdersById: [],
			users: [],
			employees: [],
			clients: [],
			userData: [],
			btnaditional:false,
			extras:[],
			modalExtras:0,
			ingredients:""
		},
		actions: {
			
			logout: async() =>{
				localStorage.removeItem("token");
				setStore({dataUsersById: []})
			},
			showExtrasDetail: async(id) =>{
				if(id>0){
					await getActions().getAditionalsById(id);
				}
			},
			getDishes: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/dishes`, {
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
			getDishById: async (id) => {
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/dishes/${id}`,{
						headers:{
							"Access-Control-Allow-Origin": "*",
							"Authorization": `Bearer ${localStorage.getItem("token")}`,
        					"Content-Type": "application/json"
						}
					})

					const data = await response.json();
					if (response.status === 200){
						await setStore({ dishSelected: data })
					}
				} catch (e){
					console.error("Error:", e);
				}
			},
			updateListCart: (newList) => {
				setStore({ list: newList });
			},
			getExtrasByDishId: async (id) => {
				try{
					let response = await fetch(`${process.env.BACKEND_URL}/dishes/${id}/extras`,{
						headers:{
							"Access-Control-Allow-Origin": "*",
							"Authorization": `Bearer ${localStorage.getItem("token")}`,
        					"Content-Type": "application/json"
						}
					})

					const data = await response.json();
					if (response.status === 200){
						await setStore({ extras: data })
					}
				}catch (e){
					console.error("Error al traer el usuario", e)
				}
			},
			getDishesById: async (id) => {
				const store = getStore()
				if(store.dishes){
					try {
						let response = await fetch(`${process.env.BACKEND_URL}/dishes/${id}`,{
							headers:{
								"Access-Control-Allow-Origin": "*",
								"Authorization": `Bearer ${localStorage.getItem("token")}`,
								"Content-Type": "application/json"
							}
						})
	
						let data = await response.json()

						if(response.status == 201){
							await setStore({dataDishesById: data})
							console.log(store.dataDishesById)
						} 
	
					}catch (e){
						console.error("Error al traer los Dishes", e)
					}
				} else {
					console.log("Dishes complete")
				}
			},

			getUsers: async () => {
				const store = getStore()

				try{
					let response = await fetch(`${process.env.BACKEND_URL}/users`,{
						headers:{
							"Access-Control-Allow-Origin": "*",
							"Authorization": `Bearer ${localStorage.getItem("token")}`,
        					"Content-Type": "application/json"
						}
					})

					if(!response.ok){
						console.log("Hubo un error trayendo los usuarios")
					}
					let data = await response.json()
					setStore({dataUsers: data})
				}catch (e){
					console.error("Error al traer usuarios", e)
				}
			},

			getUsersById: async (id) => {

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
			
			logoRefresh: () => {
				window.location.reload();
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
				
			  },
			totalPrice: () => {
				const store = getStore();
				const total = store.list.reduce((total,product)=>total + product.price * product.quantity,0)
				return total.toFixed(2);
				
			},
			deleteDish : (id) => {
				const store = getStore();
				const newtransitory = store.list.filter((product) =>
					product.dish_id !== id
				  )
				setStore({list: newtransitory})
				
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
						setStore({...getStore(), order: addNote })
					
				}catch(e){
					console.error(e);
					
				}
			},

			orders: async () => {
				try{
					let response = await fetch(`${process.env.BACKEND_URL}/orders`,{
						headers:{
							"Access-Control-Allow-Origin": "*",
							"Authorization": `Bearer ${localStorage.getItem("token")}`,
        					"Content-Type": "application/json"
						}
					})

					if(!response.ok){
						console.log("Ocurrio un error al traer la data orders")
					}

					let data = await response.json()
					setStore({dataOrders: data})
					console.log(data)

				}catch (e){
					console.error(e)
				}
			},


			getOrdersById: async (id) => {

				try{
					let response = await fetch(`${process.env.BACKEND_URL}/orders/${id}`,{
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
					setStore({dataOrdersById: data})
				}catch (e){
					console.error("Error al traer la orden del usuario", e)
				}
			},

			updateOrderStatus: async (id, newStatus) => {
				try{
					const response = await fetch(`${process.env.BACKEND_URL}/orders/${id}/update`,{
						method: "PUT",
                        headers:{
							"Access-Control-Allow-Origin": "*",
							"Authorization": `Bearer ${localStorage.getItem("token")}`,
        					"Content-Type": "application/json"
						},
                        body: JSON.stringify({
                            status_id: newStatus
                        })
					})

					if(!response.ok){
						console.log("Hubo un error editando el id "+id)
					}
					const data = await response.json();
                    console.log("Pedido actualizado con éxito", data);
					setStore(prevStore => ({...prevStore, dataOrdersById: data}));

				}catch (e){
					console.error("Error al editar orden", e)
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
				setBtnAdicional: async () => {
					const store = getStore();
					setStore({ btnaditional: !store.btnaditional });
				},
				getAditionalsById: async (id) => {
					try{
						let response = await fetch(`${process.env.BACKEND_URL}/diches/${id}/extras`,{
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
						setStore({ dataAditionalById: data })
					}catch (e){
						console.error("Error al traer el usuario", e)
					}
				},
			getUsers: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/users/`, {
						headers:{
							"Access-Control-Allow-Origin": "*",
							"Authorization": `Bearer ${localStorage.getItem("token")}`,
							"Content-Type": "application/json"
						}
					});
					const data = await response.json();
					if (response.status === 200){

						await setStore({ users: data })
						const employees = data.filter(user => user.role_id ==2 || user.role_id ==3)
						const clients = data.filter(user => user.role_id ==1)
						await setStore({ employees: employees })
						await setStore({ clients: clients })
					}
				} catch (err) {
					console.error("Error:", err);
				}
			},
			getUserById: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/users/${id}`, {
						headers:{
							"Access-Control-Allow-Origin": "*",
							"Authorization": `Bearer ${localStorage.getItem("token")}`,
							"Content-Type": "application/json"
						}
					});
					const data = await response.json();
					if (response.status === 200){
						await setStore({ userData: data })
					}
				} catch (err) {
					console.error("Error:", err);
				}
			},
			createEmployee: async (employee) => {
				try {
					employee.role_id = parseInt(employee.role_id)
					employee.is_active = (employee.is_active === 'true');
					const response = await fetch(`${process.env.BACKEND_URL}/users`, {
						method: 'POST',
						body: JSON.stringify(employee),
						headers:{
							"Access-Control-Allow-Origin": "*",
							"Authorization": `Bearer ${localStorage.getItem("token")}`,
							"Content-Type": "application/json"
						}
					});

					const data = await response.json();

					if (response.status === 201){
						const store = getStore()
						let listEmployees = [];
						listEmployees = store.employees;
						listEmployees.push(data)
						await setStore({ employees: listEmployees })
						Swal.fire({
							icon: "success",
							title: "Hecho",
							text: "Empleado creado!",
						});
						return true
					} else {
						Swal.fire({
							icon: "error",
							title: "Error",
							text: data.message,
						});
						return false
					}

				} catch (err) {
					console.error("Error:", err);
					return false
				}
			},
			editUser: async (user) => {
				try {
					user.role_id = parseInt(user.role_id)
					user.is_active = (user.is_active === 'true');
					user.profile_picture_url = (user.profile_picture_url || "");
					const response = await fetch(`${process.env.BACKEND_URL}/users/${user.id}`, {
						method: 'PUT',
						body: JSON.stringify(user),
						headers:{
							"Access-Control-Allow-Origin": "*",
							"Authorization": `Bearer ${localStorage.getItem("token")}`,
							"Content-Type": "application/json"
						}
					});

					const data = await response.json();

					if (response.status === 200){
						const store = getStore()
						let listUsers = [];
						listUsers = store.users;
						const objIndex = listUsers.findIndex(obj => obj.id == data.id);
						listUsers[objIndex] = data
						await setStore({ users: listUsers })
						const employees = listUsers.filter(user => user.role_id ==2 || user.role_id ==3)
						const clients = listUsers.filter(user => user.role_id ==1)
						await setStore({ employees: employees })
						await setStore({ clients: clients })
						Swal.fire({
							icon: "success",
							title: "Hecho",
							text: "Usuario editado!",
						});
						return true
					} else {
						Swal.fire({
							icon: "error",
							title: "Error",
							text: data.message,
						});
						return false
					}

				} catch (err) {
					console.error("Error:", err);
					return false
				}
			},
			deleteUser: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/users/${id}`, {
						method: 'DELETE',
						headers:{
							"Access-Control-Allow-Origin": "*",
							"Authorization": `Bearer ${localStorage.getItem("token")}`,
							"Content-Type": "application/json"
						}
					});

					if (response.status === 200){
						const store = getStore()
						let listUsers = [];
						listUsers = store.users;
						const objIndex = listUsers.findIndex(obj => obj.id == id);
						if (objIndex > -1) { // only splice array when item is found
							listUsers.splice(objIndex, 1); // 2nd parameter means remove one item only
						}
						await setStore({ users: listUsers })
						const employees = listUsers.filter(user => user.role_id ==2 || user.role_id ==3)
						const clients = listUsers.filter(user => user.role_id ==1)
						await setStore({ employees: employees })
						await setStore({ clients: clients })
						Swal.fire({
							icon: "success",
							title: "Hecho",
							text: "Usuario eliminado!",
						});
						return true
					} else {
						Swal.fire({
							icon: "error",
							title: "Error",
							text: data.message,
						});
						return false
					}

				} catch (err) {
					console.error("Error:", err);
					return false
				}
			},
		},
	}
};

export default getState;
