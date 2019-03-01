import {ADD_ARTICLE,ADD_ORDER,SET_ORDERS_LIST,SET_COUNTER,SET_PENDINGS,SET_READY,SET_SOLD_ORDERS,MARK_ORDER,SUBSTRACT_UNIT_TO_PENDINGS,ADD_UNIT_TO_COUNTER,ADD_UNIT_TO_PENDINGS,ADD_UNIT_TO_READY,DELETE_ORDER,SUBSTRACT_UNIT_TO_READY,ADD_UNIT_TO_SOLD_ORDERS,SUBSTRACT_UNIT_TO_SOLD_ORDERS} from '../constants/action-types';

export const addArticle = function(article){
    return {type:ADD_ARTICLE,payload:article};
};

export const addOrder = function(order){
    return {type:ADD_ORDER,payload:order};
};

export const deleteOrder = function(order){
    return {type:DELETE_ORDER,payload:order};
};

export const setOrdersList = function(ordersList){
    return {type:SET_ORDERS_LIST,payload:ordersList};
};

export const setCounter = function(counter){
    return {type:SET_COUNTER,payload:counter};
};

export const setPendings = function(pendings){
    return {type:SET_PENDINGS,payload:pendings};
};

export const setReady = function(ready){
    return {type:SET_READY,payload:ready};
};

export const setSoldOrders = function(soldOrdersNumber){
    return {type:SET_SOLD_ORDERS,payload:soldOrdersNumber};
};

export const markOrder = function(orderData){
    return {type:MARK_ORDER,payload:orderData};
};

export const substractUnitToPendings = function(){
    return {type:SUBSTRACT_UNIT_TO_PENDINGS};
};

export const substractUnitToReady = function(){
    return {type:SUBSTRACT_UNIT_TO_READY};
};

export const addUnitToCounter = function(){
    return {type:ADD_UNIT_TO_COUNTER};
};

export const addUnitToPendings = function(){
    return {type:ADD_UNIT_TO_PENDINGS};
};

export const addUnitToReady = function(){
    return {type:ADD_UNIT_TO_READY};
}

export const addUnitToSoldOrders = function(){
    return {type:ADD_UNIT_TO_SOLD_ORDERS};
}

export const substractUnitToSoldOrders = function(){
    return {type:SUBSTRACT_UNIT_TO_SOLD_ORDERS};
}