import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart, faFire, faBan, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from "../component/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import "../../styles/orders.css"

export const Orders = () => {
    const { store, actions } = useContext(Context);
    const [ordersData, setOrdersData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            await actions.orders();
            setOrdersData(store.dataOrdersById);
        };
        fetchData();
    }, []);

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

    const handleStatusChange = (id) => {
        setOrdersData(prevOrders => 
            prevOrders.map(order => {
                if (order.id === id) {
                    const nextStatus = {
                        [Status.PENDING]: Status.IN_PROGRESS,
                        [Status.IN_PROGRESS]: Status.COMPLETED,
                        [Status.COMPLETED]: Status.COMPLETED,
                        [Status.CANCELLED]: Status.CANCELLED
                    };
                    return { ...order, status_id: nextStatus[order.status_id] };
                }
                return order;
            })
        );
    };

    const handleDetails = (orderId) => {
        navigate(`/orders/${orderId}`)
    }

    return (
        <div>
            <Navbar/>
        
            <div className="container d-flex justify-content-center align-items-center vh-100">
                {ordersData.length > 0 ? (
                    <table className="table table-hover text-center">
                        <thead >
                            <tr>
                                <th>N° ORDEN</th>
                                <th>FECHA</th>
                                <th>CLIENTE</th>
                                <th>TOTAL</th>
                                <th>ESTADO</th>
                                <th>ACCIÓN</th>
                            </tr>
                        </thead>
                        <tbody>
                               {ordersData.map((item) => (
                                    <tr key={item.id} onClick={() => handleDetails(item.id)}>
                                        <td>#{item.id}</td>
                                        <td>{new Date(item.created_at).toLocaleDateString('es-ES')}</td>
                                        <td>{item.user?.name || "Desconocido"}</td>
                                        <td>S/.{item.grand_total.toFixed(2)}</td>
                                        <td>
                                            <p
                                                className={orderStatus[item.status_id] === "Pendiente" ? "border border-primary py-1 text-primary " : orderStatus[item.status_id] === "En progreso" ? "border border-warning py-1 text-warning" : orderStatus[item.status_id] === "Completado" ? "border border-success py-1 text-success" : "border border-danger py-1 text-danger" }
                                                style={{width:"100%", textAlign:"center", borderRadius:"50px", backgroundColor:"white"}}
                                            >
                                                    {orderStatus[item.status_id] || "Desconocido"}
                                            </p>
                                            
                                        </td>
                                        <td>
                                            <button
                                                className={item.status_id === Status.PENDING ? "btn btn-primary" : item.status_id === Status.IN_PROGRESS ? "btn btn-warning" : item.status_id === Status.COMPLETED ? "btn btn-success" : "btn btn-danger"}
                                                
                                                onClick={() => handleStatusChange(item.id)}
                                                disabled={item.status_id === Status.COMPLETED || item.status_id === Status.CANCELLED}
                                            >
                                                {item.status_id === Status.PENDING ? <FontAwesomeIcon icon={faHourglassStart} /> : item.status_id === Status.IN_PROGRESS ? <FontAwesomeIcon icon={faFire} /> : item.status_id === Status.COMPLETED ? <FontAwesomeIcon icon={faUtensils}/> : <FontAwesomeIcon icon={faBan} /> }
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    ):(
                        <p>No hay datos que mostrar</p>
                    )
                }
            </div>
        </div>
    );
};