import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import plateAndFork from '../../assets/images/plate-and-fork.png';
import plateAndKnife from '../../assets/images/plate-and-knife.png';
import kusiLogo from '../../assets/images/kusi-logo.png';
import '../../styles/landingPage.css';
import tacuTacu from "../../assets/images/tacuTacu.jpg"
import polloAlaBrasa from "../../assets/images/pollo-a-la-brasa.jpg"
import lomoSaltado from "../../assets/images/lomo-saltado.jpg"
import ceviche from "../../assets/images/ceviche.jpg"
import anticuchos from "../../assets/images/anticuchos.jpg"
import ajiDeGallina from "../../assets/images/Aji-de-Gallina.jpeg"
import {Wave, WaveFlipped} from "../component/Wave.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';




export default function LandingPage() {
    const [dishes, setDishes] = useState([
        {
            image: tacuTacu,
            name: "Tacu Tacu",
            slogan: '"Un clásico lleno de sabor y textura. El Tacu Tacu es la mezcla perfecta de tradición y modernidad."',
        },
        {
            image: polloAlaBrasa,
            name: "Pollo a la Brasa",
            slogan: '"Jugoso, dorado y con ese toque ahumado que lo hace irresistible. Nuestro Pollo a la Brasa es simplemente inolvidable."',
        },
        {
            image: lomoSaltado,
            name: "Lomo Saltado",
            slogan: '"El equilibrio perfecto entre lo salteado y lo jugoso. ¡El Lomo Saltado te hará querer repetir!"',
        },
        {
            image: ceviche,
            name: "Ceviche",
            slogan: '"Frescura en cada bocado. Disfruta de la explosión de sabores del mejor Ceviche peruano, directamente en tu mesa."',
        },
        {
            image: anticuchos,
            name: "Anticuchos",
            slogan: '"Sabrosos y jugosos, nuestros anticuchos están llenos del auténtico sabor peruano. ¡Un clásico irresistible que no puedes dejar de probar!"',
        },
        {
            image: ajiDeGallina,
            name: "Ají de Gallina",
            slogan: '"Una receta casera con un toque de tradición y sabor inconfundible. Déjate llevar por la suavidad y la riqueza del Ají de Gallina."',
        }
    ]);


   

    const responsive = {
        allScreens: {
            breakpoint: { max: 4000, min: 0 },
            items: 1
        }
    };

    return (
        <div className="landing-container container-fluid p-0">
        <div className="row g-0 vh-100">
            <div className="landing-img-1 col-md-2 col-lg-1 d-none d-md-flex flex-column justify-content-end">
                <img className="img-fluid" src={plateAndKnife} alt="Plate and knife" />
            </div>
            <div className="landing-content col-12 col-md-8 col-lg-10 d-flex flex-column justify-content-center align-items-center px-3 px-md-5">
                <div className="logo-container w-100 mb-5 pb-3 pb-md-5 d-flex justify-content-center align-items-center">
                    <img className="img-fluid logo-kusi w-25 w-lg-75" style={{ maxWidth: "250px" }} src={kusiLogo} alt="Logo Kusi" />
                </div>
                <div className="landing-text text-center mb-4 mb-md-5">
                    <h1 className="px-4 px-md-1" style={{ fontSize: "5vw" }}>
                        Descubre los auténticos sabores del Perú en cada bocado
                    </h1>
                </div>
                <div className="d-flex flex-column flex-lg-row gap-3 mt-4 mt-md-5">
                    <Link to="/login" className="div-link">
                        <button type="button" className="btn btn-danger py-2 px-4 px-md-5 fs-4 rounded-pill" style={{width:"100%"}}>
                            Iniciar sesión
                        </button>
                    </Link>
                    <Link to="/signup" className="div-link">
                        <button type="button" className="btn btn-outline-dark py-2 px-4 px-md-5 fs-4 hover-white rounded-pill" style={{width:"100%"}}>
                            Registrarse
                        </button>
                    </Link>
                </div>
            </div>
            <div className="landing-img-2 col-md-2 col-lg-1 d-none d-md-flex flex-column justify-content-start">
                <img className="img-fluid" src={plateAndFork} alt="Plate and fork" />
            </div>
        </div>

        <Wave/>

        <div className="bg-black d-flex justify-content-center align-items-center py-5" style={{ minHeight: "80vh", zIndex:"1050"}}>
                <div className='w-75'>
                    {dishes.length > 0 ? (
                        <Carousel
                            responsive={responsive}
                            autoPlay={true}
                            autoPlaySpeed={3000}
                            infinite={true}
                            showDots={true}
                            arrows={false}
                        >
                            {dishes.map((dish, index) => (
                                <div 
                                    key={index} 
                                    className='container-card d-flex flex-column gap-4 justify-content-center align-items-center p-3 p-md-4' 
                                    style={{maxWidth:"1200px", height:"auto" }}
                                >
                                    <div className='container-card-image d-flex justify-content-center align-items-center'>
                                        <img 
                                            className='image-card rounded-circle hover-scale' 
                                            style={{ width: "300px", height: "300px", objectFit: "cover" }} 
                                            src={dish.image} 
                                            alt={dish.name} 
                                        />
                                    </div>
                                    <div className='container-card-description text-center'>
                                        <h2 className='text-white mb-3'>{dish.name}</h2>
                                        <p className='text-white fs-5'>{dish.slogan}</p>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    ) : (
                        <div className="text-center text-white">Cargando platos...</div>
                    )}
                </div>
            </div>


        <WaveFlipped/>

            
        <div className="container-fluid bg-white py-5">
                <div className="row justify-content-center text-center">
                    <div className="col-12 col-md-8">
                        <h2 className="text-dark mb-5" style={{ fontSize: "3rem"}}>
                            Sobre <span style={{color:"#F44322"}}>Kusi</span>
                        </h2>
                        <div className="row">
                            <div className="col-md-4 mb-4 hover-scale">
                                <FontAwesomeIcon icon={faUtensils} style={{color: "#F44322", fontSize:"3.5rem"}}/>
                                <h3 className="mt-3">Auténtico</h3>
                                <p>Sabores genuinos de la cocina peruana</p>
                            </div>
                            <div className="col-md-4 mb-4 hover-scale">
                                <FontAwesomeIcon icon={faLeaf} style={{color: "#F44322", fontSize:"3.5rem"}}/>
                                <h3 className="mt-3">Fresco</h3>
                                <p>Ingredientes de la más alta calidad</p>
                            </div>
                            <div className="col-md-4 mb-4 hover-scale">
                                <FontAwesomeIcon icon={faAward} style={{color: "#F44322", fontSize:"3.5rem"}}/>
                                <h3 className="mt-3">Original</h3>
                                <p>Reconocidos por nuestra excelencia culinaria</p>
                            </div>
                        </div>
                        <p className="lead text-dark mt-4">
                            Disfruta de una experiencia culinaria inolvidable con nuestros platos tradicionales peruanos.
                        </p>
                        <p className="text-muted mt-4">#Auténtico #Fresco #Delicioso</p>
                    </div>
                </div>
            </div>

        <Wave/>

        <div className="container-fluid bg-black text-white py-5 text-center" style={{minHeight:"50vh"}}>
            <h2 className="mb-4" style={{ color: "#F44322", fontSize: "2.5rem" }}>¡Haz tu compra ahora!</h2>
            <p className="lead mb-5">Regístrate o inicia sesión para descubrir nuestras ofertas exclusivas y disfrutar de una experiencia culinaria inigualable.</p>
            <button 
                className="btn btn-danger btn-lg mt-3 px-5 py-3 hover-scale"
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            >
                Regístrate / Inicia Sesión
            </button>
        </div>

    </div>
    );
}
