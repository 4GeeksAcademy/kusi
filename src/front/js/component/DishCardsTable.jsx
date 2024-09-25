import React, { useContext } from "react";
import { DishCard } from "./DishCard.jsx";
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
                            imageUrl={dish.image_url}
                            name={dish.name}
                            cookingTime={dish.cooking_time}
                            price={dish.price}
                            discountPercentage={dish.discount_percentage}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}