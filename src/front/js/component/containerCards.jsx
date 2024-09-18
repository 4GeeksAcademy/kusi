import React, { useContext } from "react";
import { Card } from "../component/card.jsx";
import { Context } from "../store/appContext";

export const ContainerCards = () => {
    const { store, actions } = useContext(Context);

    //ejemplo
    const items = [
        { title: 'Pollo a la brasa', time: '25 mins', price: 'S/ 19.90', imgSrc: 'https://picsum.photos/200' },
        { title: 'Pollo a la brasa', time: '25 mins', price: 'S/ 19.90', imgSrc: 'https://picsum.photos/200' },
        { title: 'Pollo a la brasa', time: '25 mins', price: 'S/ 19.90', imgSrc: 'https://picsum.photos/200' },
        { title: 'Pollo a la brasa', time: '25 mins', price: 'S/ 19.90', imgSrc: 'https://picsum.photos/200' },
        { title: 'Pollo a la brasa', time: '25 mins', price: 'S/ 19.90', imgSrc: 'https://picsum.photos/200' },
        { title: 'Pollo a la brasa', time: '25 mins', price: 'S/ 19.90', imgSrc: 'https://picsum.photos/200' },
        { title: 'Pollo a la brasa', time: '25 mins', price: 'S/ 19.90', imgSrc: 'https://picsum.photos/200' },
      ];
      
    return (
        <div className="container-dishes mt-5 mx-auto">
            <div className="row">
                {items.map((item, index) => (
                <div key={index} className="col-12 col-sm-6 col-md-4 mb-4">
                    <Card
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