import React, { useEffect, useState, useContext, useRef } from "react";
import { Context } from "../store/appContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart, faFire, faBan, faUtensils, faPen,faPlus,faTrash } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from "../component/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import "../../styles/users.css"
import { jwtDecode } from 'jwt-decode';
import { UserModal } from "../component/UserModal.jsx";
import Swal from 'sweetalert2'
import { DishModal } from "../component/DishModal.jsx";

export const Dishes = () => {
    const { store, actions } = useContext(Context); 
    const [idDish, setIdDish] = useState(0);
    const [idIngredient, setIdIngredient] = useState(0);

    useEffect(() => {

        const fetchData = async () => {
            if (localStorage.getItem("token")) {
                try {
                    const decodedToken = jwtDecode(localStorage.getItem("token"));
                    //console.log(decodedToken.sub)
    
                    await actions.getDishes();
                    await actions.getIngredients();
    
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


    const handleNewDish = () => setIdDish(0);
    const handleDetailsDish = (id) => setIdDish(id);
    const handleDeleteDish = async (id) => {
        Swal.fire({
            title: "Estás seguro de eliminar este plato?",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
                actions.deleteDish(id);
            } 
          });
    }
    const handleDetailsIngredient = (id) => setIdIngredient(id);
    const handleDeleteIngredient = async (id) => {

        Swal.fire({
            title: "Estás seguro de eliminar este plato?",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
                actions.deleteIngredient(id);
            } 
          });

    }

    return (

        <div>
            <Navbar/>
            <DishModal id ={idDish} />
            

            <div className="container h-100 mt-5">


                <ul className="nav nav-tabs " id="myTab" role="tablist">
                    <li className="nav-item w-50" role="presentation">
                        <button className="nav-link w-100 d-flex active" id="dishes-tab" data-bs-toggle="tab" data-bs-target="#dishes-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                            <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{handleNewDish()}}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <span className="spanEmployees">Platos</span>    
                        </button>
                    </li>
                    <li className="nav-item w-50" role="presentation">
                        <button className="nav-link w-100" id="clients-tab" data-bs-toggle="tab" data-bs-target="#clients-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Ingredientes</button>
                    </li>
                </ul>

                <div className="tab-content mt-5" id="myTabContent">
                    <div className="tab-pane fade show active" id="dishes-tab-pane" role="tabpanel" aria-labelledby="dishes-tab" tabIndex="0">

                    {store.dishes.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-hover text-center">
                                    <thead >
                                        <tr>
                                            <th></th>
                                            <th>NOMBRE</th>
                                            <th>IMAGEN</th> 
                                            <th>PRECIO</th> 
                                            <th>DESCUENTO</th>
                                            <th>TIEMPO COCCION</th>
                                            <th>CANTIDAD</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {store.dishes.map((item) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <button className="btn btn-dark mx2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{handleDetailsDish(item.id)}}>
                                                            <FontAwesomeIcon icon={faPen} />
                                                        </button>
                                                        {/* <button className="btn btn-danger mx-2" onClick={()=>{handleDeleteDish(item.id)}}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button> */}
                                                    </td>
                                                    <td>{item.name||""}</td>
                                                    <td><img 
                                                    src={item.image_url || "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"}
                                                    style={{width:"100px",height:"60px"}}
                                                    >
                                                    </img></td>
                                                    <td>S/. {item.price||"0"}</td>
                                                    <td>{item.discount_percentage||"0"}%</td>
                                                    <td>{item.cooking_time||"0"} minutos</td>
                                                    <td>
                                                        <span className={item.quantity >0 ? "badge text-bg-primary " : "badge text-bg-danger" }>{item.quantity || "0"} ud.</span>
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

                    {store.ingredients.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-hover text-center">
                                    <thead >
                                        <tr>
                                            {/* <th></th> */}
                                            <th>NOMBRE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {store.ingredients.map((item) => (
                                                <tr key={item.id}>
                                                    {/* <td>
                                                        <button className="btn btn-dark mx2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>{handleDetailsUser(item.id)}}>
                                                            <FontAwesomeIcon icon={faPen} />
                                                        </button>
                                                        <button className="btn btn-danger mx-2" onClick={()=>{handleDeleteUser(item.id)}}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </td> */}
                                                    <td>{item.name||""}</td>
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
    )
};
