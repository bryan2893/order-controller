import React from 'react';
import FoodList from './FoodList';

const Order = function(props){
    console.log(JSON.stringify(props.order));
    let clase = "order";
    if(props.order.estado === 'p'){
        clase += " pending";
    }
    if(props.order.estado === 'l'){
        clase += " ready";
    }
    if(props.order.estado === 'v'){
        clase += " sold";
    }

    return (<li className={clase}>
        <div className="orderInformation">
            <p className="orderNumerator"><span>#{props.order.numeroOrden}</span></p>
            <p className="orderLlevarOaqui"><span>{props.order.tipo}</span></p>
        </div>
        <p className="orderClientName"><span>{props.order.cliente.nombre}</span></p>

        <FoodList listado={props.order.listado}/>
    </li>);
};

export default Order;
