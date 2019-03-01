import React from 'react';

const FoodList = (props) => (
    <ul className="foodList">
        {props.listado.map((or,index)=> (
        <li key={index}>{or.comida} <span className="numerator">+{or.cantidad}</span></li>
        ))}
    </ul>
);

export default FoodList;