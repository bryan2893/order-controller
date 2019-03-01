const fs = require('fs');
const uuidv4 = require('uuid/v4');

const saveFood = function(food,callBack){
    //code to save manager person in file...
    try{
        let foods = JSON.parse(fs.readFileSync(__dirname+'/menu.json'));
        food.id = uuidv4();//se asigna el valor del id al objeto food.
        foods.push(food);
        let data = JSON.stringify(foods);
        fs.writeFileSync(__dirname+'/menu.json', data);
        return callBack(null,food);
    }catch(e){
        return callBack(new Error(e.message),null);
    }
};

const deleteFood = function(id,callBack){
    try{
        let foods = JSON.parse(fs.readFileSync(__dirname+'/menu.json'));
        for (let index = 0; index < foods.length; index++) {
            const food = foods[index];
            if(food.id === id){
                foods.splice(index,1);
                let data = JSON.stringify(foods);
                fs.writeFileSync(__dirname+'/menu.json', data);
                return callBack(null,food);
            }
        }
        return callBack(new Error("Comida no encontrada para eliminar!"),null);
    }catch(e){
        return callBack(new Error("Error durante escritura o lectura de archivo"),null);
    }
};

const findFoodByName = function(foodName,callBack){
    try{
        let nombreEnMinusculaPorParametro = foodName.toLowerCase();
        let foods = JSON.parse(fs.readFileSync(__dirname+'/menu.json'));
        for (let index = 0; index < foods.length; index++) {
            const food = foods[index];
            let nombreComidaEnMenuYMinuscula = food.comida.toLowerCase();
            if(nombreComidaEnMenuYMinuscula === nombreEnMinusculaPorParametro){
                return callBack(null,food);
            }
        }
        return callBack(new Error("Comida no encontrada por nombre!"),null);
    }catch(e){
        return callBack(new Error("Error durante lectura de archivo"),null);
    }
};

const findFoodById = function(id,callBack){
    try{
        let foods = JSON.parse(fs.readFileSync(__dirname+'/menu.json'));
        for (let index = 0; index < foods.length; index++) {
            const food = orders[index];
            if(food.id === id){
                return callBack(null,food);
            }
        }
        return callBack(new Error("Comida no encontrada por id!"),null);
    }catch(e){
        return callBack(new Error("Error durante lectura de archivo"),null);
    }
};

const getFoods = function(callBack){
    try{
        let foods = JSON.parse(fs.readFileSync(__dirname+'/menu.json'));
        return callBack(null,foods);
    }catch(e){
        return callBack(new Error(e.message),null);
    }
}

module.exports = {
    saveFood,
    deleteFood,
    findFoodByName,
    findFoodById,
    getFoods
};