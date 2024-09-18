import React, { useContext,useEffect } from "react";
import "../../styles/menu.css";
import "../../styles/card.css";
import { ContainerCards } from "../component/containerCards.jsx";
import { Context } from "../store/appContext";

export const Menu = () => {

    const { store, actions } = useContext(Context);
	
	useEffect(() => {
		actions.getDishes();
	}, []);

	return (

		<div className="container d-flex justify-content-center align-items-center w-auto">
			<ContainerCards/>
		</div>
	);
};
