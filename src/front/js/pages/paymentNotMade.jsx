import React, { useState, useEffect, useContext, useRef  } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import errorface from '../../assets/images/errorface.png';


export const PaymentNotMade = () => {
    const navigate = useNavigate();


    return(
        <div className="container">
            <div className="container text-center">
                <h2>Oh no! La compra no fue realizada.</h2>
                <div className="container mb-3"><img className="img-fluid" src={errorface} alt="" /></div>
                <div className="container">
                    <button onClick={()=>navigate("/payment")}className="btn btn-danger">Volver</button>
                </div>
            </div>
        </div>
    )
}