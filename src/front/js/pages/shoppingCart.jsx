import React, { useState, useEffect, useContext, useRef  } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/shoppingCart.css";
import emptycart from "../../img/emptycart.png"


import { Context } from "../store/appContext";

export const ShoppingCart = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [notes,setNotes] = useState("")
    
	const handleChange = (e)=> {
		let txt = e.target.value
		setNotes(txt)
	}

    const goToPay = () => {

		try{
            actions.btnContinuar(notes);
            navigate("/")
            setNotes("")   
		}catch(e){
			console.error(e);
		}
	}
     

    if(Object.keys(store.list).length === 0)
        { return(
            <div className="text-center justify-content-center align-items-center mt-5">
                <h1>Tu carrito está vacío! </h1>
                <div className="responsive-container">
                    <img 
                        src={emptycart} alt="" id="emptycart" />
                </div>
                <div className="text-center justify-content-center align-items-center mb-3"><button onClick={()=>navigate("/")}>Regresar al Menu</button></div>
            </div>
            
        )
        }

    else{
        return(
            <div>
                <div>
                    <div className="mx-3 mt-3" id="logo">logo</div>
                </div>
                 <div className="container mr-5 pr-5 p-0 mt-0">
                 <div className="text-center justify-content-center align-items-center mb-5" id="title"><h1>Mi pedido</h1></div> 
                  <ul className="p-0">{store.list.map(item => (
                      <li className="list-group-item d-flex align-items-center justify-content-center">
                      <div className="row w-100 justify-content-center align-items-center border border-secondary-subtle">

                        <div className="col-3 col-sm-3 col-md-3 d-flex justify-content-center">
                            <img src={item.image} alt={item.name} className="img-fluid rounded" style={{ maxWidth: '100px' }} />
                          </div>
                            <div className="row col-9 col-sm-9 col-md-9">
                   
                              <div className="col-8 col-lg-6 col-md-6">
                                {item.name}
                              </div>
                          
                              <div className="col-4 col-lg-2 col-md-2 align-self-center text-center">
                                S/.{item.price.toFixed(2)*item.quantity}
                              </div>
                            
                              <div className="col-8 col-lg-3 col-md-3 align-self-center">
                                <div className="text-center p-0 m-0">
                                  <button onClick={() => actions.decrementDish(item.id)} className="btn btn-quantity btn-sm me-2">-</button>
                                  <span>{item.quantity}</span>
                                  <button onClick={() => actions.incrementDish(item.id,item.quantity)} className="btn btn-quantity btn-sm ms-2">+</button>
                                </div>
                              </div>
                          
                              <div className="col-4 col-lg-1 col-md-1 align-self-center text-center">
                                <button onClick={() => actions.deleteDish(item.id)} className="btn btn-quantity btn-sm">
                                  X
                                </button>
                              </div>
                            </div>  
                        </div>
                      </li>))}
                    </ul>
                    <div className="container mb-5 text-center">
                      <h5 className="text-end">Total a Pagar: S/. {actions.totalPrice()}</h5>
                      <h5 className="text-start">Notas del pedido(opcional)</h5>
                      <textarea className="form-control" name="" id="" onChange={handleChange} maxlength="255" placeholder="Escriba sus indicaciones aquí"></textarea>
                      <p className="text-end mb-1 text-secondary">{notes.length}-255</p>
                      <div className="text-center justify-content-center align-items-center mb-3 mt-0"><button onClick={()=>goToPay()}>Continuar</button></div>
                    </div>
                   </div>
                
            </div>         
        )
    }

}