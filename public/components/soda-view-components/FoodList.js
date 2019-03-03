import React from 'react';

const FoodList = (props) => (
    <ul className="foodList">
        {props.listado.map((comida,index)=> (
        <li key={index}>{comida.nombre} <span className="numerator">+{comida.cantidad}</span></li>
        ))}
    </ul>
);

export default FoodList;