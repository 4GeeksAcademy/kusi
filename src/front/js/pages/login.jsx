import React, { useState, useEffect, useContext, useRef  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/login.css';
import email from '../../img/email.png'
import padlock from '../../img/padlock.png'
import kusilogo from '../../img/kusi-logo.png'
import { Context } from '../store/appContext';



export const Login = () => {
    const { store, actions } = useContext(Context);
	const navigate = useNavigate();
    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);

    const [dataLogin,setDataLogin] = useState({
		email: "",
		password: ""
	})



	const captureData = (e)=> {
		let inputvalue = e.target.value
		let inputname = e.target.name
		setDataLogin({...dataLogin,[inputname]:inputvalue})
	}



    const checkFocus = (e) => {
        if (inputRef1.current && dataLogin.email.trim() === "") {
          e.preventDefault(); 
          e.stopPropagation();
          inputRef1.current.focus(); 
        }
      };

    const sendLogin = async (e) => {
		// console.log(dataLogin);
		
		e.preventDefault() 
		try{
			// await actions.Login(dataLogin)
			// setDataLogin({
			// 	email: "",
			// 	password: ""
			// })
			// if ( localStorage.getItem("token")) {
			// 	navigate("/")
			// 	console.log(localStorage.getItem("token"));
				
			// }
            if (dataLogin.email !== "" && dataLogin.password !== "" ) {
                // await actions.Login(dataLogin)
                localStorage.setItem("email" , dataLogin.email)
                localStorage.setItem("password" , dataLogin.password)
                // console.log("datos guardados"+localStorage.getItem("email")+localStorage.getItem("password"))
                setDataLogin({
                    email: "",
                    password: "",
                })
                navigate("/") // validar si hay token en localstorage para navigate a viewuser
            }
            
		}catch(e){
			console.error(e);
			
		}
	}




    return (
        <div className="container-login">
            
            <form onSubmit={sendLogin} className="form-signup">
            
                <div className="text-center justify-content-center align-items-center">
                    <div className="div-logo">
                        <img src={kusilogo} alt="" />
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="div-icons"> 
                            <img src={email} alt="" />
                        </div>
                        <div className="div-icons"><input ref={inputRef1} onFocus={checkFocus} className="inputLogin" placeholder="Ingresa tu correo" type="email" id="inputEmail" name="email" onChange={captureData} required /></div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="div-icons">
                            <img src={padlock}alt="" id="padlock" />
                        </div>
                        <div className="div-icons"><input ref={inputRef2} onFocus={checkFocus} className="inputLogin" placeholder="Ingresa tu contraseña" type="password" id="inputPassword" name="password" onChange={captureData} required /></div>
                    </div>
                    <div className="div-link">
                        <Link to="/" ><span className="span">¿Olvidaste tu Contraseña?</span></Link>
                    </div>
                    <div className="d-flex text-center justify-content-center align-items-center">
                        <button type="submit">Ingresar</button>
                    </div>
                    <div className="d-flex text-center justify-content-center align-items-center mt-2">
                        <div className="div-text mx-1">¿Nuevo por aqui?</div>
                        <div className="div-link"><Link to="/signup" className="div-link"><span className="span">Regístrate</span></Link></div>
                    </div>
                </div>
            </form>
        </div>
    )
}