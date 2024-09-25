import React, { useState, useContext ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/shoppingCart.css';
import emptycart from '../../assets/images/emptycart.png';
import bin from '../../assets/images/bin.png';
import minus from '../../assets/images/minus.png';
import plus from '../../assets/images/plus.png';
import kusilogo from '../../assets/images/kusi-logo.png'
import { Navbar } from "../component/Navbar.jsx";


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

    const goToPay = () => {

		try{
            actions.btnContinuar(notes);
            navigate("/menu")
            setNotes("")   
		}catch(e){
			console.error(e);
		}
	}

  return(
    <>
    {store.list.length>0?(<>
          <Navbar></Navbar>
            <div className='container-cart'>
                <div className="container">
                </div>
                 <div className="container mr-5 pr-5 p-0 mt-0">
                  <div className="container mb-5 mt-3" id="title">
                      
                      <div className="d-flex justify-content-center">
                        <h1 className="d-flex justify-content-center align-items-center flex-grow-1 mb-0">Mi pedido</h1></div>
                  </div> 
                  <ul className="p-0">{store.list.map(item => (
                      <li className="list-group-item d-flex align-items-center justify-content-center">
                      <div className="row w-100 justify-content-center align-items-center border border-secondary-subtle">

                          <div className="col-3 col-sm-3 col-md-3 d-flex justify-content-center">
                            <img src={item.image_url} alt={item.id} className="img-fluid rounded" style={{ maxWidth: '100px' }} />
                          </div>
                            <div className="row col-9 col-sm-9 col-md-9">
                   
                              <div className="col-8 col-lg-6 col-md-6 text-start icon-left">
                                {item.name}
                              </div>
                          
                              <div className="col-4 col-lg-2 col-md-2 align-self-center text-end icon-right">
                                S/.{item.price.toFixed(2)*item.quantity}
                              </div>
                            
                              <div className="col-8 col-lg-3 col-md-3 align-self-center text-start icon-left">
                                <div className="text-start icon-left p-0 m-0">
                                  <span onClick={() => actions.decrementDish(item.id)} className="span-icon"><img 
                                    src={minus} alt=""  /></span>
                                  <span className="px-1">{item.quantity}</span>
                                  <span onClick={() => actions.incrementDish(item.id,item.quantity)} className="span-icon"><img 
                                    src={plus} alt=""  /></span>
                                </div>
                              </div>
                          
                              <div className="col-4 col-lg-1 col-md-1 align-self-center text-end icon-right">
                                <span onClick={() => actions.deleteDish(item.id)} className="span-icon">
                                <img 
                                  src={bin} alt="" id="bin" />
                                </span>
                              </div>
                            </div>  
                        </div>
                      </li>))}
                    </ul>
                    <div className="container mb-5 text-center">
                      <h5 className="text-end mb-3">Total a Pagar: S/. {actions.totalPrice()}</h5>
                      <h5 className="text-start">Notas del pedido (opcional)</h5>
                      <textarea className="form-control" name="" id="" onChange={handleChange} maxlength="255" placeholder="Escriba sus indicaciones aquí"></textarea>
                      <p className="text-end mb-1 text-secondary">{notes.length}/255</p>
                      <div className="text-center justify-content-center align-items-center mb-3 mt-0"><button onClick={()=>goToPay()}>Continuar</button></div>
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