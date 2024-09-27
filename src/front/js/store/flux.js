import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
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
			ingredients:[],
			imageUrl:"",
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
			getIngredients: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/ingredients`, {
						headers:{
							"Access-Control-Allow-Origin": "*",
							"Authorization": `Bearer ${localStorage.getItem("token")}`,
							"Content-Type": "application/json"
						}
					});
					const data = await response.json();
					if (response.status === 200){
						await setStore({ ingredients: data })
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
			createDish: async (dish) => {
				try {
					dish.price = parseFloat(dish.price)
					dish.discount_percentage = parseFloat(dish.discount_percentage)
					dish.cooking_time = parseInt(dish.cooking_time)
					dish.quantity = parseInt(dish.quantity)
					dish.image_url = (dish.image_url || "");
					const response = await fetch(`${process.env.BACKEND_URL}/dishes`, {
						method: 'POST',
						body: JSON.stringify(dish),
						headers:{
							"Access-Control-Allow-Origin": "*",
							"Authorization": `Bearer ${localStorage.getItem("token")}`,
							"Content-Type": "application/json"
						}
					});

					const data = await response.json();

					if (response.status === 201){
						const store = getStore()
						let listDishes = [];
						listDishes = store.dishes;
						listDishes.push(data)
						await setStore({ dishes: listDishes })
						Swal.fire({
							icon: "success",
							title: "Hecho",
							text: "Plato creado!",
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

			editDish: async (dish) => {
				try {
					dish.price = parseFloat(dish.price)
					dish.discount_percentage = parseFloat(dish.discount_percentage)
					dish.cooking_time = parseInt(dish.cooking_time)
					dish.quantity = parseInt(dish.quantity)
					dish.image_url = (dish.image_url || "");
					const response = await fetch(`${process.env.BACKEND_URL}/dishes/${dish.id}`, {
						method: 'PUT',
						body: JSON.stringify(dish),
						headers:{
							"Access-Control-Allow-Origin": "*",
							"Authorization": `Bearer ${localStorage.getItem("token")}`,
							"Content-Type": "application/json"
						}
					});

					const data = await response.json();

					if (response.status === 200){
						const store = getStore()
						let listDishes = [];
						listDishes = store.dishes;
						const objIndex = listDishes.findIndex(obj => obj.id == data.id);
						listDishes[objIndex] = data
						await setStore({ dishes: listDishes })
						Swal.fire({
							icon: "success",
							title: "Hecho",
							text: "Plato editado!",
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
					if (response.status === 200){
						const data = await response.json();
						await setStore({ dataUsersById: data });
						Swal.fire({
							icon: "success",
							title: "Hecho",
							text: "Perfil actualizado!",
						});
					} else {
						Swal.fire({
							icon: "error",
							title: "Error",
							text: data.message,
						});
					}



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
				
			  },
			totalPrice: () => {
				const store = getStore();
				const total = store.list.reduce((total,product)=>total + product.price * product.quantity,0)
				return total.toFixed(2);
				
			},
			deleteDish : (id) => {
				const store = getStore();
				const newtransitory = store.list.filter((product) =>
					product.id !== id
				  )
				setStore({list: newtransitory})
				
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
						dishes: store.list.map(x => { return { ...x, unit_price: x.price } }),
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

			login: async (credentials, showModal=true) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
						method: 'POST',
						body: JSON.stringify(credentials),
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*'
						},	
					})

					const data = await response.json()

					if (response.status === 200) {
						localStorage.setItem("token", data.access_token);
						if (showModal) {
							Swal.fire({
								icon: "success",
								title: "Bienvenido"
							});
						}
					} else {
						Swal.fire({
							icon: "error",
							title: "Error",
							text: data.message,
						});
					}
				} catch (e) {
					console.error("Error:", e);
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
			uploadImage: async (e) => {
				try {
					const files = e.target.files;
					const data = new FormData();
					data.append("file", files[0])
					data.append("upload_preset",process.env.CLOUDINARY_PRESET_NAME)

					const response = await fetch(`${process.env.CLOUDINARY_URL}`, {
						method: 'POST',
						body: data
					});

					const file = await response.json()
					setStore({imageUrl:file.secure_url})

				} catch (err) {
					console.error("Error:", err);
					return false
				}
			},
		},
	}
};

export default getState;

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
db.session.add(masa_wantan)
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
