import React, { useContext,useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { ContainerAdicionales } from "../component/containerAdicionales.jsx"
import { Context } from "../store/appContext";

export const DishDetail = () => {
    const [amount, setAmount] = useState(1);
    const { store, actions } = useContext(Context);
    const [showExtras, setShowExtras] = useState(false);
    
	useEffect( async ()  => {
	}, []);

    const addToCart = async (id) => {

        let addDish = true;
        let dishes = store.list;
        let dishesCart = store.listCart;

        const newDish = {
            "id":id,
            "quantity":amount,
            "unit_price":store.dishSelected.price
        }
        const newDishCart = store.dishSelected;

        for (let i  = 0; i < dishes.length; i++) {
            if (dishes[i].id == newDish.id) {
                dishes[i].quantity = dishes[i].quantity + amount;
                addDish=false;
            }
        }

        if(addDish){
            dishes.push(newDish)
            dishesCart.push(newDishCart)
        }

        await actions.updateListCart(dishes);
        await actions.getExtrasByDishId(store.dishSelected.id);
        setAmount(1)
        setShowExtras(true)

    };

    const incrementAmount = () => {
        let amountAux = amount+1;
        if(amountAux>10){
            amountAux=10
        }
        setAmount(amountAux);
    }

    const decrementAmount = () => {
        let amountAux = amount-1;
        if(amountAux<1){
            amountAux=1
        }
        setAmount(amountAux);
    }

    return (
                    <>
                        { !showExtras ? (
                            <>
                            <img src={store.dishSelected.image_url} 
                                alt={store.dishSelected.name} 
                                className="img-fluid w-100 h-auto ratio ratio-1x1" 
                                style={{ maxHeight: '300px', objectFit: 'cover', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }} 
                            />
                            <button type="button" className="btn-close bg-light rounded-circle position-absolute top-0 end-0 m-3"  data-bs-dismiss="modal" aria-label="Close"></button>
                            <div className="row d-flex mt-3 mx-3">
                                <div className="col">
                                    <h4>{store.dishSelected.name}</h4>
                                    <p>{store.dishSelected.description}</p>
                                    <p>Ingredientes: {store.ingredients}</p>
                                </div>
                            </div>
                            <div className="col-4 d-flex justify-content-center align-items-center mb-2">
                                <button className="btn" style={{ color: '#F44322', fontSize: '24px' }} onClick={()=>{decrementAmount()}}>
                                    <i className="fa-solid fa-circle-minus"></i>
                                </button>
                                <span className="mx-3" style={{ fontSize: '20px' }}>{amount}</span>
                                <button className="btn" style={{ color: '#F44322', fontSize: '24px' }} onClick={()=>{incrementAmount()}}>
                                    <i className="fa-solid fa-circle-plus"></i>
                                </button>
                            </div>
                            <button type="button" className="btn rounded-pill px-4" onClick={ ()=>{addToCart(store.dishSelected.id)} } style={{ color: 'white', background: '#F44322' }}>Agregar</button>
                            </>
                        ) : (
                            <div className="container-fluid mt-3 mx-3">
                                <h4 className='text-center'>Complementa tu comida</h4>
                                <ContainerAdicionales/>
                                <div className="d-flex">
                                    <div className="col-6 d-flex justify-content-start">
                                        <button type="button" 
                                        className="btn rounded-pill px-4"  
                                        data-bs-dismiss="modal" 
                                        aria-label="Close" 
                                        onClick={()=>{setShowExtras(false)}} 
                                        style={{ color: 'white', background: '#F44322' }}>
                                            Seguir comprando
                                            </button>
                                    </div>                                   
                                    <div className="col-6 d-flex justify-content-end">                                   
                                        <Link to="/shopping-cart" className="btn rounded-pill px-4" style={{ color: 'white', background: '#F44322' }}>Ir a carrito</Link>
                                    </div>
                                </div>                            
                            </div>
                        )}
                        </>
    );
};

