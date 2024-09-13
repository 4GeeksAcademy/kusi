import React, { useContext } from "react";
import { Card } from "../component/card.jsx";
import { Context } from "../store/appContext";

export const ContainerCards = () => {
    const { store, actions } = useContext(Context);

    
    //ejemplo
    const items = [
		{ id: 1, title: 'Pollo a la brasa', time: '25', price: 'S/ 40.90', imgSrc: 'https://picsum.photos/200', 
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda recusandae sapiente nihil enim doloremque reiciendis.', 
            ingredients: 'tomate, papas, pollo'},
		{ id: 2, title: 'Pollo a la brasa', time: '25', price: 'S/ 40.90', imgSrc: 'https://picsum.photos/200' },
		{ id: 3, title: 'Pollo a la brasa', time: '25', price: 'S/ 40.90', imgSrc: 'https://picsum.photos/200' },
		{ id: 4, title: 'Pollo a la brasa', time: '25', price: 'S/ 40.90', imgSrc: 'https://picsum.photos/200' },
		{ id: 5, title: 'Pollo a la brasa', time: '25', price: 'S/ 40.90', imgSrc: 'https://picsum.photos/200' },
		{ id: 6, title: 'Pollo a la brasa', time: '25', price: 'S/ 40.90', imgSrc: 'https://picsum.photos/200' },
		{ id: 7, title: 'Pollo a la brasa', time: '25', price: 'S/ 40.90', imgSrc: 'https://picsum.photos/200' },
	];
      
    return (
        <div className="container-dishes mt-5 mx-auto">
            <div className="row">
                {items.map((item, index) => (
                <div key={index} className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4 mb-4">
                    <Card
                    id={item.id}
                    imgSrc={item.imgSrc}
                    title={item.title}
                    time={item.time}
                    price={item.price}
                    />
                </div>
                ))}
            </div>
        </div>
    );
}