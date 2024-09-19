import React, { useState, useEffect, useContext, useRef  } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import arrowImg from '../../assets/images/arrow.png';
import '../../styles/paypal.css';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


export const Paypal = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();


    return(
        <div className="container">
            <div className="container">
            <Link to="/shopping-cart"><img className="arrow-img" src={arrowImg} alt="" /></Link>
            </div>
            <div className="container text-center justify-content-center align-items-center">
                <h2 className="mt-3 mb-5">Elige tu método de pago:</h2>
                    <div className="container d-flex text-center justify-content-center align-items-center"> 
                        <PayPalScriptProvider options={{ clientId: "Ac7E9i0U-pGyDbSpJt2w1mQdUQHFKQL2K4EmkAxpVKU3rYT1VrgXO31C65XAH5h-Bai1QBQdOSdRCT7y" }}>
                            <PayPalButtons style={{ layout: "vertical" }}
                                createOrder={(data,actions)=>{
                                    return actions.order.create({
                                        purchase_units:[{
                                            amount:{
                                                value: 20,  // store.order.grand_total
                                            }
                                        }]
                                    })
                                }}

                                onApprove={(_,actions)=>{
                                    return actions.order.capture().then(details=>{
                                        console.log("COMPRA EXITOSA");
                                        console.log(details);
                                        navigate("/payment-made")
                                    })
                                }}
                               
                            />
                        </PayPalScriptProvider>
                    </div>
            </div>
        </div>
    )
}