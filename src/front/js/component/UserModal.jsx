import React, { useEffect, useState, useContext, useRef } from "react";
import { Context } from "../store/appContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart, faFire, faBan, faUtensils, faPen } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from "./Navbar.jsx";
import { useNavigate } from "react-router-dom";
import "../../styles/employees.css"
import { jwtDecode } from 'jwt-decode';

export const UserModal = ({id}) => {
    const { store, actions } = useContext(Context);
    const [userData,setUserData] = useState({})
    const modalRef = useRef()

    useEffect(() => {

        cleanModal()
        if(id>0){

            const fetchData = async () => {
                if (localStorage.getItem("token")) {
                    try {
                        const decodedToken = jwtDecode(localStorage.getItem("token"));
                        //console.log(decodedToken.sub)
        
                        await actions.getUserById(id);
                        setUserData(store.userData)
                        
                    } catch (error) {
                        console.error("Error decoding token:", error);
                    }
                } else {
                    setRoleId(0);
                }
            };
            fetchData();
        } 
        
    }, [id]);

    const handleChangeData = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const saveEmployee = async (e) => {		
		e.preventDefault() 
		try{
            if(userData.id){
                const modified = await actions.editUser(userData)
                if(modified){
                    closeModal()
                    cleanModal()
                }
            } else {
                const created = await actions.createEmployee(userData)
                if(created){
                    closeModal()
                    cleanModal()
                }
            }

		}catch(e){
			console.error(e);
		}
	}

    const closeModal = () => {
        modalRef.current.click()
    }
    const cleanModal = () => {
        setUserData({"name":"","email":"","password":"","phone_number":"","role_id":"","is_active":""})
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
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <form onSubmit={saveEmployee} className="form-employee">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">{id>0?"Editar Empleado":"Crear Empleado"}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                        <div className="modal-body">
                            <div className="input-group my-auto row mx-auto">
                                <span className="input-group-text col-3" id="inputGroup-sizing-default">Nombre</span>
                                <input type="text" className="form-control col-9" name="name" value={userData.name||""} onChange={handleChangeData} required />
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="input-group my-auto row mx-auto">
                                <span className="input-group-text col-3" id="inputGroup-sizing-default">Correo</span>
                                <input type="email" className="form-control col-9" name="email" value={userData.email||""} onChange={handleChangeData} required />
                            </div>
                        </div>
                        {
                            id>0?(<></>):(
                            <div className="modal-body">
                                <div className="input-group my-auto row mx-auto">
                                    <span className="input-group-text col-3" id="inputGroup-sizing-default">Contraseña</span>
                                    <input type="password" className="form-control col-9" name="password" value={userData.password||""} onChange={handleChangeData} required />
                                </div>
                            </div>)
                        }
                        <div className="modal-body">
                            <div className="input-group my-auto row mx-auto">
                                <span className="input-group-text col-3" id="inputGroup-sizing-default">Celular</span>
                                <input type="text" className="form-control col-9" name="phone_number" value={userData.phone_number||""} onChange={handleChangeData} />
                            </div>
                        </div>
                        {
                            userData.role_id==1?(
                                <div className="modal-body">
                                    <div className="input-group my-auto row mx-auto">
                                        <span className="input-group-text col-3" id="inputGroup-sizing-default">Rol</span>
                                        <select className="form-select col-9" aria-label="Default select example" name="role_id" value={userData.role_id||""} onChange={handleChangeData} required>
                                            <option disabled value="">Seleccione</option>
                                            <option value={roles.CLIENT}>{rolesName[roles.CLIENT]}</option>
                                        </select>
                                    </div>
                                </div>):(
                                <div className="modal-body">
                                    <div className="input-group my-auto row mx-auto">
                                        <span className="input-group-text col-3" id="inputGroup-sizing-default">Rol</span>
                                        <select className="form-select col-9" aria-label="Default select example" name="role_id" value={String(userData.role_id)} onChange={handleChangeData} required>
                                            <option disabled value="">Seleccione</option>
                                            <option value={roles.ADMIN}>{rolesName[roles.ADMIN]}</option>
                                            <option value={roles.CHEF}>{rolesName[roles.CHEF]}</option>
                                        </select>
                                    </div>
                                </div>)
                        }
                        
                        <div className="modal-body">
                            <div className="input-group my-auto row mx-auto">
                                <span className="input-group-text col-3" id="inputGroup-sizing-default">Estado</span>
                                <select className="form-select col-9" aria-label="Default select example" name="is_active" value={String(userData.is_active)} onChange={handleChangeData}  required>
                                    <option disabled value="">Seleccione</option>
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                            </div>
                        </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={modalRef}>Cerrar</button>
                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
    );
};