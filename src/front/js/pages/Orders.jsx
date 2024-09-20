import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart, faFire, faBan, faUtensils, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from "../component/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import "../../styles/orders.css"
import { jwtDecode } from 'jwt-decode';

export const Orders = () => {
    const { store, actions } = useContext(Context);
    const [ordersData, setOrdersData] = useState([]);
    const [ordersDataById , setOrdersDataById] = useState([]);
    const [roleId, setRoleId] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            await actions.orders();
            setOrdersData(store.dataOrders);
            setOrdersDataById(store.dataOrdersById)
        };
        fetchData();
    }, []);

    useEffect(() => {
  
        if (localStorage.getItem("token")) {
            try {
                const decodedToken = jwtDecode(localStorage.getItem("token"));
                console.log(decodedToken.sub)
                setRoleId(decodedToken.sub.role_id);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        } else {
            setRoleId(0);
        }
    },[localStorage.getItem("token")]);


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


    const Roles = Object.freeze({
        GUEST: 0,
        CLIENT: 1,
        CHEF: 2,
        ADMIN: 3,
    });



    const handleDetails = (orderId) => {
        navigate(`/orders/${orderId}`)
    }

    return (
        <div>
            <Navbar/>
        
            <div className="container d-flex justify-content-center align-items-center vh-100">
                {ordersData.length > 0 ? ( 
                    (roleId === Roles.CHEF || roleId === Roles.ADMIN) ? (
                        <table className="table table-hover text-center">
                            <thead >
                                <tr>
                                    <th></th>
                                    <th>N° ORDEN</th>
                                    <th>FECHA</th>
                                    <th>CLIENTE</th> 
                                    <th>TOTAL</th>
                                    <th>ESTADO</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersData.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <button className="btn btn-dark"  onClick={() => handleDetails(item.id)}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </td>
                                            <td>#{item.id}</td>
                                            <td>{new Date(item.created_at).toLocaleDateString('es-ES')}</td>
                                            <td>{item.user?.name || "Desconocido"}</td>
                                            <td>S/.{item.grand_total.toFixed(2)}</td>
                                            <td>
                                                <p
                                                    className={orderStatus[item.status_id] === "Pendiente" ? "py-1 text-primary " : orderStatus[item.status_id] === "En progreso" ? "py-1 text-warning" : orderStatus[item.status_id] === "Completado" ? "py-1 text-success" : "py-1 text-danger" }
                                                    style={{width:"100%", textAlign:"center", borderRadius:"50px"}}
                                                >
                                                        {orderStatus[item.status_id] || "Desconocido"}
                                                </p>
                                                {/* border border-primary  */}
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
                        <table className="table table-hover text-center">
                        <thead >
                            <tr>
                                <th></th>
                                <th>N° ORDEN</th>
                                <th>FECHA</th>
                                <th>TOTAL</th>
                                <th>ESTADO</th>
                            </tr>
                        </thead>
                        <tbody>
                               {ordersDataById.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <button className="btn btn-dark"  onClick={() => handleDetails(item.id)}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </td>
                                        <td>#{item.id}</td>
                                        <td>{new Date(item.created_at).toLocaleDateString('es-ES')}</td>
                                        <td>S/.{item.grand_total.toFixed(2)}</td>
                                        <td>
                                            <p
                                                className={orderStatus[item.status_id] === "Pendiente" ? "py-1 text-primary " : orderStatus[item.status_id] === "En progreso" ? "py-1 text-warning" : orderStatus[item.status_id] === "Completado" ? "py-1 text-success" : "py-1 text-danger" }
                                                style={{width:"100%", textAlign:"center", borderRadius:"50px"}}
                                            >
                                                    {orderStatus[item.status_id] || "Desconocido"}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    )
                    ):(
                        <p>No hay datos que mostrar</p>
                    )
                } 
            </div>
        </div>
    );
};