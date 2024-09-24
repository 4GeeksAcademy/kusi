import React, { useEffect, useState, useContext, useRef } from "react";
import { Context } from "../store/appContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart, faFire, faBan, faUtensils, faPen,faPlus,faTrash } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from "../component/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import "../../styles/employees.css"
import { jwtDecode } from 'jwt-decode';
import { UserModal } from "../component/UserModal.jsx";

export const Users = () => {
    const { store, actions } = useContext(Context); 
    const [idUser, SetIdUser] = useState(0);

    useEffect(() => {

        const fetchData = async () => {
            if (localStorage.getItem("token")) {
                try {
                    const decodedToken = jwtDecode(localStorage.getItem("token"));
                    //console.log(decodedToken.sub)
    
                    await actions.getUsers();
    
                    //setRoleId(decodedToken.sub.role_id);
                } catch (error) {
                    console.error("Error decoding token:", error);
                }
            } else {
                setRoleId(0);
            }
        };
        fetchData();
        
    }, []);


    const handleNewEmployee = () => SetIdUser(0);
    const handleDetailsUser = (id) => SetIdUser(id);
    const handleDeleteUser = async (id) => {
        await actions.deleteUser(id);
    }
    const roles = Object.freeze({
        GUEST: 0,
        CLIENT: 1,
        CHEF: 2,
        ADMIN: 3,
    });

    const rolesName = {
        [roles.GUEST]: "Invitado",
        [roles.CLIENT]: "Cliente",
        [roles.CHEF]: "Cocinero",
        [roles.ADMIN]: "Administrador"
    };

    return (
        <div>
            <Navbar/>
            <UserModal id ={idUser} />
            

            <div className="container h-100 mt-5">


                <ul className="nav nav-tabs " id="myTab" role="tablist">
                    <li className="nav-item w-50" role="presentation">
                        <button className="nav-link w-100 d-flex active" id="employees-tab" data-bs-toggle="tab" data-bs-target="#employees-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                            <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{handleNewEmployee()}}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <span className="spanEmployees">Empleados</span>    
                        </button>
                    </li>
                    <li className="nav-item w-50" role="presentation">
                        <button className="nav-link w-100" id="clients-tab" data-bs-toggle="tab" data-bs-target="#clients-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Clientes</button>
                    </li>
                </ul>

                <div className="tab-content mt-5" id="myTabContent">
                    <div className="tab-pane fade show active" id="employees-tab-pane" role="tabpanel" aria-labelledby="employees-tab" tabIndex="0">

                    {store.employees.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-hover text-center">
                                    <thead >
                                        <tr>
                                            <th></th>
                                            <th>NOMBRE</th>
                                            <th>EMAIL</th>
                                            <th>CELULAR</th> 
                                            <th>CREADO</th> 
                                            <th>ROL</th>
                                            <th>ESTADO</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {store.employees.map((item) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <button className="btn btn-dark mx2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{handleDetailsUser(item.id)}}>
                                                            <FontAwesomeIcon icon={faPen} />
                                                        </button>
                                                        <button className="btn btn-danger mx-2" onClick={()=>{handleDeleteUser(item.id)}}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </td>
                                                    <td>{item.name||""}</td>
                                                    <td>{item.email||""}</td>
                                                    <td>{item.phone_number||""}</td>
                                                    <td>{new Date(item.created_at).toLocaleDateString('es-ES')||""}</td>
                                                    <td>
                                                        <p
                                                            className={item.role_id === roles.CLIENT ? "py-1 text-primary " : item.role_id === roles.CHEF  ? "py-1 text-warning" : item.role_id === roles.ADMIN  ? "py-1 text-success" : "py-1 text-danger" }
                                                            style={{width:"100%", textAlign:"center", borderRadius:"50px"}}
                                                        >
                                                                {rolesName[item.role_id] || rolesName[roles.GUEST] }
                                                        </p>
                                                        {/* border border-primary  */}
                                                    </td>
                                                    <td>
                                                        <span className={item.is_active === true ? "badge text-bg-primary " : "badge text-bg-danger" }>{item.is_active === true?"Activo":"Inactivo"}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            ):(
                                <p>No hay datos que mostrar</p>
                            )
                        } 

                    </div>
                    <div className="tab-pane fade" id="clients-tab-pane" role="tabpanel" aria-labelledby="clients-tab" tabIndex="0">

                    {store.clients.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-hover text-center">
                                    <thead >
                                        <tr>
                                            <th></th>
                                            <th>NOMBRE</th>
                                            <th>EMAIL</th>
                                            <th>CELULAR</th> 
                                            <th>CREADO</th> 
                                            <th>ROL</th>
                                            <th>ESTADO</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {store.clients.map((item) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <button className="btn btn-dark mx-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{handleDetailsUser(item.id)}}>
                                                            <FontAwesomeIcon icon={faPen} />
                                                        </button>
                                                        <button className="btn btn-danger mx-2" onClick={()=>{handleDetailsUser(item.id)}}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </td>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone_number}</td>
                                                    <td>{new Date(item.created_at).toLocaleDateString('es-ES')}</td>
                                                    <td>
                                                        <p
                                                            className={item.role_id === roles.CLIENT ? "py-1 text-info" : item.role_id === roles.CHEF  ? "py-1 text-warning" : item.role_id === roles.ADMIN  ? "py-1 text-success" : "py-1 text-danger" }
                                                            style={{width:"100%", textAlign:"center", borderRadius:"50px"}}
                                                        >
                                                                {rolesName[item.role_id] || rolesName[roles.GUEST] }
                                                        </p>
                                                        {/* border border-primary  */}
                                                    </td>
                                                    <td>
                                                        <span className={item.is_active === true ? "badge text-bg-primary " : "badge text-bg-danger" }>{item.is_active === true?"Activo":"Inactivo"}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            ):(
                                <p>No hay datos que mostrar</p>
                            )
                        } 
                    </div>
                </div>

                
            </div>
        </div>
    );
};