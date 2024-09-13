import React, { useState }from 'react';

export const ModalDetalle = ({ id, imgSrc, title }) => {
	const [amount, setAmount] = useState(1)
	
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
				<div className="modal-content px-3" style={{ borderRadius: '20px' }}>
					<div className="modal-header justify-content-center" style={{ borderBottom: 'none' }}>
						<h5 className="modal-title text-center w-100">{title}</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body d-flex flex-column align-items-center py-0 px-3">
						<img src={imgSrc} className="img-fluid" alt={title} style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'cover', aspectRatio: '1/1'}} />
						<div className="d-flex justify-content-center align-items-center mt-4 mb-4">
							<i className="fa-solid fa-circle-minus" style={{ color: '#F44322', fontSize: '24px' }} onClick={handleDecrement}></i>
							<span className="mx-3">{amount}</span>
							<i className="fa-solid fa-circle-plus" style={{ color: '#F44322', fontSize: '24px' }} onClick={handleIncrement}></i>							
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
