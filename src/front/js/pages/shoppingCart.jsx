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
            <div className="container-all-cart">
                <div>
                    <div className="mx-3 mt-3" id="logo">logo</div>
                    <div className="text-center justify-content-center align-items-center mb-5" id="title"><h1>Mi pedido</h1></div>
                </div>
                <ul className="list-item p-0">{store.list.map(item => (
                    <li className="list-group-item d-flex align-items-center">
                    <div className="row w-100 justify-content-center align-items-center">
                      {/* Imagen */}
                      <div className="col-5 col-sm-3 col-md-2 d-flex justify-content-center">
                        <img src={item.image} alt={item.name} className="img-fluid rounded" style={{ maxWidth: '100px' }} />
                      </div>
                      {/* Nombre */}
                      <div className="col-6 col-md-4">
                        <div>{item.name}</div>
                      </div>
                      {/* Precio */}
                      <div className="col-2 col-md-1 text-end">
                        ${item.price.toFixed(2)}
                      </div>
                      {/* Cantidad */}
                      <div className="col-2 col-md-1 d-flex align-items-center">
                        <button onClick={() => actions.decrementDish(item.id)} className="btn btn-quantity btn-sm me-2">-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => actions.incrementDish(item.id)} className="btn btn-quantity btn-sm ms-2">+</button>
                      </div>
                      {/* Botón de eliminar */}
                      <div className="col-2 col-md-1 d-flex justify-content-center">
                        <button onClick={() => actions.deleteDish(item.id)} className="btn btn-quantity btn-sm">
                          X
                        </button>
                      </div>
                    </div>
                  </li>))}
                </ul>
                <div className="mb-5">
                    <h5>Notas del pedido(opcional)</h5>
                    <textarea name="" id="" onChange={handleChange} maxlength="255"></textarea>
                    <p className="text-end mb-1">{notes.length}-255</p>
                    <div className="text-center justify-content-center align-items-center mb-3 mt-0"><button onClick={()=>goToPay()}>Continuar</button></div>
                </div>
            </div>    
            
        )
    }

}