import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Adicional = ({ imgSrc, name, price, description }) => {
    const { store, actions } = useContext(Context);
    return (
        <div className="card-adicional w-100 shadow-sm mb-2" style={{ height: '380px', border: '1px solid #ddd', borderRadius: '20px' }}>
            <img src={imgSrc} className="card-img-top img-fluid" alt={name} style={{ objectFit: 'cover', height: '200px' }} />
            <div className="body d-flex flex-column justify-content-between">
                <div className="p-1">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text text-secondary" style={{ fontSize: '10px' }}>
                        {description}
                    </p>
                </div>

                <div className="d-flex justify-content-center align-items-center mt-3">
                    <div className="col-7">
                        <button className="btn" style={{ color: '#F44322', fontSize: '20px' }} onClick={actions.decrementAdicional}>
                            <i className="fa-solid fa-circle-minus"></i>
                        </button>
                        <span className="mx-0" style={{ fontSize: '15px' }}>{store.cantadicional}</span>
                        <button className="btn" style={{ color: '#F44322', fontSize: '20px' }} onClick={actions.incrementAdicional}>
                            <i className="fa-solid fa-circle-plus"></i>
                        </button>
                    </div>
                    <div className="col-5 text-center style={{ fontSize: '20px' }}">
                        <span>S/.{price.toFixed(2)}</span>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
