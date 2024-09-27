import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { Context } from '../store/appContext';
import userImg from '../../assets/images/user.png';
import arrowImg from '../../assets/images/arrow.png';
import '../../styles/profile.css'
import { jwtDecode } from 'jwt-decode';
import { Navbar } from "../component/Navbar.jsx";



export const Profile = () => {

    let navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [userNewData, setUserNewData] = useState({
        email: "",
        name: "",
        phone_number: "",
        is_active: true,
        profile_picture_url: "",
    });

    const uploadImage = async (e) => {
        await actions.uploadImage(e)
        setUserNewData({ ...userNewData, ["profile_picture_url"]: store.imageUrl });
    }

    const handleChange = (e) => {
        setUserNewData({
            ...userNewData,
            [e.target.name]: e.target.value
        });
    }

    const handleUpdate = async () => {
        await actions.updateUser(userNewData.id, userNewData);
        setUserNewData(store.dataUsersById)
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            try {
                const decodedToken = jwtDecode(localStorage.getItem("token"));
                if (decodedToken.sub.id!=0) {
                    const fetchData = async () => {
                        try {
                            await actions.getUsersById(decodedToken.sub.id);
                            setUserNewData(store.dataUsersById)
                        } catch (e) {
                            console.error("Error al obtener los datos del usuario", e);
                        }
                    };
                    fetchData();
                }
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    const registerClient = new Date(userNewData.created_at||"");
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = registerClient.toLocaleDateString('es-ES', options);


    const Roles = Object.freeze({
        CLIENT: 1,
        CHEF: 2,
        ADMIN: 3,
    });

    const UserRoles = {
        [Roles.CLIENT]: "Cliente",
        [Roles.CHEF]: "Chef",
        [Roles.ADMIN]: "Administrador",
    };

    
    return(
        <>
        <Navbar/>
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        
            <div className="d-flex align-items-center w-50">
                <div className="d-flex justify-content-center align-items-center pe-3 pe-md-0" style={{width:"10%", height:"100px"}}>
                    <img className="arrow-img" src={arrowImg} onClick={()=>navigate(-1)}/>
                    
                </div>
                
                <div className="d-flex justify-content-center align-items-center" style={{width:"80%", height:"100px"}}>
                    <h1>Perfil</h1>
                </div>
            </div>
            <div className="container text-center">
                <div className="row d-flex justify-content-center align-items-center gap-3">
                    <div className="col-12 profile-box h-auto px-2 w-100 d-flex justify-content-center align-items-center">
                        <div className=" rounded profile-box-text px-0 px-lg-5 py-3 py-md-3 d-flex flex-column flex-lg-row justify-content-center align-items-center border">
                            <div className="w-50 w-lg-25 py-2 d-flex justify-content-center align-items-center">
                                {/* <img src={userData?.profile_picture_url} onError={(e) => e.target.src = userImg} className="w-75"/> */}
                                <label for="image">
                                <img src={userNewData.profile_picture_url  || "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"} onError={(e) => e.target.src = userImg} className="w-75 imgProfile"/>
                                <input type="file" name="image" id="image" onChange={uploadImage} style={{display:"none"}}/>
                                </label>
                            </div>
                            <div className="w-100 d-flex flex-column justify-content-center text-center text-lg-start ps-md-2 ps-lg-5">
                               <h4 style={{marginTop: "20px"}}>{userNewData.name|| "Desconocido"}</h4>
                               {
                                userNewData.role_id === 2 || userNewData.role_id === 3 ? (
                                    <p style={{marginTop: "-2px"}} >{UserRoles[userNewData.role_id||0]}</p>
                                ):("")
                               }
                               <p style={{ marginTop:"-10px"}}>Miembro desde el {formattedDate}</p>
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
                                            <h6 className="ms-1" style={{color:"#736F6F"}} >Nombre</h6>
                                            <input className="input-data w-100 py-2 border-0" type="text" name="name" value={userNewData.name} onChange={handleChange}/>  
                                        </div>

                                        <div className="container-data py-3 px-5 px-lg-0 ms-lg-4 text-start">
                                            <h6 className="ms-1" style={{color:"#736F6F"}}>Correo</h6>
                                            <input className="input-data w-100 py-2 border-0" type="email" name="email" value={userNewData.email} onChange={handleChange}/>  
                                        </div>

                                    </div>

                                    <div className="d-flex flex-column justify-content-center w-100">
                                        <div className="container-data py-3 px-5 px-lg-0 ms-lg-4 text-start">
                                            <h6 className="ms-1" style={{color:"#736F6F"}}>Teléfono</h6>
                                            <input className="input-data w-100 py-2 border-0" type="text" name="phone_number" value={userNewData.phone_number}  onChange={handleChange}/>  
                                        </div>

                                        <div className="container-data py-3 px-5 px-lg-0 ms-lg-4 text-start">
                                            <h6 className="ms-1" style={{color:"#736F6F"}}>Contraseña</h6>
                                            <input className="input-data-password w-100 py-2 rounded-pill px-3" type="password" name="password" value={""} disabled/>
                                        </div>
                                    </div>

                                    
                                </div>
                               <div className="w-100 py-4 text-start ps-5 ps-lg-4">
                                    <button type="button" className="btn btn-danger py-1 px-2 px-md-4 rounded-pill" onClick={handleUpdate}>
                                        Guardar
                                    </button>
                               </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}