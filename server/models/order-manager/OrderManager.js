const fs = require('fs');
const OrderStadisticsManager = require('../order-stadistics-manager/OrdersStadisticsManager');

/*
DEPENDENCIAS
*/

const saveOrder = function(order,callback){
    /*
    estructura de una orden.
    {
        "cliente":"Bryan Hernandez",
        "listado":[{"comida":"hamburguesa","precio":1000,"cantidad":1}],
        "total":1000
    }
    */
    try{
        let orders = JSON.parse(fs.readFileSync(__dirname+'/orders.json'));
        try{
            order.numeroOrden = OrderStadisticsManager.getAndUpdatetoNextOrderNumberOfDay();
        }catch(e){
            return callback(new Error("Error al actualizar registro global 'orderNumber'"),null);
        }
        
        order.estado = 'p';//Variable que indica si la orden está lista o no.
        orders.push(order);
        let data = JSON.stringify(orders);
        fs.writeFileSync(__dirname+'/orders.json', data);
        try{
            OrderStadisticsManager.addUnitToPending();
            return callback(null,order);
        }catch(e){
            return callback(new Error("Error al actualizar registro global 'pendings'"),null);
        }
    }catch(e){
        return callback(e,null);
    }
};

const deleteOrder = function(numero,callback){
    try{
        let orders = JSON.parse(fs.readFileSync(__dirname+'/orders.json'));
        for (let index = 0; index < orders.length; index++) {
            const order = orders[index];
            if(order.numeroOrden === numero){
                orders.splice(index,1);
                let data = JSON.stringify(orders);
                fs.writeFileSync(__dirname+'/orders.json', data);

                let actualOrderState = order.estado;
                if(actualOrderState === 'l'){
                    //restar al registro de los pedidos listos.
                    //let actionRestar = substractUnitToReady();
                    //store.dispatch(actionRestar);
                    try{
                        OrderStadisticsManager.substractUnitToReady();
                        //restar totalOrders
                        return callback(null,order);
                    }catch(e){
                        return callback(new Error("Error al intentar modificar registro 'ready'"),null);
                    }
                }else if(actualOrderState === 'v'){
                    //restar al registro que indica total de pedidos vendidos.
                    //let actionRestarListos = substractUnitToReady();
                    //store.dispatch(actionRestarListos);
                    //let actionRestarVendidos = substractUnitToSoldOrders();
                    //store.dispatch(actionRestarVendidos);
                    try{
                        OrderStadisticsManager.substractUnitToReady();
                        OrderStadisticsManager.substractUnitToSoldOrdersRegister();
                        return callback(null,order);
                    }catch(e){
                        return callback(new Error("Error al intentar modificar registro 'ready'"),null);
                    }
                }else if(actualOrderState === 'p'){
                    //let actionRestarAPendientes = substractUnitToPendings();
                    //store.dispatch(actionRestarAPendientes);
                    try{
                        OrderStadisticsManager.substractUnitToPending();
                        return callback(null,order);
                    }catch(e){
                        return callback(new Error("Error al intentar leer registro 'pending'"),null);
                    }
                }else{
                    //no haga nada de modificaciones al estado.
                    return;
                }
                  
            }
        }
        return callback(new Error("El numero de orden no coincide"),null);
    }catch(e){
        return callback(new Error("Error durante escritura o lectura de archivo"),null);
    }
};

const getAllOrders = function(callback){
    try{
        let orders = JSON.parse(fs.readFileSync(__dirname+'/orders.json'));
        return callback(null,orders);
    }catch(e){
        return callback(new Error("Error durante lectura de archivo"),null);
    }
};

