import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { Context } from '../store/appContext';
import userImg from '../../assets/images/user.png';
import arrowImg from '../../assets/images/arrow.png';
import '../../styles/profile.css'


export const Profile = () => {

    const { store, actions } = useContext(Context);
    const [userId, setUserId] = useState(6);
    const [userNewData, setUserNewData] = useState({
        email: '',
        name: '',
        phone_number: '',
        is_active: true,
        profile_picture_url: '',
    });


    const handleChange = (e) => {
        setUserNewData({
            ...userNewData,
            [e.target.name]: e.target.value
        });
    }

    const handleUpdate = async () => {
        try {
            const updatedUser = await actions.updateUser(userId, userNewData);
            console.log("Usuario actualizado con éxito", updatedUser)
        } catch (e) {
            console.error("Error al actualizar el usuario", e); //
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await actions.getUsers();
                await actions.getUsersById(userId);
            } catch (e) {
                console.error("Error al obtener los datos del usuario", e); //
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (store.dataUsersById) {
            setUserNewData({
                email: store.dataUsersById.email || '',
                name: store.dataUsersById.name || '',
                phone_number: store.dataUsersById.phone_number || '',
                is_active: store.dataUsersById.is_active || true,
                profile_picture_url: store.dataUsersById.profile_picture_url || '',
            });
        }
    }, [store.dataUsersById]);

    const userData = store.dataUsersById || {};
    const registerClient = new Date(userData.created_at);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = registerClient.toLocaleDateString('es-ES', options);

    const roleMapping = {
        "RoleName.CHEF": "Chef",
        "RoleName.ADMIN": "Administrador",
        "RoleName.CLIENT": "Cliente"
    };

    
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
                        <div className=" rounded profile-box-text px-0 px-lg-5 py-3 py-md-3 d-flex flex-column flex-lg-row justify-content-center align-items-center border">
                            <div className="w-50 w-lg-25 py-2 d-flex justify-content-center align-items-center">
                                <img src={userData?.profile_picture_url} onError={(e) => e.target.src = userImg} className="w-75"/>
                            </div>
                            <div className="w-100 d-flex flex-column justify-content-center text-center text-lg-start ps-md-2 ps-lg-5">
                               <h4 style={{marginTop: "20px"}}>{userData?.name}</h4>
                               {
                                userData?.role?.name === "RoleName.CHEF" || userData?.role?.name === "RoleName.ADMIN" ? (
                                    <p style={{marginTop: "-2px"}} >{roleMapping[userData?.role?.name]}</p>
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
                                            <input className="input-data w-100 py-2 border-0" type="text" name="name" defaultValue={userData?.name} onChange={handleChange}/>  
                                        </div>

                                        <div className="container-data py-3 px-5 px-lg-0 ms-lg-4 text-start">
                                            <h6 className="ms-1" style={{color:"#736F6F"}}>Correo</h6>
                                            <input className="input-data w-100 py-2 border-0" type="text" name="email" defaultValue={userData?.email} onChange={handleChange}/>  
                                        </div>

                                    </div>

                                    <div className="d-flex flex-column justify-content-center w-100">
                                        <div className="container-data py-3 px-5 px-lg-0 ms-lg-4 text-start">
                                            <h6 className="ms-1" style={{color:"#736F6F"}}>Teléfono</h6>
                                            <input className="input-data w-100 py-2 border-0" type="number" name="phone" defaultValue={userData?.phone_number} onChange={handleChange}/>  
                                        </div>

                                        <div className="container-data py-3 px-5 px-lg-0 ms-lg-4 text-start">
                                            <h6 className="ms-1" style={{color:"#736F6F"}}>Contraseña</h6>
                                            <input className="input-data-password w-100 py-2 rounded-pill px-3" type="password" name="password" defaultValue={""} onChange={handleChange}/>
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
    );
}