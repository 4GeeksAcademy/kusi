import React, { useState } from 'react';

export const ModalDetalle = ({ id, imgSrc, title, description, ingredients }) => {
    const [amount, setAmount] = useState(1);

    const handleIncrement = () => {
        setAmount(amount + 1);
    };

    const handleDecrement = () => {
        if (amount > 1) {
            setAmount(amount - 1);
        }
    };

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '600px', borderRadius: '20px' }}>
                <div className="modal-content p-0" style={{ borderRadius: '20px' }}>
                    <div className="modal-body d-flex flex-column align-items-center p-0 mb-3">
                        <img src={imgSrc} 
                            alt={title} 
                            className="img-fluid w-100 h-auto ratio ratio-1x1" 
                            style={{ maxHeight: '300px', objectFit: 'cover', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }} 
                        />
                        <button type="button" className="btn-close bg-light rounded-circle position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div className="row d-flex mt-3 mx-3">
                            <div className="col">
                                <h4>{title}</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam voluptatem, tempora molestias deleniti expedita dicta veritatis{description}</p>
                                <p>Ingredientes: Lorem ipsum dolor sit amet consectetur adipisicing elit. At illum fuga quibusdam laborum. Mollitia quo recusandae{ingredients}</p>
                            </div>
                        </div>
                        <div className="col-4 d-flex justify-content-center align-items-center mb-2">
                                <button className="btn" style={{ color: '#F44322', fontSize: '24px' }} onClick={handleDecrement}>
                                    <i className="fa-solid fa-circle-minus"></i>
                                </button>
                                <span className="mx-3" style={{ fontSize: '20px' }}>{amount}</span>
                                <button className="btn" style={{ color: '#F44322', fontSize: '24px' }} onClick={handleIncrement}>
                                    <i className="fa-solid fa-circle-plus"></i>
                                </button>
                        </div>
                        <button type="button" className="btn rounded-pill px-4" style={{ color: 'white', background: '#F44322' }}>Agregar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

