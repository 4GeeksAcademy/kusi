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
			token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyNjU5NjI1NywianRpIjoiZDI1YTJlOTgtMWIyMS00MTNjLWIxOWItZjA0NjZjNjYwNjBiIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImRldmVsb3BtZW50IiwibmJmIjoxNzI2NTk2MjU3LCJjc3JmIjoiODNkOWU0YzItYzgxNi00NjY5LTk4YWUtMTE1YzZkNzZhMWQyIiwiZXhwIjoxNzI2NTk3MTU3fQ.Azp8aiObOVsYmRayu1vbbEEYGCLxVhDKLaSut5bjWQ0",
			dataUsers: [],
			dataUsersById: [],
		},
		actions: {
			getUsers: async () => {
				const store = getStore()
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/users/`,{
						headers:{
							"Access-Control-Allow-Origin": "*",
							"Authorization": `Bearer ${store.token}`,
        					"Content-Type": "application/json"
						}
					})

					if(!response.ok){
						console.log("Hubo un error")
					}

					let data = await response.json()
					setStore({dataUsers: data})
					console.log(data)
					
					return data

				}catch (e){
					console.error(e)
				}
			},

			getUsersById: async (id) => {
				const store = getStore()

				try{
					let response = await fetch(`${process.env.BACKEND_URL}/users/${id}`,{
						headers:{
							"Access-Control-Allow-Origin": "*",
							"Authorization": `Bearer ${store.token}`,
        					"Content-Type": "application/json"
						}
					})

					if(!response.ok){
						console.log("Hubo un error trayendo el id"+id)
					}
					let data = await response.json()
					setStore({dataUsersById: data})
				}catch (e){

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
