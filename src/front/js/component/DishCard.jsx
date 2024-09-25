import React, { useContext } from "react";
import { Context } from "../store/appContext.js";

export const DishCard = ({ id, name, imageUrl, price, discountPercentage, cookingTime }) => {
    const { actions } = useContext(Context);
    
    let discountedPrice = price;
    if (discountPercentage !== null) {
        discountedPrice = price * (100 - discountPercentage) / 100;
    }
    // showDishDetail: async(id) =>{
    //     const store = getStore()
    //     await getActions().getDishById(id);
    //     if (store.dishSelected.ingredients.length > 0) {
    //         await setStore({ingredients: store.dishSelected.ingredients.map(x => x.name).join(', ')})
    //     } else {
    //         await setStore({ingredients: "Sin ingredientes"})
    //     }
    // },
    async function handleOnClick() {
        await actions.getDishById(id);
    }

    return (
        <>
            <div
                className="card w-100"
                data-bs-toggle="modal"
                data-bs-target={`#modal-detail`}
                onClick={handleOnClick}
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
            
        </>
    );
};
