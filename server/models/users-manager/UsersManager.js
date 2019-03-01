const fs = require('fs');
const uuidv4 = require('uuid/v4');

const saveUser = function(u,callback){
    try{
        let users = JSON.parse(fs.readFileSync(__dirname+'/users.json'));
        let existe = false;
        for (let index = 0; index < users.length; index++) {
            const user = users[index];
            if(user.username === u.username){
                existe = true;
            }
        }
        if(!existe){
            u.id = uuidv4();
            users.push(u);
            let usersData = JSON.stringify(users);
            fs.writeFileSync(__dirname+'/users.json', usersData);
            callback(null,u);
        }else{
            callback(new Error("El usuario ya existe!"),null);
        }
    }catch(e){
        callback(new Error("Error durante escritura o lectura de archivo"),null);
    }
};

const deleteUser = function(id,callBack){
    try{
        let users = JSON.parse(fs.readFileSync(__dirname+'/users.json'));
        for (let index = 0; index < users.length; index++) {
            const user = users[index];
            if(user.id === id){
                //deleteUserIdOfGlobalRegister(user.id);
                users.splice(index,1);
                let data = JSON.stringify(users);
                fs.writeFileSync(__dirname+'/users.json', data);
                return callBack(null,user);
            }
        }
        return callBack(new Error("Usuario no encontrado!"),null);
    }catch(e){
        return callBack(new Error("Error durante escritura o lectura de archivo"),null);
    }
};

const findUser = function(username,password,callBack){
    try{
        let users = JSON.parse(fs.readFileSync(__dirname+'/users.json'));
        for (let index = 0; index < users.length; index++) {
            const user = users[index];
            if(user.username === username && user.password === password){
                return callBack(null,user);
            }
        }
        return callBack(new Error("Usuario no encontrado!"),null);
    }catch(e){
        return callBack(new Error("Error durante lectura de archivo"),null);
    }
};

const findUserById = function(id,callBack){
    try{
        let users = JSON.parse(fs.readFileSync(__dirname+'/users.json'));
        for (let index = 0; index < users.length; index++) {
            const user = users[index];
            if(user.id === id){
                return callBack(null,user);
            }
        }
        return callBack(new Error("Usuario no encontrado!"),null);
    }catch(e){
        return callBack(new Error("Error durante lectura de archivo"),null);
    }
};

module.exports = {saveUser,deleteUser,findUser,findUserById};