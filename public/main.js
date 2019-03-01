import React from 'react';
import ReactDOM from 'react-dom';

import SodaApp from './components/soda-view-components/SodaApp';

import './css/soda-view-styles/card.css';
import './css/soda-view-styles/header.css';

function disablegoBackHistory(){
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };
}

import socket from './socket-logic/soda-logic';
import store from './components/redux/store/index';
import {addOrder} from './components/redux/actions/index';
import {markOrder} from './components/redux/actions/index';
import {substractUnitToPendings} from './components/redux/actions/index';
import {addUnitToCounter} from './components/redux/actions/index';
import {addUnitToPendings} from './components/redux/actions/index';
import {addUnitToReady} from './components/redux/actions/index';
import {deleteOrder} from './components/redux/actions/index';
import {substractUnitToReady} from './components/redux/actions/index';
import {addUnitToSoldOrders} from './components/redux/actions/index';
import {substractUnitToSoldOrders} from './components/redux/actions/index';

socket.on('connect',function(){

    socket.on('waiter-send-order',function(data){
        let action = addOrder(data);
        store.dispatch(action);
        let action2 = addUnitToCounter();
        store.dispatch(action2);
        let action3 = addUnitToPendings();
        store.dispatch(action3);
    });

    socket.on('waiter-mark-order',function(data){
        console.log("data enviada para marcar la orden = "+JSON.stringify(data));

        let orders = store.getState().orders;//se obtienen las ordenes de compra del store.
        let ordenBuscada = null;
        let numeroOrdenAmarcar = data.numeroOrden;

        for (let index = 0; index < orders.length; index++) {
            const order = orders[index];
            if(order.numeroOrden === numeroOrdenAmarcar){
                ordenBuscada = order;
                break;
            }
        }

        if(ordenBuscada){
            let actualOrderState = ordenBuscada.estado;
            let stateToGo = data.estado;

            //Verificar de que estado a que estado pasa la orden.
            if (actualOrderState !== stateToGo){
                if(actualOrderState === 'l' && stateToGo === 'p'){
                    //OrderStadisticsManager.substractUnitToReady();
                    //OrderStadisticsManager.addUnitToPending();
                    let action = markOrder(data);
                    store.dispatch(action);
                    let action2 = substractUnitToReady();
                    store.dispatch(action2);
                    let action3 = addUnitToPendings();
                    store.dispatch(action3);
                }

                if(actualOrderState === 'l' && stateToGo === 'v'){
                    let action = markOrder(data);
                    store.dispatch(action);
                    let action2 = addUnitToSoldOrders();
                    store.dispatch(action2);
                }

                if(actualOrderState === 'p' && stateToGo === 'l'){
                    //OrderStadisticsManager.substractUnitToPending();
                    //OrderStadisticsManager.addUnitToReady();
                    let action = markOrder(data);
                    store.dispatch(action);
                    let action2 = substractUnitToPendings();
                    store.dispatch(action2);
                    let action3 = addUnitToReady();
                    store.dispatch(action3);
                }

                if(actualOrderState === 'p' && stateToGo === 'v'){
                
                    //OrderStadisticsManager.substractUnitToPending();
                    //OrderStadisticsManager.addUnitToReady();
                    //OrderStadisticsManager.addUnitToSoldOrdersRegister();
                    
                    let action = markOrder(data);
                    store.dispatch(action);
                    let action2 = substractUnitToPendings();
                    store.dispatch(action2);
                    let action3 = addUnitToReady();
                    store.dispatch(action3);
                    let action4 = addUnitToSoldOrders();
                    store.dispatch(action4);
                   
                }

                if(actualOrderState === 'v' && stateToGo === 'l'){
                    
                    let action = markOrder(data);
                    store.dispatch(action);
                    let action2 = substractUnitToSoldOrders();
                    store.dispatch(action2);
                    
                }

                if(actualOrderState === 'v' && stateToGo === 'p'){
                    
                    let action = markOrder(data);
                    store.dispatch(action);
                    let action2 = addUnitToPendings();
                    store.dispatch(action2);
                    let action3 = substractUnitToReady();
                    store.dispatch(action3);
                    let action4 = substractUnitToSoldOrders();
                    store.dispatch(action4);
                }

            }
        }

    });

    socket.on('waiter-delete-order',function(data){

        console.log("data recivida para eliminar la orden = "+JSON.stringify(data));

        let orders = store.getState().orders;//se obtienen las ordenes de compra del store.
        let ordenBuscada = null;
        let numeroOrdenAmarcar = data.numeroOrden;
        console.log("El numero de orden a aliminar es: "+numeroOrdenAmarcar);
        for (let index = 0; index < orders.length; index++) {
            let order = orders[index];
            if(order.numeroOrden === numeroOrdenAmarcar){
                ordenBuscada = order;
                break;
            }
        }

        if (ordenBuscada){
            console.log("Entro porque encontró la orden!");
            let deleteAction = deleteOrder(data);
            store.dispatch(deleteAction);

            let actualOrderState = ordenBuscada.estado;
            if(actualOrderState === 'l'){
                //restar al registro de los pedidos listos.
                let actionRestar = substractUnitToReady();
                store.dispatch(actionRestar);
            }else if(actualOrderState === 'v'){
                //restar al registro que indica total de pedidos vendidos.
                let actionRestarListos = substractUnitToReady();
                store.dispatch(actionRestarListos);
                let actionRestarVendidos = substractUnitToSoldOrders();
                store.dispatch(actionRestarVendidos);

            }else if(actualOrderState === 'p'){
                let actionRestarAPendientes = substractUnitToPendings();
                store.dispatch(actionRestarAPendientes);
            }else{
                //no haga nada de modificaciones al estado.
                return;
            }
        }
    });

});

document.addEventListener('DOMContentLoaded',function(event){

    disablegoBackHistory();
    
    ReactDOM.render(
        <SodaApp />,
        document.getElementById('root')
    );
    
    socket.connect();
});