//Retorna true si la orden está lista o false en caso contrario. markupToSet puede ser 'p','l','v' para pendiente, listo y vendido respectivamente.
const markOrder = function(orderNumber,arrayOrders,markupToSet){

    for(let i = 0;i<arrayOrders.length;i++){
        const order = arrayOrders[i];

        if(order.numeroOrden === orderNumber){
            markupActually = order.estado;
            let orderBeforeChange = {...order};

            if (markupActually !== markupToSet){
                if(markupActually === 'l' && markupToSet === 'p'){
                    try{
                        OrderStadisticsManager.substractUnitToReady();
                        OrderStadisticsManager.addUnitToPending();
                        order.estado = 'p';
                        let dataToSave = JSON.stringify(arrayOrders);
                        fs.writeFileSync(__dirname+'/orders.json', dataToSave);
                        return orderBeforeChange;
                    }catch(e){
                        throw new Error(e.message);
                    }
                }
            }

            if(markupActually === 'l' && markupToSet === 'v'){
                try{
                    OrderStadisticsManager.addUnitToSoldOrdersRegister();
                    order.estado = 'v';
                    let dataToSave = JSON.stringify(arrayOrders);
                    fs.writeFileSync(__dirname+'/orders.json', dataToSave);
                    return orderBeforeChange;
                }catch(e){
                    throw new Error(e.message);
                }
            }

            if(markupActually === 'p' && markupToSet === 'l'){
                try{
                    OrderStadisticsManager.substractUnitToPending();
                    OrderStadisticsManager.addUnitToReady();
                    order.estado = 'l';
                    let dataToSave = JSON.stringify(arrayOrders);
                    fs.writeFileSync(__dirname+'/orders.json', dataToSave);
                    return orderBeforeChange;
                }catch(e){
                    throw new Error(e.message);
                }
            }

            if(markupActually === 'p' && markupToSet === 'v'){
                try{
                    OrderStadisticsManager.substractUnitToPending();
                    OrderStadisticsManager.addUnitToReady();
                    OrderStadisticsManager.addUnitToSoldOrdersRegister();
                    order.estado = 'v';
                    let dataToSave = JSON.stringify(arrayOrders);
                    fs.writeFileSync(__dirname+'/orders.json', dataToSave);
                    return orderBeforeChange;
                }catch(e){
                    throw new Error(e.message);
                }
            }

            if(markupActually === 'v' && markupToSet === 'l'){
                try{
                    OrderStadisticsManager.substractUnitToSoldOrdersRegister();
                    order.estado = 'l';
                    let dataToSave = JSON.stringify(arrayOrders);
                    fs.writeFileSync(__dirname+'/orders.json', dataToSave);
                    return orderBeforeChange;
                }catch(e){
                    throw new Error(e.message);
                }
            }

            if(markupActually === 'v' && markupToSet === 'p'){
                try{
                    OrderStadisticsManager.substractUnitToSoldOrdersRegister();
                    OrderStadisticsManager.addUnitToPending();
                    OrderStadisticsManager.substractUnitToReady();
                    order.estado = 'p';
                    let dataToSave = JSON.stringify(arrayOrders);
                    fs.writeFileSync(__dirname+'/orders.json', dataToSave);
                    return orderBeforeChange;
                }catch(e){
                    throw new Error(e.message);
                }
            }

            return null;
        }
    }

    return null;
}

const markOrderMain = function(data,callBack){
    try{
        let orders = JSON.parse(fs.readFileSync(__dirname+'/orders.json'));
        let orderTomark = data.numeroOrden;
        let stateToSet = data.estado;
        let orderReturned = markOrder(orderTomark,orders,stateToSet);
        if(orderReturned){
            return callBack(null,orderReturned);
        }else{
            return callback(new Error('La orden no fue encontrada o la transicion de estados no es válida'),null);
        }
    }catch(e){
        return callBack(new Error(e.message),null);
    }
};

//ELIMINAR SI FUNCIONA LA DE ARRIBA
const markOrderAsReady = function(orderNumber,callback){
    try{
        let orders = JSON.parse(fs.readFileSync(__dirname+'/orders.json'));
        for (let index = 0; index < orders.length; index++) {
            const order = orders[index];
            if(order.numeroOrden === orderNumber){
                if(!order.listo){
                    order.listo = true;
                    let data = JSON.stringify(orders);
                    fs.writeFileSync(__dirname+'/orders.json', data);
                    try{
                        OrderStadisticsManager.addUnitToReady();
                        OrderStadisticsManager.substractUnitToPending();
                        return callback(null,order);
                    }catch(e){
                        return callback(new Error("Ocurrio un error actualizando registro global ready!"),null);
                    }
                }else{
                    return callback(new Error("La orden ya se encuentra marcada como lista!"),null);
                }
            }
        }
        return callback(new Error("El numero de orden no existe!"),null);
    }catch(e){
        return callback(new Error("Error durante escritura o lectura de archivo"),null);
    }
};

const findOrderByClient = function(nombreCliente,callBack){
    try{
        let nombreEnMinusculaPorParametro = nombreCliente.toLowerCase();
        let orders = JSON.parse(fs.readFileSync(__dirname+'/orders.json'));
        for (let index = 0; index < orders.length; index++) {
            const order = orders[index];
            let nombreClienteEnOrdenYMinuscula = order.cliente.toLowerCase();
            if(nombreClienteEnOrdenYMinuscula === nombreEnMinusculaPorParametro){
                return callback(null,order);
            }
        }
        return callback(new Error("Orden no encontrada!"),null);
    }catch(e){
        return callback(new Error("Error durante lectura de archivo"),null);
    }
};

const findOrderByNumber = function(number){
    try{
        let orders = JSON.parse(fs.readFileSync(__dirname+'/orders.json'));
        for (let index = 0; index < orders.length; index++) {
            const order = orders[index];
            if(order.numeroOrden === number){
                return callback(null,order);
            }
        }
        return callback(new Error("Orden no encontrada!"),null);
    }catch(e){
        return callback(new Error("Error durante lectura de archivo"),null);
    }
};

module.exports = {saveOrder,deleteOrder,getAllOrders,markOrderAsReady,markOrderMain,findOrderByClient,findOrderByNumber};