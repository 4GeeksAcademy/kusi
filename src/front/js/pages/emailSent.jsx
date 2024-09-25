import React, { useState, useEffect, useContext, useRef  } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import send from '../../assets/images/send.png';


export const EmailSent = () => {
    const navigate = useNavigate();
    
    return(
    <div>
                <div className="container">
                    <div className="container text-center">
                        <div className="container mb-3"><img className="img-fluid" src={send} alt="" /></div>
                        <h2>¡Listo! Revisa tu bandeja de email</h2>
                        <h5>Te enviamos información sobre tus nuevas credenciales</h5>
                        <div className="container my-5">
                            <button onClick={()=>navigate("/login")} type="button" className="btn btn-danger">Volver a Iniciar Sesion</button>
                        </div>  
                    </div>
                </div>
            </div>
    )        

}