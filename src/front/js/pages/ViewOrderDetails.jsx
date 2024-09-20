import { useState, useContext, useEffect } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const ViewOrderDetails = () => {

    const {store, actions} = useContext(Context);
    const {id} = useParams()
    const [orderDetails, setOrderDetails] = useState([])
    const [dishes, setDishes] = useState([])
    const [dishesById, setDishesById] = useState([])

    console.log("este es el id que estoy llamando :)", id)


    useEffect(()=>{
        const fetch = async () => {
            await actions.getOrdersById(id)
            setOrderDetails(store.dataOrdersById)

            if(orderDetails.order_dishes || orderDetails.order_dishes > 0) {
                await orderDetails.order_dishes.map( async (dishId) => {
                    await actions.getDishesById(dishId)
                })
            }else{
                console.log("no existe o no hay datos que mostrar")
            }
            
            setDishesById(store.dataDishesById)
            console.log(store.dishes)
            console.log(store.dataDishesById)
        } 
        fetch()
    },[id])

    console.log(dishesById)

    const Status = Object.freeze ({
        PENDING: 1,
        IN_PROGRESS: 2,
        COMPLETED: 3,
        CANCELLED: 4
    });

    const orderStatus = {
        [Status.PENDING]: "Pendiente",
        [Status.IN_PROGRESS]: "En progreso",
        [Status.COMPLETED]: "Completado",
        [Status.CANCELLED]: "Cancelado"
    };
    return(
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="card text-center w-50 h-auto">
                <h2 className="card-header">TICKET DE ORDEN</h2>
                <div className="card-body">
                    <h5>N° Orden #{orderDetails?.id || "No disponible"}</h5>
                    <h5 className="card-title">Cliente: {orderDetails?.user?.name || "No disponible"}</h5>
                    <h5 className="card-title">Email: {orderDetails?.user?.email || "No disponible"}</h5>
                    <h5 className="card-title">Teléfono: {orderDetails?.user?.phone_number || "No disponible"}</h5>
                    <h5>Fecha y hora: {new Date(orderDetails?.created_at).toLocaleDateString('es-ES')}</h5>
                    <h5>Hora: {new Date(orderDetails?.created_at).toLocaleTimeString()}</h5>
                    ------------
                    <h5>Estado de la orden: {orderStatus[orderDetails?.status_id]}</h5>
                    ------------
                    <h5>Platos</h5>
                    <p></p>
                    <p className="card-text"></p>
                    {/* <button
                        className={item.status_id === Status.PENDING ? "btn btn-primary" : item.status_id === Status.IN_PROGRESS ? "btn btn-warning" : item.status_id === Status.COMPLETED ? "btn btn-success" : "btn btn-danger"}
                        
                        onClick={() => handleStatusChange(item.id)}
                        disabled={item.status_id === Status.COMPLETED || item.status_id === Status.CANCELLED}
                    >
                        {item.status_id === Status.PENDING ? <FontAwesomeIcon icon={faHourglassStart} /> : item.status_id === Status.IN_PROGRESS ? <FontAwesomeIcon icon={faFire} /> : item.status_id === Status.COMPLETED ? <FontAwesomeIcon icon={faUtensils}/> : <FontAwesomeIcon icon={faBan} /> }
                    </button> */}
                </div>
            </div>
        </div>
        
    )
}