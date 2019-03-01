const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const publicPath = path.resolve(__dirname + '/../public/');
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let authController = require('./controllers/auth');

const OrderManager = require('./models/order-manager/OrderManager');
const OrderStadisticsManager = require('./models/order-stadistics-manager/OrdersStadisticsManager');
const MenuManager = require('./models/menu-manager/MenuManager');
const UserManager = require('./models/users-manager/UsersManager');

const middleware = require('./middlewares/socketAuth');

//Ruta para loguear usuarios administradores.
app.post('/login',authController.login);

//Sirve el archivo html para login.
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/../public/index.html'));
});

app.get('/waiter*',function(req,res){
    res.sendFile(path.join(__dirname+'/../public/waiter.html'));
});

app.get('/pruebaWaiter',function(req,res){
    res.sendFile(path.join(__dirname+'/../public/PrototipoWaiter/waiterClient.html'));
});

app.post('/addOrder',function(req,res){
    let order = req.body;
    
    OrderManager.saveOrder(order,function(err,data){
        if(!err){
            res.status(200).send(data);
        }else{
            res.status(500).send({error:err.message});
        }
    });
});

app.get("/globalStateSodaApp",function(req,res){
    OrderManager.getAllOrders(function(err,orders){
        if(!err){
            let state = {
                orders:orders,
                stadistics:null
            };
            try{
                state.stadistics = OrderStadisticsManager.getOrdersStadistics();
                return res.status(200).send(state);
            }catch(e){
                return res.status(500).send({error:"Ocurrio un error intentando obtener estadísticas de las ordenes!"});
            }
        }else{
            res.status(500).send({error:err.message});
        }
    });
});

app.post("/markOrder",function(req,res){
    let markupInformation = req.body;//{numeroOrden:0,estado:'l'}
    console.log("informacion enviada para marcar la ordem"+JSON.stringify(markupInformation));

    OrderManager.markOrderMain(markupInformation,function(err,order){
        if(!err){
            res.status(200).send(order);
        }else{
            res.status(500).send({error:err.message});
        }
    });
});

//ELIMINAR SI FUNCIONA LA DE ARRIBA
app.post("/setOrderAsReady",function(req,res){
    let data = req.body;

    OrderManager.markOrderAsReady(data.orderNumber,function(err,order){
        if(!err){
            res.status(200).send(order);
        }else{
            res.status(500).send({error:err.message});
        }
    });
});

app.post('/deleteOrder',function(req,res){
    let order = req.body;

    OrderManager.deleteOrder(order.orderNumber,function(err,order){
        if(!err){
            res.status(200).send(order);
        }else{
            res.status(500).send({error:err.message});
        }
    });
});

app.post('/regComida',middleware.ensureAuthenticate,function(req,res){
    console.log(req.body);
    let userId = req.user;//se obtiene el id del usuario.
    //6e447d3e-6e45-4fac-8f36-9ff933c0a8a0
    console.log("Id pasado por el middleware -> "+ userId);
    UserManager.findUserById(userId,function(err,user){
        if(!err){//si no hay ningun error buscando el usuario entonces...
            let comida = req.body;
            console.log("El usuario existe entonces la comida va a ser guardada por --> "+JSON.stringify(user));
            MenuManager.saveFood(comida,function(erro,data){
                if(!erro){
                    res.status(200).send(data);
                }else{
                    res.status(500).send({error:erro.message});
                }
            });
        }else{
           res.status(401).send(err.message);
        }
    });
});

app.get('/obtenerComidas',function(req,res){
    MenuManager.getFoods(function(err,response){
        if(err){
            res.status(500).send({error:err.message});
        }else{
            res.status(200).send(response);
        }
    });
});

module.exports = app;