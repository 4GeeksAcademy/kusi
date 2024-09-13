import React, { useState, useEffect, useContext, useRef  } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/shoppingCart.css";


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
     

    return(
        <div>
            <div className="row">
                <div id="logo">logo</div>
                <div className="text-center justify-content-center align-items-center" id="title"><h1>Mi pedido</h1></div>
            </div>
            <div className="cart">
                <ul className="list-group">
                    {store.list.map(item => (
                    <li key={item.id} className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center">
                        <img src={item.imageUrl} alt={item.name} className="img-thumbnail mr-3" style={{ width: '100px' }} />
                        <div>
                            <h5 className="mb-1 mx-2">{item.name}</h5>
                            <p className="mb-1 mx-2 d-md-inline d-block"> S/.{item.price.toFixed(2)}</p>
                        </div>
                        
                        </div>
                        <div className="d-flex text-center justify-content-center align-items-center">
                            <button onClick={()=>actions.decrementDish(item.id)} className="btn-counter m-1"></button>
                            {item.quantity}
                            <button onClick={()=>actions.incrementDish(item.id)} className="btn-counter m-1"></button>
                            <div>
                            <svg onClick={()=>actions.deleteDish(item.id)} width="29" height="33" viewBox="0 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_174_388)">
                            <path d="M5.54057 5.71045H23.8653V20.8978C23.8653 22.5547 22.5221 23.8978 20.8653 23.8978H8.54057C6.88372 23.8978 5.54057 22.5547 5.54057 20.8978V5.71045Z" stroke="#F44322" stroke-width="2" shape-rendering="crispEdges"/>
                            </g>
                            <path d="M2.55729 6.22906C2.78352 5.25958 3.65325 4.53741 4.69165 4.53741H24.2061C25.2445 4.53741 26.1142 5.25958 26.3405 6.22906H2.55729Z" fill="white" stroke="#F44322"/>
                            <rect x="19.149" y="8.4561" width="0.762177" height="12.6961" rx="0.381088" fill="#D9D9D9" stroke="#F44322" stroke-width="0.762177"/>
                            <rect x="14.0678" y="8.4561" width="0.762177" height="12.6961" rx="0.381088" fill="#D9D9D9" stroke="#F44322" stroke-width="0.762177"/>
                            <rect x="8.60551" y="8.58313" width="1.01624" height="12.442" rx="0.508118" fill="#D9D9D9" stroke="#F44322" stroke-width="1.01624"/>
                            <rect x="10.1217" y="0.5" width="9.16235" height="3.71039" fill="#D9D9D9" stroke="#F44322"/>
                            <defs>
                            <filter id="filter0_d_174_388" x="0.540573" y="4.71045" width="28.3247" height="28.1874" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_174_388"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_174_388" result="shape"/>
                            </filter>
                            </defs>
                            </svg>
                            </div>
                        </div>
                            
                    </li>
                    ))}
                </ul>
                <div className="mb-5">
                    <h5>Notas del pedido(opcional)</h5>
                    <textarea name="" id="" onChange={handleChange} maxlength="255"></textarea>
                    <p className="text-end">{notes.length}-255</p>
                    <div className="text-center justify-content-center align-items-center mb-3"><button onClick={()=>goToPay()}>Continuar</button></div>
                </div>
            </div>
        </div>    
    )
}