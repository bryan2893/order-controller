const httpServer = require('./httpServer');
const socketIO = require('socket.io')(httpServer);
const credentials = require('./config');

//const orderModel = require('./models/order');
//const menuModel = require('./models/menu');

/*
const UsersManager = require('./models/users-manager/UsersManager');
UsersManager.saveUser(
    {name:"Bryan Hernandez A",username:"bryanH",password:"1234"},
    function(err,userSaved){
        if(!err){
            console.log(JSON.stringify(userSaved));
        }else{
            console.log(err.message);
        }
    });
*/

//socketIO.use(); //usar midleware para regular acceso.

const sodaSpace = socketIO.of('/soda');

sodaSpace.on('connection',function(socket){
    console.log('Pantalla soda conectada');

    socket.on('disconnect',function(){
        socket.removeAllListeners();
    });

});

//espacio de nombres para conexiones de meseros.
const waiterSpace = socketIO.of('/waiter');

waiterSpace.on('connection',function(socket){
    console.log('Mesero conectado');

    socket.on('waiter-send-order',function(data){
        sodaSpace.emit('waiter-send-order',data);
    });

    socket.on('waiter-mark-order',function(data){
        sodaSpace.emit('waiter-mark-order',data);
    });

    socket.on('waiter-delete-order',function(order){
        sodaSpace.emit('waiter-delete-order',order);
    });

    socket.on('disconnect',function(){
        socket.removeAllListeners();
    });

});

httpServer.listen(credentials.PORT,function(){
    console.log("Sevidor escuchando en el puerto "+credentials.PORT);
});
