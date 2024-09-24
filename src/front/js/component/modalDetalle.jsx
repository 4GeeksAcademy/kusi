import React, { useContext} from 'react';
import { Context } from "../store/appContext";


export const ModalDetalle = ({ id, imgSrc, title, description, ingredients }) => {

    const { store, actions } = useContext(Context);

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '600px', borderRadius: '20px' }}>
                <div className="modal-content p-0" style={{ borderRadius: '20px' }}>
                    <div className="modal-body d-flex flex-column align-items-center p-0 mb-3">
                        { !store.btnaditional ? (
                            <>
                            <img src={imgSrc} 
                                alt={title} 
                                className="img-fluid w-100 h-auto ratio ratio-1x1" 
                                style={{ maxHeight: '300px', objectFit: 'cover', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }} 
                            />
                            <button type="button" className="btn-close bg-light rounded-circle position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Close"></button>
                            <div className="row d-flex mt-3 mx-3">
                                <div className="col">
                                    <h4>{title}</h4>
                                    <p>{description}</p>
                                    <p>Ingredientes: Lorem ipsum dolor sit amet consectetur adipisicing elit. At illum fuga quibusdam laborum. Mollitia quo recusandae{ingredients}</p>
                                </div>
                            </div>
                            <div className="col-4 d-flex justify-content-center align-items-center mb-2">
                                <button className="btn" style={{ color: '#F44322', fontSize: '24px' }} onClick={actions.decrementAmount}>
                                    <i className="fa-solid fa-circle-minus"></i>
                                </button>
                                <span className="mx-3" style={{ fontSize: '20px' }}>{store.amount}</span>
                                <button className="btn" style={{ color: '#F44322', fontSize: '24px' }} onClick={actions.incrementAmount}>
                                    <i className="fa-solid fa-circle-plus"></i>
                                </button>
                            </div>
                            <button type="button" className="btn rounded-pill px-4" onClick={ actions.setBtnAdicional } style={{ color: 'white', background: '#F44322' }}>Agregar</button>
                            </>
                        ) : (
                            <div className="container-fluid mt-3 mx-3">
                                <h4>Adicionar</h4>
                                
                                <div className="row">
                                    <div className="col">
                                        <button type="button" className="btn rounded-pill px-4" style={{ color: 'white', background: '#F44322' }}>Carrito</button>
                                    </div> 
                                    <div className="col">                                   
                                        <button type="button" className="btn rounded-pill px-4" style={{ color: 'white', background: '#F44322' }}>Ver platos</button>
                                    </div>
                                </div>                            
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

