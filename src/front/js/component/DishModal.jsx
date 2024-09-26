import React, { useEffect, useState, useContext, useRef } from "react";
import { Context } from "../store/appContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart, faFire, faBan, faUtensils, faPen } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from "./Navbar.jsx";
import { useNavigate } from "react-router-dom";
import "../../styles/users.css"
import { jwtDecode } from 'jwt-decode';

export const DishModal = ({id}) => {
    const { store, actions } = useContext(Context);
    const [dishData,setDishData] = useState({})
    const modalRef = useRef()

    useEffect(() => {

        cleanModal()
        if(id>0){

            const fetchData = async () => {
                if (localStorage.getItem("token")) {
                    try {
                        const decodedToken = jwtDecode(localStorage.getItem("token"));
                        //console.log(decodedToken.sub)
        
                        await actions.getDishById(id);
                        setDishData(store.dishSelected)
                        
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
        setDishData({ ...dishData, [e.target.name]: e.target.value });
    }

    const uploadImage = async (e) => {
        await actions.uploadImage(e)
        setDishData({ ...dishData, ["image_url"]: store.imageUrl });
    }

    const saveDish = async (e) => {		
		e.preventDefault() 
		try{
            if(dishData.id){
                const modified = await actions.editDish(dishData)
                if(modified){
                    closeModal()
                    //cleanModal()
                }
            } else {
                const created = await actions.createDish(dishData)
                if(created){
                    closeModal()
                    //cleanModal()
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
        setDishData({"name":"","description":"","image_url":"","price":"","discount_percentage":"","cooking_time":"","quantity":""})
    }

    return (
        <div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <form onSubmit={saveDish} className="form-employee">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">{id>0?"Editar":"Crear"} Plato</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                        <div className="modal-body">
                            <div className="input-group my-auto row mx-auto">
                                <span className="input-group-text col-4" id="inputGroup-sizing-default">Nombre</span>
                                <input type="text" className="form-control col-9" name="name" value={dishData.name||""} onChange={handleChangeData} required />
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="input-group my-auto row mx-auto">
                                <span className="input-group-text col-4" id="inputGroup-sizing-default">Descripcion</span>
                                <textarea type="text" className="form-control col-9" name="description" value={dishData.description||""} onChange={handleChangeData} required />
                            </div>
                        </div>
                        {
                            <div className="modal-body">
                                <div className="input-group my-auto row mx-auto">
                                    <span className="input-group-text col-4" id="inputGroup-sizing-default">Imagen</span>
                                    <label for="image" className="form-control col-9">
                                        <img src={dishData.image_url  || "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"} onError={(e) => e.target.src = userImg} className="imgProfile" style={{width:"100%"}}/>
                                        <input type="file" name="image" id="image" onChange={uploadImage} style={{display:"none"}}/>
                                    </label>
                                </div>
                            </div>
                        }
                        <div className="modal-body">
                            <div className="input-group my-auto row mx-auto">
                                <span className="input-group-text col-4" id="inputGroup-sizing-default">Precio</span>
                                <input type="number" className="form-control col-9" name="price" value={dishData.price||"0"} onChange={handleChangeData} />
                            </div>
                        </div>
                        {/* {
                            dishData.role_id==1?(
                                <div className="modal-body">
                                    <div className="input-group my-auto row mx-auto">
                                        <span className="input-group-text col-3" id="inputGroup-sizing-default">Rol</span>
                                        <select className="form-select col-9" aria-label="Default select example" name="role_id" value={dishData.role_id||""} onChange={handleChangeData} required>
                                            <option disabled value="">Seleccione</option>
                                            <option value={roles.CLIENT}>{rolesName[roles.CLIENT]}</option>
                                        </select>
                                    </div>
                                </div>):(
                                <div className="modal-body">
                                    <div className="input-group my-auto row mx-auto">
                                        <span className="input-group-text col-3" id="inputGroup-sizing-default">Rol</span>
                                        <select className="form-select col-9" aria-label="Default select example" name="role_id" value={String(dishData.role_id)} onChange={handleChangeData} required>
                                            <option disabled value="">Seleccione</option>
                                            <option value={roles.ADMIN}>{rolesName[roles.ADMIN]}</option>
                                            <option value={roles.CHEF}>{rolesName[roles.CHEF]}</option>
                                        </select>
                                    </div>
                                </div>)
                        } */}
                        
                        <div className="modal-body">
                            <div className="input-group my-auto row mx-auto">
                                <span className="input-group-text col-4" id="inputGroup-sizing-default">% Descuento</span>
                                <input type="number" className="form-control col-9" name="discount_percentage" value={dishData.discount_percentage||"0"} onChange={handleChangeData} />
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="input-group my-auto row mx-auto">
                                <span className="input-group-text col-4" id="inputGroup-sizing-default">Tiempo cocción</span>
                                <input type="number" className="form-control col-9" name="cooking_time" value={dishData.cooking_time||"0"} onChange={handleChangeData} />
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="input-group my-auto row mx-auto">
                                <span className="input-group-text col-4" id="inputGroup-sizing-default">Cantidad</span>
                                <input type="number" className="form-control col-9" name="quantity" value={dishData.quantity||"0"} onChange={handleChangeData} />
                            </div>
                        </div>
                        {/* <div className="modal-body">
                            <div className="input-group my-auto row mx-auto">
                                <span className="input-group-text col-3" id="inputGroup-sizing-default">Estado</span>
                                <select className="form-select col-9" aria-label="Default select example" name="is_active" value={String(dishData.is_active)} onChange={handleChangeData}  required>
                                    <option disabled value="">Seleccione</option>
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                            </div>
                        </div> */}
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