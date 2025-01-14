import React, { useState, useEffect, useContext, useRef  } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import forpassword from '../../assets/images/for-password.png';
import arrowImg from '../../assets/images/arrow.png';

export const ResetPassword = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [sendEmail,setSendEmail] = useState({})

    const handleChange = (e)=> {
        setSendEmail({[e.target.name]: e.target.value });
	}


    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            await actions.recoverPassword(sendEmail);
            navigate("/sent");
        } catch (error) {
            console.error(error);
        }
                       
		
    }


    return(
        <div className="container">
            <div className="container text-center">
                <div className="container-fluid text-start px-0">
                    <img className="arrow-img" src={arrowImg} onClick={()=>navigate("/login")}/>
                </div>
                <div className="container mb-4">
                    <img className="img-fluid" src={forpassword} alt="" />
                </div>
                <h2>¿Olvidaste tu contraseña?</h2>
                <h5>¡Descuida! Te enviaremos una nueva a tu correo.</h5>
                <form onSubmit={resetPassword} className="container">
                    <div className="container my-4">
                        <input className="inputLogin" name="email" type="email" placeholder="Ingresa tu correo aquí" required onChange={handleChange}></input>
                    </div>
                    <div className="container my-3">
                        <button type="submit" className="btn btn-danger">Cambiar contraseña</button>
                    </div>
                </form>
                
            </div>
        </div>
    )
}