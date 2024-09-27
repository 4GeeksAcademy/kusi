import React, { useState, useEffect, useContext, useRef  } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import check from '../../assets/images/check.png';


export const PaymentMade = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        localStorage.removeItem("listcart")
    },[])

    return(
        <div className="container">
            <div className="container text-center">
                <h2>Tu compra fue realizada!</h2>
                <div className="container mb-3"><img className="img-fluid" src={check} alt="" /></div>
                <div className="container">
                    <button onClick={()=>navigate("/orders")}className="btn btn-danger">Ir a mis pedidos</button>
                </div>
            </div>
        </div>
    )
}