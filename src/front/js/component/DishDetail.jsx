import React, { useContext,useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContainerAdicionales } from "../component/containerAdicionales.jsx"
import { Context } from "../store/appContext";
import Swal from 'sweetalert2'

export const DishDetail = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState(1);
    const { store, actions } = useContext(Context);
    const [showExtras, setShowExtras] = useState(false);

    const addToCart = async (id) => {
        
		let updatedList = JSON.parse(localStorage.getItem("listcart")) || []
        //const updatedList = store.list;
        let currentDish = store.dishSelected;
        let found = false;
        for (let i  = 0; i < updatedList.length; i++) {
            if (updatedList[i].id == id) {
                updatedList[i].quantity += amount;
                found = true;
                break;
            }
        }
    
        if (!found) {
            currentDish.quantity = amount;
            updatedList.push(currentDish);
        }

        //await actions.updateListCart(updatedList);
        localStorage.setItem("listcart",JSON.stringify(updatedList))
        actions.getExtrasByDishId(currentDish.id);
        setAmount(1)
        setShowExtras(true);
    };

    const incrementAmount = () => {
        
        if (amount < store.dishSelected.quantity) {
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

    function handleDismissModal() {
        setAmount(1);
        setShowExtras(false);
    }

    function handleViewCart() {
        handleDismissModal();
        navigate("/shopping-cart");
    }

    if (
        store.dishSelected === undefined ||
        store.dishSelected === null
    ) {
        return <></>;
    }

    if (showExtras) {
        return (
            <div className="container-fluid mt-3 mx-3">
                <h4 className='text-center'>Complementa tu plato</h4>
                    <ContainerAdicionales/>
                    <div className="d-flex">
                        <div className="col-6 d-flex justify-content-start">
                            <button
                                type="button"
                                className="btn rounded-pill px-4"  
                                data-bs-dismiss="modal"
                                aria-label="Close" 
                                onClick={handleDismissModal}
                                style={{ color: 'white', background: '#F44322' }}>
                                Seguir comprando
                            </button>
                        </div>
                    <div className="col-6 d-flex justify-content-end"> 
                        <button
                            type="button"
                            className="btn rounded-pill px-4"  
                            data-bs-dismiss="modal"
                            aria-label="Proceed to checkout" 
                            onClick={handleViewCart}
                            style={{ color: 'white', background: '#F44322' }}
                        >
                            Ir a carrito
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <img
                src={store.dishSelected.image_url || ""}
                alt={store.dishSelected.name || ""} 
                className="img-fluid w-100 h-auto ratio ratio-1x1"
                style={{ maxHeight: '300px', objectFit: 'cover', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}
            />
            <button
                type="button"
                className="btn-close bg-light rounded-circle position-absolute top-0 end-0 m-3"
                data-bs-dismiss="modal"
                aria-label="Close"
            />
            <div className="row d-flex mt-3 mx-3">
                <div className="col">
                    <h4>{store.dishSelected.name || ""}</h4>
                    <p>{store.dishSelected.description || ""}</p>
                    {store.dishSelected.ingredients === undefined || store.dishSelected.ingredients.length == 0 ? <></> : (<p>Ingredientes: {store.dishSelected.ingredients.map(u => u.name).join(', ')}.</p>)}
                </div>
            </div>
            <div className="col-4 d-flex justify-content-center align-items-center mb-2">
                <button
                    className="btn"
                    style={{ color: '#F44322', fontSize: '24px' }}
                    onClick={decrementAmount}
                >
                    <i className="fa-solid fa-circle-minus"></i>
                </button>
                <span
                    className="mx-3"
                    style={{ fontSize: '20px' }}>
                    {amount}
                </span>
                <button
                    className="btn"
                    style={{ color: '#F44322', fontSize: '24px' }}
                    onClick={incrementAmount}
                >
                    <i className="fa-solid fa-circle-plus"></i>
                </button>
            </div>
            <button
                type="button"
                className="btn rounded-pill px-4"
                onClick={ () => addToCart(store.dishSelected.id || 0) }
                style={{ color: 'white', background: '#F44322' }}
            >
                Agregar
            </button>
        </>
    );
};

