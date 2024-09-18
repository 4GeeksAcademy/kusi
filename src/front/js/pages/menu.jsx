import React, { useContext } from "react";
import "../../styles/menu.css";
import "../../styles/card.css";
import { ContainerCards } from "../component/containerCards.jsx";

export const Menu = () => {

	return (

		<div className="container d-flex justify-content-center align-items-center w-auto">
			<ContainerCards/>
		</div>
	);
};
