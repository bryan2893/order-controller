let tokenCreator = require('../services/tokenCreator');
const UsersManager = require('../models/users-manager/UsersManager');

let login = function(req,res){
    let username = req.body.username; //El cual es único en la base de datos, no puede haber otro igual.
    let password = req.body.password;

    UsersManager.findUser(username,password,function(err,us){
        if(err){
            return res.status(500).send({mensaje:err.message});
        }else{
            return res.status(200).send({token:tokenCreator.createToken(us),user:us});
        }
    });
};

module.exports = {login};