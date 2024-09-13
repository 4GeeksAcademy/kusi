import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { ModalDetalle } from "../component/modalDetalle.jsx";

export const Card = ({ id, imgSrc, title, time, price }) => {
	const { store, actions } = useContext(Context);

	return (
		<div className="card" style={{ borderRadius: '20px', width: '100%', height: '300px', overflow: 'hidden' }}>
			<img src={imgSrc} className="card-img-top img-fluid" alt={title} style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px', height: '70%', objectFit: 'cover' }} />
			<div className="card-body" style={{ height: '30%' }}>
				<div className="d-flex mb-2 mt-1 justify-content-between align-items-center">
					<div className="d-inline">
						<h5 className="card-title">{title}</h5>
						<p className="card-text text-secondary">{time} {price}</p>
					</div>
					<Link to="/" className="text-decoration-none px-3">
						<span className="fs-3 text-dark fw-bold" data-bs-toggle="modal" data-bs-target={`#modal-${id}`}>⁝</span>
					</Link>
				</div>
			</div>
			<ModalDetalle
						id={`modal-${id}`}
						imgSrc={imgSrc}
						title={title}
					/>
		</div>

	); 
};