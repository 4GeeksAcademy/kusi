import React, { useContext,useEffect,useState } from "react";
import "../../styles/menu.css";
import "../../styles/card.css";
import { DishCardsTable } from "../component/DishCardsTable.jsx";
import { Navbar } from "../component/Navbar.jsx";
import { Context } from "../store/appContext.js";
import { Chat } from "../component/chat.jsx";


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
			<Chat/>
		</>
	);
};
