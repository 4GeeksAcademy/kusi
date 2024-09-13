import React, { useState } from "react";
import userImg from '../../assets/images/user.png';

export const Profile = () => {

    const [ userRole, setUserRole ] = useState("admin")



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
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="container text-center">
                <div className="row d-flex justify-content-center align-items-center  gap-5">
                    <div className="col-12 h-auto bg-primary d-flex justify-content-center align-items-center p-2">
                        <div className="bg-danger px-2 px-lg-5 py-3 w-50 d-flex flex-column flex-md-row justify-content-center align-items-center">
                            <div className="w-50 w-lg-25 d-flex justify-content-center align-items-center">
                                <img src={userImg} className="w-100"/>
                            </div>
                            <div className="w-100 d-flex flex-column justify-content-center text-center text-md-start ps-md-2 ps-lg-5">
                               <h5>{userData.name}</h5>
                               {
                                userRole === "admin" || userRole === "chef" ? (
                                    <p>{userData.position}</p>
                                ):("")
                               }
                               <p>Miembro desde el {formattedDate}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 bg-secondary d-flex justify-content-center">
                        <div className="w-100 d-flex justify-content-center">
                            <div className="w-50 bg-success">
                                <h1>Hola</h1>
                                <div>
                                    <div>
                                      <h5>Nombre</h5>
                                        <input type="text" defaultValue={userData.name}/>  
                                    </div>

                                    <div>
                                      <h5>Correo</h5>
                                        <input type="text" defaultValue={userData.email}/>  
                                    </div>

                                    <div>
                                      <h5>Teléfono</h5>
                                        <input type="number" defaultValue={userData.phone}/>  
                                    </div>

                                    <div>
                                      <h5>Contraseña</h5>
                                        <input type="password" defaultValue={userData.password}/>  
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}