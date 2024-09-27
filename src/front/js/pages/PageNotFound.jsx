
import '../../styles/pageNotFound.css';
import huevo from "../../assets/images/huevo-notfound.png";
import React from 'react';
import { useNavigate } from 'react-router-dom';


export const PageNotFound = () => {

  const navigate = useNavigate()

  const handleClickHome = () => {
      navigate("/")
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center text-center vh-100'>
      <h1 style={{ fontSize: "10em", fontFamily: "Righteous, sans-serif", color: "#FF6347" }}>404</h1>
      <h2 style={{ fontSize: "3em", fontFamily: "Righteous, sans-serif", color: "#555" }}>Oops! Page Not Found</h2>

        <div className='container-image-egg'>
            <img className='image-egg' src={huevo}/>
        </div>

        <button 
            onClick={handleClickHome} 
            className="btn btn-danger mt-4"
        >
            Inicio
        </button>

        <p className='p-2 p-md-0' style={{ color: '#777', marginTop: '20px', fontSize: '1.2em' }}>
            Parece que te perdiste, ¡vuelve a la página principal!
        </p>
    </div>
  );
}


