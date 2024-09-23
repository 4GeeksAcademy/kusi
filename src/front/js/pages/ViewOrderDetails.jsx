import { useState, useContext, useEffect } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/orderDetails.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';



export const ViewOrderDetails = () => {

    const {store, actions} = useContext(Context);
    const {id} = useParams()
    const [orderDetails, setOrderDetails] = useState([])
    const [dishes, setDishes] = useState([])

    console.log("este es el id que estoy llamando :)", id)


    useEffect(()=>{
        const fetch = async () => {
            await actions.getOrdersById(id)
            setOrderDetails(store.dataOrdersById)

            if(orderDetails.dishes || orderDetails.dishes > 0) {
                await orderDetails.order_dishes.map( async (dishId) => {
                    await actions.getDishesById(dishId)
                    setDishes(store.dataDishesById)
                })
            }else{
                console.log("no existe o no hay datos que mostrar")
            }
        } 
        fetch()
    },[id])

    console.log(dishes)

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
        <div className="d-flex flex-column justify-content-center align-items-center p-3"> 
            <div className="card text-start w-50 h-auto d-flex flex-column justify-content-center">
                <h2 className="card-header text-center p-4">N° Orden #{orderDetails?.id || "No disponible"}</h2>
                <div className="card-body">
                    <h5 className="card-title">Cliente: {orderDetails?.client?.name || "No disponible"}</h5>
                    <h5 className="card-title">Email: {orderDetails?.client?.email || "No disponible"}</h5>
                    <h5 className="card-title">Teléfono: {orderDetails?.client?.phone_number || "No disponible"}</h5>
                    <hr></hr>
                    <h5>Fecha: {new Date(orderDetails?.created_at).toLocaleDateString('es-ES')}</h5>
                    <h5>Hora: {new Date(orderDetails?.created_at).toLocaleTimeString()}</h5>
                    <hr></hr>
                    <h5>Estado de la orden: {orderStatus[orderDetails?.status_id]}</h5>
                    <hr></hr>
                    <h5>Platos</h5>
                    {orderDetails.dishes && orderDetails.dishes.length > 0 ? (
                        orderDetails.dishes.map((dish, index) => (
                            <p key={index}>{dish.name}</p>
                        ))
                    ):(<p>No hay datos que mostrar</p>)}
                    <p className="text-end">S/.{orderDetails.grand_total}</p>
                    <hr></hr>
                    <div className="ticket-notes p-4 rounded">
                       <h5>Notas del pedido:</h5>
                       <p><FontAwesomeIcon icon={faCaretRight} className="px-2"/>{orderDetails.special_instructions}</p>
                    </div>
                    <hr></hr>
                    <button type="button" class="btn btn-primary">Primary</button>
                </div>
            </div>
        </div>
        
    )
}