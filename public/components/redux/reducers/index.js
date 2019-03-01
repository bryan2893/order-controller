import {ADD_ARTICLE,ADD_ORDER,SET_ORDERS_LIST, SET_PENDINGS,SET_COUNTER,SET_READY,SET_SOLD_ORDERS,MARK_ORDER,SUBSTRACT_UNIT_TO_PENDINGS,ADD_UNIT_TO_COUNTER,ADD_UNIT_TO_PENDINGS,ADD_UNIT_TO_READY,DELETE_ORDER,SUBSTRACT_UNIT_TO_READY,ADD_UNIT_TO_SOLD_ORDERS,SUBSTRACT_UNIT_TO_SOLD_ORDERS} from '../constants/action-types';

//Order format must be...
/*
{
    numeroOrden:1,
    cliente:"Andres Hernandez",
    listado:[{"comida":"hamburguesa con papas","precio":1000,"cantidad":1},{"comida":"hamburguesa normal","precio":1000,"cantidad":3}],
    total:3000
}
*/

const initialState = {
    articles:[],
    orders:[],
    stadistics:{counter:0,pendings:0,ready:0,soldOrders:0}
};

const rootReducer = function(state = initialState,action){

    switch(action.type){
        case ADD_ARTICLE:
            return Object.assign({},state,{articles:state.articles.concat(action.payload)});//{ ...state, articles: [...state.articles, action.payload] };
        case ADD_ORDER:
            return Object.assign({},state,{orders:state.orders.concat(action.payload)});
        case DELETE_ORDER:
            return Object.assign({}, state, {
                orders: state.orders.filter((order, index) => {
                        return order.numeroOrden !== action.payload.numeroOrden;
                    })
                });
        case SET_ORDERS_LIST:
            return { ...state, orders: action.payload };
        case SET_PENDINGS:
            return {...state, stadistics: {...state.stadistics, pendings:action.payload}};
        case SET_COUNTER:
            return {...state, stadistics: {...state.stadistics, counter:action.payload}};
        case SET_READY:
            return {...state, stadistics: {...state.stadistics, ready:action.payload}};
        case SET_SOLD_ORDERS:
            return {...state, stadistics: {...state.stadistics, soldOrders:action.payload}};
        case MARK_ORDER:
            return Object.assign({}, state, {
                        orders: state.orders.map((order, index) => {
                        if (order.numeroOrden === action.payload.numeroOrden) {
                            let transicionCambio = action.payload.estado;
                            return Object.assign({}, order, {
                                estado: transicionCambio
                            });
                        }
                        return order
                        })
                    });
        case ADD_UNIT_TO_PENDINGS:
            return {...state, stadistics: {...state.stadistics, pendings:state.stadistics.pendings + 1}};
        case SUBSTRACT_UNIT_TO_PENDINGS:
            return {...state, stadistics: {...state.stadistics, pendings:state.stadistics.pendings - 1}};
        case SUBSTRACT_UNIT_TO_READY:
            return {...state, stadistics: {...state.stadistics, ready:state.stadistics.ready - 1}};
        case ADD_UNIT_TO_COUNTER:
            return {...state, stadistics: {...state.stadistics, counter:state.stadistics.counter + 1}};
        case ADD_UNIT_TO_READY:
            return {...state, stadistics: {...state.stadistics, ready:state.stadistics.ready + 1}};
        case ADD_UNIT_TO_SOLD_ORDERS:
            return {...state, stadistics: {...state.stadistics, soldOrders:state.stadistics.soldOrders + 1}};
        case SUBSTRACT_UNIT_TO_SOLD_ORDERS:
            return {...state, stadistics: {...state.stadistics, soldOrders:state.stadistics.soldOrders - 1}};
        default:
            return state;
    }
};

export default rootReducer;