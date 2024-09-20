import React, { useState, useEffect, useContext, useRef  } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import arrowImg from '../../assets/images/arrow.png';
import '../../styles/paypal.css';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


export const Paypal = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const initialOptions = {
        clientId: "Ac7E9i0U-pGyDbSpJt2w1mQdUQHFKQL2K4EmkAxpVKU3rYT1VrgXO31C65XAH5h-Bai1QBQdOSdRCT7y",
        currency: "USD",
        intent: "capture",
        locale: "es_PE"
    };


    return(
        <div className="container">
            <div className="container">
            <Link to="/shopping-cart"><img className="arrow-img" src={arrowImg} alt="" /></Link>
            </div>
            <div className="container text-center justify-content-center align-items-center">
                <h2 className="mt-3 mb-5">Elige tu método de pago:</h2>
                    <div className="container d-flex text-center justify-content-center align-items-center paypal"> 
                        <PayPalScriptProvider options={initialOptions}>
                            <PayPalButtons style={{ layout: "vertical", color: "silver", shape: "pill", }}
                                createOrder={(data,actions)=>{
                                    return actions.order.create({
                                        purchase_units:[{
                                            amount:{
                                                value:  153
                                            }
                                        }]
                                    })
                                }}

                                onApprove={(_,actionsp)=>{
                                    return actionsp.order.capture().then(details=>{
                                        
                                        console.log("COMPRA EXITOSA");
                                        console.log(details);
                                        navigate("/payment-made")
                                        actions.createOrder();
                                    })
                                    
                                }}
                               
                            />
                        </PayPalScriptProvider>
                    </div>
            </div>
        </div>
    )
}