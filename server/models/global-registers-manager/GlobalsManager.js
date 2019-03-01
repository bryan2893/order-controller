const fs = require('fs');

//private
const deleteUserIdOfGlobalRegister = function(userIdToDelete){
    try{
        let globalRegisters = JSON.parse(fs.readFileSync(__dirname+'/globalRegisters.json'));
        for (let index = 0; index < globalRegisters.registeredUserIds.length; index++) {
            const idUsedByOtherPerson = globalRegisters.registeredUserIds[index];
            if(idUsedByOtherPerson === userIdToDelete){
                globalRegisters.registeredUserIds.splice(index,1);
                let data = JSON.stringify(globalRegisters);
                fs.writeFileSync(__dirname+'/globalRegisters.json', data);
                return idUsedByOtherPerson;
            }
        }
        return null;
    }catch(e){
        return new Error("Error inesperado durante la eliminación");
    }
};

//private
const isUserIdTakenByOtherPerson = function(id){
    try{
        let globalRegisters = JSON.parse(fs.readFileSync(__dirname+'/globalRegisters.json'));
        for (let index = 0; index < globalRegisters.registeredUserIds.length; index++) {
            const idUsedByOtherPerson = globalRegisters.registeredUserIds[index];
            if(idUsedByOtherPerson === id){
                return true;
            }
        }
        return false;
    }catch(e){
        return new Error("Error inesperado durante lectura de archivo");
    }
};

//private
const getAndUpdatetoNextfoodId = function(){
    try{
        let globalRegisters = JSON.parse(fs.readFileSync(__dirname+'/globalRegisters.json'));
        globalRegisters.foodId += 1;
        let data = JSON.stringify(globalRegisters);
        fs.writeFileSync(__dirname+'/globalRegisters.json', data);
        return globalRegisters.foodId;
    }catch(e){
        return new Error("Error durante escritura o lectura en archivo");
    }    
};

module.exports = {
    deleteUserIdOfGlobalRegister,
    isUserIdTakenByOtherPerson,
    getAndUpdatetoNextfoodId
};