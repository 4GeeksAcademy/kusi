import React, { useContext, useEffect } from "react";
import { DishCard } from "./DishCard.jsx";
import {DishDetail } from "./DishDetail.jsx";
import { Context } from "../store/appContext.js";

export const DishCardsTable = () => {
    const { store } = useContext(Context);

    if (store.dishes === undefined) {
        return <></>;
    }

    return (
        <div className="container-dishes mt-5 mx-auto">
            <div className="row">
                {store.dishes.map((dish, index) => (
                    <div
                        key={index}
                        className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4 mb-4"
                    >
                        <DishCard
                            id={dish.id}
                            name={dish.name}
                            description={dish.description}
                            imageUrl={dish.image_url}
                            price={dish.price}
                            discountPercentage={dish.discount_percentage}
                            cookingTime={dish.cooking_time}
                            quantity={dish.quantity}
                        />
                    </div>
                ))}
                
                <div className="modal fade" id={`modal-detail-dish`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
                    <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '600px', borderRadius: '20px' }}>
                        <div className="modal-content p-0" style={{ borderRadius: '20px' }}>
                            <div className="modal-body d-flex flex-column align-items-center p-0 mb-3">
                            <DishDetail />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}