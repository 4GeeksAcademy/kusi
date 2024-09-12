import React, { useContext } from "react";
import { Navbar } from "../component/navbar";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Menu = () => {
	const { store, actions } = useContext(Context);

	return (
        <>
            <Navbar />
            <div className="text-center mt-5">
				<div className="card" style={{width: '18rem'}}>
					<img src="https://picsum.photos/id/23/150/150" className="card-img-top" alt="..."/>
					<div className="card-body">
						<h5 className="card-title">Card title</h5>
						<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
						<a href="#" className="btn btn-primary">Go somewhere</a>
					</div>
				</div>
			</div>
        </>
		
	);
};
