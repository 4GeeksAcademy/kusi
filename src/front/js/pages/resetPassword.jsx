import React, { useState, useEffect, useContext, useRef  } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import forpassword from '../../assets/images/for-password.png';


export const ResetPassword = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [sendEmail,setSendEmail] = useState("")

    const handleChange = (e)=> {
        let email = e.target.value
		setSendEmail(email)
	}


    const resetPassword = () => {

		try{
            // actions.recoverPassword(sendEmail)
            navigate("/email-sent")           
		}catch(e){
			console.error(e);
		}
    }


    return(
        <div className="container">
            <div className="container text-center">
                <div className="container mb-4"><img className="img-fluid" src={forpassword} alt="" /></div>
                <h2>¿Olvidaste tu contraseña?</h2>
                <h5>Descuida! Te enviaremos una nueva a tu email. </h5>
                <form onSubmit={resetPassword} className="container">
                    <div className="container my-4">
                        <input className="inputLogin" name="email" type="email" placeholder="Ingresa tu email aquí" required onChange={handleChange}></input>
                    </div>
                    <div className="container my-3">
                        <button type="submit" className="btn btn-danger">Cambiar contraseña</button>
                    </div>
                </form>
                
            </div>
        </div>
    )
}