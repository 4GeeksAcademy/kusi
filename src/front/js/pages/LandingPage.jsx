import React from "react";
import landingImage_1 from "../../img/landingImage_1.png"
import landingImage_2 from "../../img/landingImage_2.png"
import logoKusi from "../../img/Kusi.png"
import "../../styles/landingPage.css";

export const LandingPage = () => {
    return (
        <div className="landing-container container-fluid p-0">
            <div className="row g-0 vh-100">
                <div className="landing-img-1 col-md-2 col-lg-1 d-none d-md-flex flex-column justify-content-end">
                    <img className="img-fluid" src={landingImage_1} alt="Landing image 1" />
                </div>
                <div className="landing-content col-12 col-md-8 col-lg-10 d-flex flex-column justify-content-center align-items-center px-3 px-md-5">
                    <div className="logo-container w-100 mb-5 pb-3 pb-md-5 d-flex justify-content-center align-items-center" >
                        <img className="img-fluid logo-kusi w-25 w-lg-75" style={{maxWidth:"250px"}} src={logoKusi} alt="Logo Kusi"/>
                    </div>
                    <div className="landing-text text-center mb-4 mb-md-5">
                        <h1 className="px-4 px-md-1" style={{fontSize:"6vw"}}>Descubre los auténticos sabores del Perú en cada bocado</h1> 
                    </div>
                    <div className="d-flex flex-column flex-lg-row gap-3 mt-4 mt-md-5">
                        <button type="button" className="btn-login py-2 px-4 px-md-5 fs-4 rounded-pill">Iniciar sesión</button>
                        <button type="button" className="btn-signup py-2 px-4 px-md-5 fs-4 hover-white rounded-pill">Registrarse</button>
                    </div> 
                </div>
                <div className="landing-img-2 col-md-2 col-lg-1 d-none d-md-flex flex-column justify-content-start">
                    <img className="img-fluid" src={landingImage_2} alt="Landing image 2" />
                </div>
            </div>
        </div>
    )
}