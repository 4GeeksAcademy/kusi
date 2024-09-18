import React, { useContext, useEffect} from "react";
import { Card } from "../component/card.jsx";
import { Context } from "../store/appContext";

export const ContainerCards = () => {
    const { store } = useContext(Context);

    return (
        <div className="container-dishes mt-5 mx-auto">
            <div className="row">
                {store.dishes.map((dish, index) => (
                <div key={index} className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4 mb-4">
                    <Card
                    id={dish.id}
                    imgSrc={dish.image_url}
                    title={dish.title}
                    time={dish.cooking_time}
                    price={dish.price}
                    discount={dish.discount_percentage}
                    description={dish.description}
                    />
                </div>
                ))}
            </div>
        </div>
    );
}