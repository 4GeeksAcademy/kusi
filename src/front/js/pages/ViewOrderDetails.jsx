import { useState, useContext, useEffect } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const ViewOrderDetails = () => {

    const {store, actions} = useContext(Context);
    const {id} = useParams()
    const {orderDetails, setOrderDetails} = useState([])

    console.log("este es el id que estoy llamando :)", id)

    useEffect(()=>{
        const fetch = async () => {
            await actions.getOrdersById(id)
            setOrderDetails(store.dataOrdersById)
            console.log(store.dataOrdersById)
        } 
        fetch()
    },[])

    
    return(
        <h1>Vista de orden detalles</h1>
    )
}