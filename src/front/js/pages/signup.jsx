import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../../styles/signup.css';
import email from '../../img/email.png'
import padlock from '../../img/padlock.png'
import user from '../../img/user.png'
import phone from '../../img/phone.png'
import { Context } from '../store/appContext';
import kusilogo from '../../img/kusi-logo.png'


export const SignUp = () => {
    const {store,actions} = useContext(Context);
	const navigate = useNavigate();
    const [newDataUser,setnewDataUser] = useState({
        name: "",
		email: "",
        phone_number: "",
		password: ""
	})

    const captureData = (e)=> {
		let inputvalue = e.target.value
		let inputname = e.target.name
		setnewDataUser({...newDataUser,[inputname]:inputvalue})
	}


    const createAcount = async (e) => {
        e.preventDefault() 
        console.log(newDataUser);
        await actions.SignUp(newDataUser)
        
		navigate("/login")
		
	}






    return (
        <div className="container-login">
            <form onSubmit={createAcount} className="form-signup">
                    <div className="text-center justify-content-center align-items-center">
                        <div className="div-logo">
                            <img src={kusilogo} alt="" />
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="m-2">
                                <img src={user} alt="" />
                            </div>
                            <div><input name="name" className="inputLogin" placeholder="Ingresa tu nombre" type="text" id="inputUsername" required onChange={captureData} /></div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="m-2">
                                <img src={phone} alt="" />
                            </div>
                            <div><input name="phone_number" className="inputLogin" placeholder="Ingresa tu celular" type="text" id="inputPhone" onChange={captureData} /></div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="m-2">
                                <img src={email} alt="" />
                            </div>
                            <div><input name="email" className="inputLogin" placeholder="Ingresa tu correo" type="email" id="inputEmail" required onChange={captureData}/></div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="m-2">
                                <img src={padlock} alt="" />
                            </div>
                            <div><input name="password" className="inputLogin" placeholder="Crea tu contraseña" type="password" id="inputPassword" required onChange={captureData}/></div>
                        </div>
                        <div className="d-flex text-center justify-content-center align-items-center">
                            <button type="submit">Registrar</button>
                        </div>
                        <div className="d-flex text-center justify-content-center align-items-center m-2">
                            <div className="div-text mx-1">¿Ya tienes una cuenta? </div>
                            <div className="div-link"><Link to="/login" className="div-link"><span className="span">Inicia Sesión</span></Link></div>
                        </div>
                    </div>
            </form>
        </div>
    )
}