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
