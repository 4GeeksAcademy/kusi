import React from "react";
import landingImage_1 from "../../img/landingImage_1.png"
import landingImage_2 from "../../img/landingImage_2.png"
import "../../styles/landingPage.css";

export const LandingPageCopia = () => {
    return(
        <div className="landing-container w-100 d-flex justify-content-between" style={{height:"100vh"}}>
            <div className="landing-img-1 d-flex flex-column" style={{height:"100vh", width:"25%"}}>
                <img className="img-1 w-100" style={{marginTop: "auto"}} src={landingImage_1}/>
            </div>
            <div className="landing-content d-flex flex-column justify-content-center align-items-center px-5">
               <div className="landing-text text-center pb-5" >
                    <h1 style={{fontSize:"6vw"}}>Descubre los auténticos sabores del Perú en cada bocado</h1> 
                </div>
                <div className="d-flex gap-3 pt-5">
                    <button type="button" className="btn py-2 px-5 fs-5 text-white" style={{background:"#F44322", borderRadius:"50px"}}>Iniciar sesión</button>
                    <button type="button" className="btn py-2 px-5 fs-5 text-dark hover-white border-dark" style={{borderRadius:"50px"}}>Registrarse</button>
                </div> 
            </div>
            <div className="landing-img-2 d-flex flex-column" style={{height:"100vh", width:"25%"}}>
                <img className="img-2 w-100" src={landingImage_2}/>
            </div>
        </div>
    )
}