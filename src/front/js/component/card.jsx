import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { ModalDetalle } from "../component/modalDetalle.jsx";

export const Card = ({ id, imgSrc, title, time, price, description, ingredients  }) => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<div className="card w-100" data-bs-toggle="modal" data-bs-target={`#modal-${id}`}>
				<img src={imgSrc} className="card-img-top img-fluid" alt={title} />
				<div className="card-body d-flex flex-column justify-content-between">
					<div>
						<h5 className="card-title">{title}</h5>
						<p className="card-text text-secondary">
							<div className="row">
								<div className="col-7">
									<span>{price}</span> 
									<span className="px-2" style={{ color: '#BFBFBF',textDecoration: 'line-through' }}>S/.18.90</span>
								</div>
								<div className="col-5 text-end">
									<i class="fa-regular fa-clock px-1"></i>{time} min
								</div>
							</div>
						</p>
					</div>
				</div>
			</div>

			<ModalDetalle
				id={`modal-${id}`}
				imgSrc={imgSrc}
				title={title}
				description={description}
				ingredients={ingredients}
			/>
		</>
	); 
};
