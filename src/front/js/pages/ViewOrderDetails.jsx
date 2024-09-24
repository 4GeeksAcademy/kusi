import { useState, useContext, useEffect } from "react";
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/orderDetails.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from "../component/Navbar.jsx";
import { jwtDecode } from 'jwt-decode';
import kusiLogo from '../../assets/images/kusi-logo.png';
import arrowImg from '../../assets/images/arrow.png';



export const ViewOrderDetails = () => {

    const {store, actions} = useContext(Context);
    const {id} = useParams();
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [roleId, setRoleId] = useState()
    const [total, setTotal] = useState()

    console.log("este es el id que estoy llamando :)", id)

    useEffect(() => {
  
        if (localStorage.getItem("token")) {
            try {
                const decodedToken = jwtDecode(localStorage.getItem("token"));
                setRoleId(decodedToken.sub.role_id);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        } else {
            setRoleId(0);
        }
    },[]);

    console.log(roleId)

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


    const handleStatusChange = async () => {
        const nextStatus = {
            [Status.PENDING]: Status.IN_PROGRESS,
            [Status.IN_PROGRESS]: Status.COMPLETED,
            [Status.COMPLETED]: Status.COMPLETED,
            [Status.CANCELLED]: Status.CANCELLED
        };
    
        const newStatus = nextStatus[orderDetails.status_id]
        await actions.updateOrderStatus(id, newStatus)
        setOrderDetails(prevOrder => ({...prevOrder, status_id: newStatus}))

        await actions.getOrdersById(id);
        setOrderDetails(store.dataOrdersById);
    };
    

    useEffect(() => {
        const calculateTotalPrice = () => {
            if (orderDetails?.dishes) {
                
                const totalPrice = orderDetails?.dishes?.reduce((acc, item) => {
                    const byQuantities = item.price * item.quantity
                    return acc + byQuantities
                }, 0);
                setTotal(totalPrice);
            }
        };
        
        calculateTotalPrice();
        
    }, [orderDetails]);
    

    console.log(total)

    return(
        <div className="container d-flex  flex-column justify-content-center align-items-center">
            <div className="d-flex justify-content-start align-items-start pb-5 pb-md-0 pe-3 pe-md-0 w-100" style={{width:"10%", height:"35px"}}>
                <Link to="/orders">
                    <img className="arrow-img" src={arrowImg}/>
                </Link>
            </div>
            <div className="card rounded-0" style={{ maxWidth: '500px', width: '100%', height:"auto" }}>
                <div className="mb-3 d-flex justify-content-between align-items-center py-3 px-3">
                    <img src={kusiLogo} style={{width:"70px"}}/>
                    {roleId === 2 ? (
                        <button type="button"
                            className={`rounded-pill btn ${orderDetails?.status_id === Status.PENDING ? "btn-outline-dark btn-primary text-white border-white" : orderDetails?.status_id === Status.IN_PROGRESS ? "btn-outline-dark btn-warning text-white border-white" : orderDetails?.status_id === Status.COMPLETED ? "btn-success" : "btn-danger"}`}
                            disabled={orderDetails.status_id === Status.COMPLETED || orderDetails.status_id === Status.CANCELLED}
                            onClick={handleStatusChange}>
                            {orderStatus[orderDetails?.status_id]}
                        </button>
                    ):(
                        <p className={`rounded-pill px-3 py-2 ${orderDetails?.status_id === Status.PENDING ? "bg-primary text-white" : orderDetails?.status_id === Status.IN_PROGRESS ? "bg-warning text-dark" : orderDetails?.status_id === Status.COMPLETED ? "bg-success text-white" : "bg-danger text-white"}`}>
                            {orderStatus[orderDetails?.status_id]}
                        </p>
                    )}
                </div>
                <div className="card-header text-start border-0">
                    <h2 className="mb-0">Orden #{orderDetails?.id || "No disponible"}</h2>
                </div>
                <div className="card-body">
                    <div>
                        <div className="mb-3">
                            {orderDetails.status_id === Status.IN_PROGRESS || orderDetails.status_id === Status.COMPLETED || orderDetails.status_id === Status.CANCELLED ? (
                                <div className="">
                                    <h5 className="fw-bold">Chef</h5>
                                    <p>{orderDetails?.chef?.name}</p>
                                </div>
                            ):("")}
                        </div>
                        <div className="mb-3">
                            <h5 className="card-title fw-bold">Cliente</h5>
                            <p className="mb-1">{orderDetails?.client?.name || "No disponible"}</p>
                            <p className="mb-1">{orderDetails?.client?.email || ""}</p>
                            <p className="mb-1">{orderDetails?.client?.phone_number || ""}</p>
                        </div>
                        
                    </div>
                    
                    <div className="mb-3">
                        <h5 className="card-title fw-bold">Fecha y Hora</h5>
                        <p className="mb-1">{new Date(orderDetails?.created_at).toLocaleDateString('es-ES')} {new Date(orderDetails?.created_at).toLocaleTimeString('es-ES')}</p>
                    </div>
                    
                    <div className="mb-3">
                        <h5 className="card-title fw-bold">Platos</h5>
                        {orderDetails.dishes && orderDetails.dishes.length > 0 ? (
                            orderDetails.dishes.map((dish, index) => (
                                <div key={index} className="d-flex justify-content-between">
                                    <p className="mb-0">{dish.quantity} x {dish.name}</p>
                                    <p className="mb-0">S/.{dish.price * dish.quantity}</p>
                                </div>
                            ))
                        ) : (
                            <p>No hay datos que mostrar</p>
                        )}
                        <div className="d-flex justify-content-center align-items-end w-100">
                            <hr style={{ marginLeft: 'auto', width:"10%" }} />
                        </div>
                                                
                        <div className="d-flex justify-content-between">
                            <p className="fw-bold">Total</p>
                            <p className="fw-bold"> S/.{total}</p>
                        </div>
                        
                    </div>
                    
                    <div className="ticket-note p-3 rounded mb-3">
                        <h5 className="card-title">Notas del Pedido</h5>
                        <p className="mb-0"><FontAwesomeIcon icon={faCaretRight} className="me-2" />{orderDetails?.special_instructions || "Sin notas adicionales"}</p>
                    </div>
                </div>
            </div>
        </div>


        
    )
}