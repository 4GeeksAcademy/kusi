import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart, faFire, faBan, faUtensils, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from "../component/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import "../../styles/orders.css";
import { jwtDecode } from 'jwt-decode';

export const Orders = () => {
    const { store, actions } = useContext(Context);
    const [ordersData, setOrdersData] = useState([]);
    const [ordersDataById, setOrdersDataById] = useState([]);
    const [roleId, setRoleId] = useState();
    const navigate = useNavigate();
    const [userId, setUserId] = useState();

    const Roles = Object.freeze({
        GUEST: 0,
        CLIENT: 1,
        CHEF: 2,
        ADMIN: 3,
    });

    useEffect(() => {
        const decodeToken = () => {
            if (localStorage.getItem("token")) {
                try {
                    const decodedToken = jwtDecode(localStorage.getItem("token"));
                    setRoleId(decodedToken.sub.role_id);
                    setUserId(decodedToken.sub.id);
                } catch (error) {
                    console.error(error);
                    setRoleId(0);
                }
            } else {
                setRoleId(0);
            }
        };
    
        decodeToken();
    }, []);
    
    useEffect(() => {
        const fetchOrders= async () => {
            if (roleId !== undefined) {
                await actions.orders();
                setOrdersData(store.dataOrders);
    
                if (roleId === Roles.CLIENT) {
                    const clientOrders = store.dataOrders.filter(order => order.client_id === userId);
                    setOrdersDataById(clientOrders);
                }
            }
        };
    
        fetchOrders();
        
    }, [roleId, userId]);
    

    const orderStatus = {
        1: "Pendiente",
        2: "En progreso",
        3: "Completado",
        4: "Cancelado"
    };

    const handleDetails = (orderId) => {
        navigate(`/orders/${orderId}`);
    }

    return (
        <div>
            <Navbar />
            <div className="container d-flex justify-content-center align-items-center mt-4">
                {(ordersData.length > 0 || ordersDataById.length > 0) ? (
                    (roleId === Roles.CHEF || roleId === Roles.ADMIN) ? (
                        <table className="table table-hover text-center">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>N° ORDEN</th>
                                    <th>FECHA</th>
                                    <th>TOTAL</th>
                                    <th>ESTADO</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersData.map((item) => (
                                    <tr key={item.id}>
                                        <td className="align-middle">
                                            <button className="btn btn-dark" onClick={() => handleDetails(item.id)}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </td>
                                        <td className="align-middle">#{item.id}</td>
                                        <td className="align-middle">{new Date(item.created_at).toLocaleDateString('es-ES')}</td>
                                        <td className="align-middle">S/.{item.grand_total.toFixed(2)}</td>
                                        <td className="align-middle">
                                            <p className={`pt-3 ${item.status_id === 1 ? "text-primary" : item.status_id === 2 ? "text-warning" : item.status_id === 3 ? "text-success" : "text-danger"}`} style={{}}>
                                                {orderStatus[item.status_id] || "Desconocido"}
                                            </p>
                                        </td>
                                        <td className="align-middle">
                                            <button
                                                className={item.status_id === 1 ? "btn btn-primary" : item.status_id === 2 ? "btn btn-warning" : item.status_id === 3 ? "btn btn-success" : "btn btn-danger"}
                                                disabled={item.status_id === 3 || item.status_id === 4}
                                            >
                                                {item.status_id === 1 ? <FontAwesomeIcon icon={faHourglassStart} /> : item.status_id === 2 ? <FontAwesomeIcon icon={faFire} /> : item.status_id === 3 ? <FontAwesomeIcon icon={faUtensils}/> : <FontAwesomeIcon icon={faBan} />}
                                            </button>
                                        </td> 
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <table className="table table-hover text-center">
                            <thead>
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
                                        <td className="align-middle">
                                            <button className="btn btn-dark" onClick={() => handleDetails(item.id)}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </td>
                                        <td className="align-middle">#{item.id}</td>
                                        <td className="align-middle">{new Date(item.created_at).toLocaleDateString('es-ES')}</td>
                                        <td className="align-middle">S/.{item.grand_total.toFixed(2)}</td>
                                        <td className="align-middle">
                                            <p className={`pt-3 ${item.status_id === 1 ? "text-primary" : item.status_id === 2 ? "text-warning" : item.status_id === 3 ? "text-success" : "text-danger"}`}>
                                                {orderStatus[item.status_id]}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                ) : (
                    <p>No hay datos que mostrar</p>
                )}
            </div>
        </div>
    );
};
