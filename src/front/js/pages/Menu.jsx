import React, { useContext,useEffect } from "react";
import "../../styles/menu.css";
import "../../styles/card.css";
import { DishCardsTable } from "../component/DishCardsTable.jsx";
import { Navbar } from "../component/Navbar.jsx";
import { Context } from "../store/appContext.js";

export const Menu = () => {
    const { actions } = useContext(Context);

	useEffect(() => {
		actions.getDishes();
	}, []);

	return (
		<>
			<Navbar />
			<div className="container d-flex justify-content-center align-items-center w-auto mt-3">
				<DishCardsTable />
			</div>
		</>
	);
};
