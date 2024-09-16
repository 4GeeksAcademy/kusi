import Swal from 'sweetalert2'

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
					"id": 1,
					"name": "nameproduct con papas fritas y arroz y platano ",
					"price": 40,
					"quantity": 1
				},
				{
					"id": 2,
					"name": "nameproduct con papas fritas",
					"price": 35,
					"quantity": 2
				},
				{
					"id": 3,
					"name": "papas fritas y arroz y platano combinados",
					"price": 30,
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
					
					let resp = await fetch(process.env.BACKEND_URL + "/", {
						method: 'POST',
						body: JSON.stringify(user),
						headers: {
							'Content-Type': 'application/json',
						  },	
					})
					let data = await resp.json()

					if (data.email) {
						localStorage.setItem("token" , data.token)
						localStorage.setItem("name" , data.name)
						localStorage.setItem("email" , data.email)
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
					product.id === id)
					  if(transitory){ 
						getActions().changePrice(id,transitory.quantity+1,transitory.price)
					  }
			},

			decrementDish : (id) => {
				const store = getStore();
				const transitory = store.list.map((product) =>
					product.id === id && product.quantity>1
					  ? { ...product, quantity: product.quantity - 1 }
					  : product
				  )
				setStore({list: transitory})
				console.log(store.list);
				
			  },

			changePrice : (id,quantity) => {
				const store = getStore();
				// const unitprice = price/quantity
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
				const total = store.list.reduce((total,product)=>total + product.price * product.quantity,0)
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
				// console.log(dataLogin);
				
				 // para pausar el proceso y que no se actualice la pag.
				try{
					const store = getStore();
					const addNote = ({
						dish: store.list, 
						instructions: instructionsnote, 
						amount: getActions().totalPrice()
					  });
					setStore({order: addNote})

					// console.log(addNote.amount)
					// console.log(store.list);
					// console.log(store.order);
					
				}catch(e){
					console.error(e);
					
				}
			},



			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
