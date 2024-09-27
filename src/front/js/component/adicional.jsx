import React, { useContext,useState } from "react";
import { Context } from "../store/appContext";
import Swal from 'sweetalert2'


export const Adicional = ({ dish, imgSrc, name, price, description }) => {
    
    const [amount, setAmount] = useState(1);
    const { store, actions } = useContext(Context);

    const addToCart = async (id) => {
        
		let updatedList = JSON.parse(localStorage.getItem("listcart")) || []
        //const updatedList = store.list;
        let currentDish = dish;
        let found = false;
        for (let i  = 0; i < updatedList.length; i++) {
            if (updatedList[i].id == id) {
                updatedList[i].quantity += amount;
                found = true;
                break;
            }
        }
    
        if (!found) {
            dish.quantity = amount;
            updatedList.push(currentDish);
        }

        //await actions.updateListCart(updatedList);
        localStorage.setItem("listcart",JSON.stringify(updatedList))
        setAmount(1)


        Swal.fire({
            title: "Hecho!",
            text: "Plato agregado a tu carrito.",
            icon: "success",
        })

    };

    const incrementAmount = () => {
        
        if (amount < dish.quantity) {
            setAmount(amount + 1);
        }else {
            Swal.fire({
                title: "Cantidad máxima",
                text: "No es posible  agregar más debido al stock.",
                icon: "warning",
            })
        }
    }

    const decrementAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1);
        } 
    }

    return (
        <div className="card-adicional w-100 shadow-sm mb-2" style={{ height: '380px', border: '1px solid #ddd', borderRadius: '20px' }}>
            <img src={imgSrc} className="card-img-top img-fluid" alt={name} style={{ objectFit: 'cover', height: '200px' }} />
            <div className="body d-flex flex-column justify-content-between">
                <div className="p-1">
                    <h5 className="card-title">{name}</h5>
                    {/* <p className="card-text text-secondary" style={{ fontSize: '10px' }}>
                        {description}
                    </p> */}
                </div>

                <div className="d-flex justify-content-center align-items-center mt-3">
                    <div className="col-7">
                        <button className="btn" style={{ color: '#F44322', fontSize: '20px' }} onClick={decrementAmount}>
                            <i className="fa-solid fa-circle-minus"></i>
                        </button>
                        <span className="mx-0" style={{ fontSize: '15px' }}>{amount}</span>
                        <button className="btn" style={{ color: '#F44322', fontSize: '20px' }} onClick={incrementAmount}>
                            <i className="fa-solid fa-circle-plus"></i>
                        </button>
                    </div>
                    <div className="col-5 text-center style={{ fontSize: '20px' }}">
                        <span>S/.{amount*price.toFixed(2)}</span>
                    </div>
                </div>
                
                <button
                    type="button"
                    className="btn rounded-pill px-4"
                    onClick={ () => addToCart(dish.id || 0) }
                    style={{ color: 'white', background: '#F44322' }}
                >
                    Agregar
                </button>
            </div>
        </div>
    );
}
