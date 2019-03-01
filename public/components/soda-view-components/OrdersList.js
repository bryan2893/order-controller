import React from 'react';
import {connect} from 'react-redux';
import Order from './Order';

const mapStateToProps = function(state){
    return {orders:state.orders};
};

const connectedList = ({orders}) => (
    <ul className="orders-list-container">
        {orders.map(or => (
        <Order key={or.numeroOrden} order={or}/>
        ))}
    </ul>
);

const OrdersList = connect(mapStateToProps)(connectedList);

export default OrdersList;