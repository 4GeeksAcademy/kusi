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
			token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyNjYxMTk4MCwianRpIjoiZDE3NTZiNWMtOTJiNS00MTI0LTk3ZDItMGM3ZjViZTY0M2Q2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6Mywicm9sZV9pZCI6MiwiZW1haWwiOiJyb3NzeUA0Z2Vla3MuY29tIiwibmFtZSI6IlJvc3N5IiwicGhvbmVfbnVtYmVyIjoiKzUxIDMyMTY1NDk4NyIsImlzX2FjdGl2ZSI6dHJ1ZSwicHJvZmlsZV9waWN0dXJlX3VybCI6Imh0dHBzOi8vZW5jcnlwdGVkLXRibjAuZ3N0YXRpYy5jb20vaW1hZ2VzP3E9dGJuOkFOZDlHY1N1WGhFTzhrY05fWkhkNjF2Z3dNUmVVLWo0c0FkalQzdnNGdyZzIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDktMTdUMjI6MjE6NTIuMTgxMzMyIn0sIm5iZiI6MTcyNjYxMTk4MCwiY3NyZiI6IjJiMjRlNzI5LWFlNmQtNDE1NC1iZjMxLTA1Njk4MzMzM2MwYSIsImV4cCI6MTcyNjYxOTE4MH0.y77XxN2IyPV9kIswIj66SrSi05UaTk4KD1OISXx06O8",
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
						console.log("Hubo un error trayendo el id "+id)
					}
					let data = await response.json()
					setStore({dataUsersById: data})
				}catch (e){

				}
			},

			updateUser: async (userId, newUpdateUser) => {
				const store = getStore();
				try{
					const response = await fetch(`${process.env.BACKEND_URL}/users/${userId}`,{
						method: "PUT",
						headers:{
							"Access-Control-Allow-Origin": "*",
							"Authorization": `Bearer ${store.token}`,
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

				}catch (error) {
                    console.error("Error actualizando el usuario:", error);
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
