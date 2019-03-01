const fs = require('fs');

const getAndUpdatetoNextOrderNumberOfDay = function(){
    try{
        let orderStadistics = JSON.parse(fs.readFileSync(__dirname+'/orderStadistics.json'));
        orderStadistics.orderNumber += 1;
        let data = JSON.stringify(orderStadistics);
        fs.writeFileSync(__dirname+'/orderStadistics.json', data);
        return orderStadistics.orderNumber;
    }catch(e){
        throw new Error("Error durante escritura o lectura en archivo");
    }
};

const substractUnitToPending = function(){
    try{
        let globalRegisters = JSON.parse(fs.readFileSync(__dirname+'/orderStadistics.json'));
        if(globalRegisters.pendings > 0){
            globalRegisters.pendings -= 1;
            let globalRegisterData = JSON.stringify(globalRegisters);
            fs.writeFileSync(__dirname+'/orderStadistics.json', globalRegisterData);
            return globalRegisters.pendings;
        }
        return null;
    }catch(e){
        throw new Error("Error al leer o escribir en archivo!");
    }
};

const addUnitToPending = function(){
    try{
        let orderStadistics = JSON.parse(fs.readFileSync(__dirname+'/orderStadistics.json'));
        orderStadistics.pendings += 1;
        let data = JSON.stringify(orderStadistics);
        fs.writeFileSync(__dirname+'/orderStadistics.json', data);
        return orderStadistics.pendings;
    }catch(e){
        throw new Error("Error durante escritura o lectura en archivo");
    }
};

const addUnitToReady = function(){
    try{
        let orderStadistics = JSON.parse(fs.readFileSync(__dirname+'/orderStadistics.json'));
        orderStadistics.ready += 1;
        let data = JSON.stringify(orderStadistics);
        fs.writeFileSync(__dirname+'/orderStadistics.json', data);
        return orderStadistics.ready;
    }catch(e){
        throw new Error("Error durante escritura o lectura en archivo!");
    }
};

const substractUnitToReady = function(){
    try{
        let globalRegisters = JSON.parse(fs.readFileSync(__dirname+'/orderStadistics.json'));
        if(globalRegisters.ready > 0){
            globalRegisters.ready -= 1;
            let globalRegisterData = JSON.stringify(globalRegisters);
            fs.writeFileSync(__dirname+'/orderStadistics.json', globalRegisterData);
            return globalRegisters.ready;
        }
        return null;
    }catch(e){
        throw new Error("Error al leer o escribir en archivo!");
    }
};

const addUnitToTotalOrders = function(){
    try{
        let orderStadistics = JSON.parse(fs.readFileSync(__dirname+'/orderStadistics.json'));
        orderStadistics.totalOrders += 1;
        let data = JSON.stringify(orderStadistics);
        fs.writeFileSync(__dirname+'/orderStadistics.json', data);
        return orderStadistics.totalOrders;
    }catch(e){
        throw new Error("Error durante escritura o lectura en archivo");
    }
};

const addUnitToSoldOrdersRegister = function(){
    try{
        let orderStadistics = JSON.parse(fs.readFileSync(__dirname+'/orderStadistics.json'));
        orderStadistics.soldOrders += 1;
        let data = JSON.stringify(orderStadistics);
        fs.writeFileSync(__dirname+'/orderStadistics.json', data);
        return orderStadistics.soldOrders;
    }catch(e){
        throw new Error("Error durante escritura o lectura en archivo");
    }
};

const substractUnitToSoldOrdersRegister = function(){
    try{
        let orderStadistics = JSON.parse(fs.readFileSync(__dirname+'/orderStadistics.json'));
        orderStadistics.soldOrders -= 1;
        let data = JSON.stringify(orderStadistics);
        fs.writeFileSync(__dirname+'/orderStadistics.json', data);
        return orderStadistics.soldOrders;
    }catch(e){
        throw new Error("Error durante escritura o lectura en archivo");
    }
};


const getOrdersStadistics = function(){
    try{
        let stadistics = JSON.parse(fs.readFileSync(__dirname+'/orderStadistics.json'));
        return stadistics;
    }catch(e){
        throw new Error("Error al leer archivo");
    }
};

module.exports = {
    getAndUpdatetoNextOrderNumberOfDay,
    substractUnitToPending,
    substractUnitToReady,
    addUnitToPending,
    addUnitToReady,
    addUnitToTotalOrders,
    getOrdersStadistics,
    addUnitToSoldOrdersRegister,
    substractUnitToSoldOrdersRegister
};