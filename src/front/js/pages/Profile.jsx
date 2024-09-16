import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import userImg from '../../assets/images/user.png';
import arrowImg from '../../assets/images/arrow.png';
import '../../styles/profile.css'


export const Profile = () => {

    const [ userRole, setUserRole ] = useState("customer")
    


    const dataFake = {
        role:{
            customer: [
                {
                    name: "Gustabo",
                    phone: 912754827,
                    email: "gus@gmail.com",
                    password: "holasoygustabo",
                    registerDay: "2020-05-15"
                },
                {
                    name: "Veronica",
                    phone: 944345124,
                    email: "vero@gmail.com",
                    password: "holasoyvero",
                    registerDay: "2024-09-07"
                }
            ],
        
            chef: [
                {
                    name: "Martin",
                    phone: 914542547,
                    email: "martin@gmail.com",
                    password: "holasoymartin",
                    registerDay: "2023-12-01",
                    position: "Chef"
                },
                {
                    name: "Marina",
                    phone: 999453453,
                    email: "marinan@gmail.com",
                    password: "holasoymarina",
                    registerDay: "2022-02-10",
                    position: "Chef"
                }
            ],
        
            admin: [
                {
                    name: "Sebastian",
                    phone: 914535454,
                    email: "sebas@gmail.com",
                    password: "holasoysebas",
                    registerDay: "2017-11-02",
                    position: "Administrador"
                }
            ],
        },
    };

    const userData = dataFake.role[userRole]?.[0] || {};
       
    const registerClient = new Date(userData.registerDay)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = registerClient.toLocaleDateString('es-ES', options);


    return(
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="d-flex align-items-center w-100">
                <div className="d-flex justify-content-center align-items-center pe-3 pe-md-0" style={{width:"10%", height:"100px"}}>
                    <Link to="/">
                        <img className="arrow-img" src={arrowImg}/>
                    </Link>
                    
                </div>
                
                <div className="d-flex justify-content-center align-items-center" style={{width:"80%", height:"100px"}}>
                    <h1>Perfil</h1>
                </div>
            </div>
            <div className="container text-center">
                <div className="row d-flex justify-content-center align-items-center gap-3">
                    <div className="col-12 profile-box h-auto px-2 w-100 d-flex justify-content-center align-items-center">
                        <div className=" rounded profile-box-text px-0 px-lg-5 py-3 py-md-3 d-flex flex-column flex-md-row justify-content-center align-items-center border">
                            <div className="w-50 w-lg-25 py-2 d-flex justify-content-center align-items-center">
                                <img src={userImg} className="w-75"/>
                            </div>
                            <div className="w-100 d-flex flex-column justify-content-center text-center text-md-start ps-md-2 ps-lg-5">
                               <h4>{userData.name}</h4>
                               {
                                userRole === "admin" || userRole === "chef" ? (
                                    <p style={{marginTop: "8px"}} >{userData.position}</p>
                                ):("")
                               }
                               <p style={{marginBottom:"-2px"}}>Miembro desde el {formattedDate}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 px-2 d-flex justify-content-center ">
                        <div className="group-profile w-100 d-flex justify-content-center">
                            <div className="group-profile-text py-4 border rounded">
                                <h4 className="text-start ms-4">Información personal</h4>
                                <div className="d-flex flex-column flex-lg-row justify-content-evenly align-items-start">

                                    <div className="d-flex flex-column justify-content-center w-100">
                                        <div className="container-data py-3 px-5 px-lg-0 ms-lg-4 text-start">
                                            <h6 className="ms-1" style={{color:"#736F6F"}}>Nombre</h6>
                                            <input className="input-data w-100 py-2 border-0" type="text" defaultValue={userData.name}/>  
                                        </div>

                                        <div className="container-data py-3 px-5 px-lg-0 ms-lg-4 text-start">
                                            <h6 className="ms-1" style={{color:"#736F6F"}}>Correo</h6>
                                            <input className="input-data w-100 py-2 border-0" type="text" defaultValue={userData.email}/>  
                                        </div>

                                    </div>

                                    <div className="d-flex flex-column justify-content-center w-100">
                                        <div className="container-data py-3 px-5 px-lg-0 ms-lg-4 text-start">
                                            <h6 className="ms-1" style={{color:"#736F6F"}}>Teléfono</h6>
                                            <input className="input-data w-100 py-2 border-0" type="number" defaultValue={userData.phone}/>  
                                        </div>

                                        <div className="container-data py-3 px-5 px-lg-0 ms-lg-4 text-start">
                                            <h6 className="ms-1" style={{color:"#736F6F"}}>Contraseña</h6>
                                            <input className="input-data w-100 py-2 border-0" type="password" defaultValue={userData.password}/>  
                                        </div>
                                    </div>

                                    
                                </div>
                               <div className="w-100 py-4 text-start ps-5 ps-lg-4">
                                    <button type="button" className="btn btn-danger py-1 px-2 px-md-4 rounded-pill">
                                        Guardar
                                    </button>
                               </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}