import React, { useContext, useEffect} from "react";
import { Adicional } from "../component/adicional.jsx";
import { Context } from "../store/appContext";

export const ContainerAdicionales = ({id}) => {
    const { store } = useContext(Context);

    return (
        <div className="container-adicionales mt-3 mx-auto">
            <div className="row">
                {store.extras.length>0?store.extras.map((adicional, index) => (
                <div key={index} className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4 mb-4">
                    <Adicional
                    dish={adicional}
                    imgSrc={adicional.image_url}
                    description={adicional.description}
                    name={adicional.name}
                    price={adicional.price}
                    quantity={adicional.quantity}
                    />
                </div>
                )):<div className="text-center">No hay extras para este plato</div>}
            </div>
        </div>
    );
}