import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";

import { Context } from "../store/appContext";


export const Login = () => {

    return (
        <div className="container">
            <div></div>
                <div className="text-center justify-content-center align-items-center">
                    <div className="d-flex justify-content-center align-items-center">
                        <div><svg width="30" height="30" viewBox="0 0 49 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M41.8871 0H7.1129C5.22709 0.00205137 3.41911 0.737595 2.08563 2.04525C0.752157 3.35291 0.00209187 5.12589 0 6.9752V28.0248C0 31.8705 3.19132 35 7.1129 35H41.8871C45.8087 35 49 31.8705 49 28.0248V6.9752C49 3.12954 45.8087 0 41.8871 0ZM39.7848 4.65013L37.6035 6.33968L25.97 15.3454C25.1006 16.012 23.8994 16.012 23.03 15.3454L11.8074 6.64969L9.2199 4.65013H39.7848ZM41.8871 30.3499H7.1129C5.80571 30.3499 4.74194 29.3067 4.74194 28.0248V7.12245L20.09 19.0035C21.3861 20.0111 22.951 20.5071 24.5 20.5071C26.049 20.5071 27.6139 20.0111 28.91 19.0035L44.2581 7.1271V28.0248C44.2581 29.3067 43.1943 30.3499 41.8871 30.3499Z" fill="#6E6969"/>
                            </svg>
                        </div>
                        <div><input className="inputLogin" placeholder="Ingresa tu correo" type="text" id="inputEmail" /></div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <div>
                        <svg width="30" height="30" viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.2 40H40.8C42.7096 40 44.5409 39.398 45.8912 38.3263C47.2414 37.2547 48 35.8012 48 34.2857V17.1429C48 15.6273 47.2414 14.1739 45.8912 13.1022C44.5409 12.0306 42.7096 11.4286 40.8 11.4286H36V9.52381C36 6.99794 34.7357 4.57552 32.4853 2.78946C30.2348 1.0034 27.1826 0 24 0C20.8174 0 17.7652 1.0034 15.5147 2.78946C13.2643 4.57552 12 6.99794 12 9.52381V11.4286H7.2C5.29044 11.4286 3.45909 12.0306 2.10883 13.1022C0.75857 14.1739 0 15.6273 0 17.1429V34.2857C0 35.8012 0.75857 37.2547 2.10883 38.3263C3.45909 39.398 5.29044 40 7.2 40ZM16.8 9.52381C16.8 8.00829 17.5586 6.55484 18.9088 5.4832C20.2591 4.41156 22.0904 3.80952 24 3.80952C25.9096 3.80952 27.7409 4.41156 29.0912 5.4832C30.4414 6.55484 31.2 8.00829 31.2 9.52381V11.4286H16.8V9.52381ZM4.8 17.1429C4.8 16.6377 5.05286 16.1532 5.50294 15.796C5.95303 15.4388 6.56348 15.2381 7.2 15.2381H40.8C41.4365 15.2381 42.047 15.4388 42.4971 15.796C42.9471 16.1532 43.2 16.6377 43.2 17.1429V34.2857C43.2 34.7909 42.9471 35.2754 42.4971 35.6326C42.047 35.9898 41.4365 36.1905 40.8 36.1905H7.2C6.56348 36.1905 5.95303 35.9898 5.50294 35.6326C5.05286 35.2754 4.8 34.7909 4.8 34.2857V17.1429Z" fill="#6E6969"/>
                            <path d="M23.9997 29.5238C26.6507 29.5238 28.7997 27.8183 28.7997 25.7143C28.7997 23.6104 26.6507 21.9048 23.9997 21.9048C21.3487 21.9048 19.1997 23.6104 19.1997 25.7143C19.1997 27.8183 21.3487 29.5238 23.9997 29.5238Z" fill="#6E6969"/>
                            </svg>
                        </div>
                        <div><input className="inputLogin" placeholder="Ingresa tu contraseña" type="password" id="inputPassword" /></div>
                    </div>
                    <div>
                        <Link to="/" className="div-link"><span className="span">¿Olvidaste tu Contraseña?</span></Link>
                    </div>
                    <div className="d-flex text-center justify-content-center align-items-center">
                        <button type="submit">Ingresar</button>
                    </div>
                    <div className="d-flex text-center justify-content-center align-items-center">
                        <div className="div-text">¿Nuevo por aqui?</div>
                        <div className="div-link"><Link to="/signup" className="div-link"><span className="span">Regístrate</span></Link></div>
                    </div>
                </div>
        </div>
    )
}