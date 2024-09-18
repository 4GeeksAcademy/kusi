import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";

export const Orders = () => {
    const { store, actions } = useContext(Context);
    const [ordersData, setOrdersData] = useState([]);

    useEffect(() => {
        // const fetchData = async () => {
        //     await actions.orders();
            
        //     const ordersWithClientInfo = await Promise.all(
        //         store.dataOrders.map(async (order) => {
        //             const clientData = await actions.getUsersById(order.);
        //             return {
        //                 ...order,
        //                 clientName: clientData?.name || "Desconocido"
        //             };
        //         })
        //     );

        //     setOrdersData(ordersWithClientInfo);
        // };
        // fetchData();
        const fetchData = async () => {
            await actions.orders();
            setOrdersData(store.dataOrders);
        };
        fetchData();
    }, []);

    // const Status = Object.freeze({
    //     PENDING: "pending",
    //     IN_PROGRESS: "in progress",
    //     COMPLETED: "completed",
    //     CANCELLED: "cancelled"
    // })
    const Status = Object.freeze({
        PENDING: 1,
        IN_PROGRESS: 2,
        COMPLETED: 3,
        CANCELLED: 4
    })

    const orderStatus = {
        [Status.PENDING]: "Pendiente",
        [Status.IN_PROGRESS]: "En progreso",
        [Status.COMPLETED]: "Completado",
        [Status.CANCELLED]: "Cancelado"
    }
    
    

    return (
        <div>
            <div className="container text-center">
                <div className="row">
                    <div className="col-2 bg-primary">
                        <h5>N° ORDEN</h5>
                        <div className="row">
                            {ordersData.length > 0 ? (
                                ordersData.map((item) => (
                                    <div className="col-12" key={item.id}>
                                        {item.id}
                                    </div>
                                ))
                            ) : (
                                <p>No hay órdenes que mostrar</p>
                            )}
                        </div>
                    </div>

                    <div className="col-2 bg-secondary">
                        <h5>FECHA</h5>
                        <div className="row">
                            {ordersData.length > 0 ? (
                                ordersData.map((item) => {
                                    const registerClient = new Date(item.created_at);
                                    const formattedDate = registerClient.toLocaleDateString('es-ES');
                                    return (
                                        <div className="col-12" key={item.id}>
                                            {formattedDate}
                                        </div>
                                    );
                                })
                            ) : (
                                <p>No hay datos que mostrar</p>
                            )}
                        </div>
                    </div>

                    <div className="col-2 bg-danger">
                        <h5>CLIENTE</h5>
                        <div className="row">
                            {ordersData.length > 0 ? (
                                ordersData.map((item) => (
                                    <div className="col-12" key={item.id}>
                                        {item.user?.name || "Desconocido"}
                                    </div>
                                ))
                            ) : (
                                <p>No hay datos que mostrar</p>
                            )}
                        </div>
                    </div>

                    <div className="col-2 bg-success">
                        <h5>TOTAL</h5>
                        <div className="row">
                            {ordersData.length > 0 ? (
                                ordersData.map((item) => (
                                    <div className="col-12" key={item.id}>
                                        S/.{item.grand_total.toFixed(2)}
                                    </div>
                                ))
                            ) : (
                                <p>No hay datos que mostrar</p>
                            )}
                        </div>
                    </div>

                    <div className="col-2 bg-warning">
                        <h5>ESTADO</h5>
                        <div className="row">
                            {ordersData.length > 0 ? (
                                ordersData.map((item) => (
                                    <div className="col-12" key={item.id}>
                                        {orderStatus[item.status_id] || "Desconocido"}
                                    </div>
                                ))
                            ) : (
                                <p>No hay datos que mostrar</p>
                            )}
                        </div>
                    </div>

                    <div className="col-2 bg-info">
                        <h5>ACCIÓN</h5>
                        <div className="row">
                            {ordersData.length > 0 ? (
                                ordersData.map((item) => (
                                    <div className="col-12" key={item.id}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id={`checkbox-${item.id}`} />
                                            <label className="form-check-label" htmlFor={`checkbox-${item.id}`}>
                                                Checkbox
                                            </label>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No hay datos que mostrar</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};