import React from "react";
import { DishDetail } from "./DishDetail.jsx";

export const DishCard = ({ id, imageUrl, name, cookingTime, price, discountPercentage }) => {
    let discountedPrice = price;
    if (discountPercentage !== null) {
        discountedPrice = price * (100 - discountPercentage) / 100;
    }
    return (
        <>
            <div
                className="card w-100"
                data-bs-toggle="modal"
                data-bs-target={`#modal-${id}`}
            >
                <img
                    src={imageUrl}
                    className="card-img-top img-fluid"
                    alt={name}
                />
                <div>
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text text-secondary">
                        <div className="d-flex justify-content-between">
                            <div>
                                <span>S/.{discountedPrice.toFixed(2)}</span>
                                <span
                                    className={`px-2 ${discountPercentage === null ? 'd-none' : ''}`}
                                    style={{ color: '#BFBFBF', textDecoration: 'line-through' }}
                                >
                                    S/.{price.toFixed(2)}
                                </span>
                            </div>
                            <div>
                                <div className={cookingTime === null ? 'd-none' : ''}>
                                    <i className="fa-regular fa-clock px-1"></i>{cookingTime} min
                                </div>
                            </div>
                        </div>
                    </p>
                </div>
            </div>
            <DishDetail id={`modal-${id}`} />
        </>
    );
};