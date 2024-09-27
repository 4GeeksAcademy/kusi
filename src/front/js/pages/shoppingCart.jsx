import React, { useState, useContext ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/shoppingCart.css';
import emptycart from '../../assets/images/emptycart.png';
import bin from '../../assets/images/bin.png';
import minus from '../../assets/images/minus.png';
import plus from '../../assets/images/plus.png';
import kusilogo from '../../assets/images/kusi-logo.png'
import { Navbar } from "../component/Navbar.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { Context } from "../store/appContext";


export const ShoppingCart = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [notes,setNotes] = useState("")
    

    useEffect(()=>{
        actions.getDishes()
    },[]);

	const handleChange = (e)=> {
		let txt = e.target.value
		setNotes(txt)
	}

    const goToPay = async () => {
            await actions.btnContinuar(notes);
            navigate("/paypal")
            setNotes("")   
		
	}

  return(
    <>
    {store.list.length>0?(
      <>
          <Navbar></Navbar>
            <div className='container-fluid w-100 d-flex justify-content-center align-items-center'>
                 <div className="container p-0 mt-0">
                  <div className="container mb-5 mt-3" id="title">
                      <div className="d-flex justify-content-center">
                        <h1 className="d-flex justify-content-center align-items-center flex-grow-1 mb-0">Mi pedido</h1>
                      </div>
                  </div> 
                  <ul className="p-0 d-flex flex-column justify-content-center align-items-center">
                      {store.list.map(item => (
                        <li key={item.id} className="list-group-item d-flex align-items-center justify-content-center mb-2 pe-1 border border-1 rounded" style={{ width: "80%" }}>
                          <div className="row w-100 col-12 justify-content-between align-items-center flex-nowrap" style={{ flexWrap: 'nowrap' }}>
                            {/* Imagen del producto */}
                            <div className="col-3 d-flex justify-content-start align-items-center" style={{ height: '100px', minWidth: '120px' }}>
                              <img 
                                src={item.image_url} 
                                alt={item.id} 
                                className="image-cover rounded" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', maxWidth: 'none' }} 
                              />
                            </div>

                            {/* Descripción y precio en la misma fila */}
                            <div className="container-text-buttons d-flex flex-row col-9 justify-content-between align-items-center flex-wrap" style={{ flexWrap: 'nowrap' }}>
                              <div className="col-8 col-lg-6 col-md-6 text-start">
                                {item.name}
                              </div>

                              <div className="col-4 col-lg-2 col-md-2 align-self-center text-end">
                                S/.{(item.price * item.quantity).toFixed(2)}
                              </div>

                              {/* Control de cantidad */}
                              <div className="container-button-images col-8 col-lg-3 col-md-3 d-flex justify-content-center align-items-center" style={{ minWidth: '150px' }}>
                                <div className="button-images d-flex align-items-center justify-content-between">
                                  <span onClick={() => actions.decrementDish(item.id)} className="pointer-icon mx-1">
                                    <img src={minus} alt="" style={{ width: '20px' }} />
                                  </span>
                                  <span className="px-1">{item.quantity}</span>
                                  <span onClick={() => actions.incrementDish(item.id, item.quantity)} className="pointer-icon mx-1">
                                    <img src={plus} alt="" style={{ width: '20px' }} />
                                  </span>
                                </div>
                              </div>

                              {/* Botón de eliminación */}
                              <div className="col-4 col-lg-1 col-md-1 d-flex justify-content-end align-items-center" onClick={() => actions.deleteDish(item.id)}>
                                <FontAwesomeIcon className='fs-4 pointer-icon' style={{ color: "#F44322" }} icon={faTrashCan} />
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="container mb-5 w-100 bg-primary d-flex flex-column justify-content-center align-items-center">
                      <h5 className="text-end mb-3 bg-danger" style={{width:"80%"}}>Total a Pagar: S/. {actions.totalPrice()}</h5>
                      <h5 className="text-start">Notas del pedido (opcional)</h5>
                      <textarea className="form-control" name="" id="" onChange={handleChange} maxlength="255" placeholder="Escriba sus indicaciones aquí"></textarea>
                      <p className="text-end mb-1 text-secondary">{notes.length}/255</p>
                      <div className="text-center justify-content-center align-items-center mb-3 mt-0"><button className="btn btn-danger" onClick={()=>goToPay()}>Continuar</button></div>
                    </div>
                   </div>
                
            </div>    
            </>     ):(
                  <>
                  <Navbar></Navbar>
                    <div className="container text-center justify-content-center align-items-center container-cart">
                        <h1>Tu carrito está vacío! </h1>
                        <div className="container">
                            <img 
                                src={emptycart} alt="" id="emptycart" />
                        </div>
                        <div className="text-center justify-content-center align-items-center mb-3"><button onClick={()=>navigate("/menu")}>Regresar al Menu</button></div>
                    </div>
                    </>
                )}
    </>
  );



}