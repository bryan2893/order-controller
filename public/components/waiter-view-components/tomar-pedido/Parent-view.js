import React from 'react';
import axios from 'axios';
import ListItems from './List-items';
import ManejadorPedidos from './services/Manejador2';
import ShipCar from './Ship-Car';
import '../../../css/waiter-view-styles/tomaPedido.css';
import socketLogicObject from '../../../socket-logic/waiter-logic';
import {getFoods} from '../../../model/index';

//Lista del menu de la soda, provisional.
let listaPrueba = [
    {clave:'1',comida:"hamburguesa con papas",precio:1500,cantidad:0},
    {clave:'2',comida:"Hamburguesa normal",precio:1000,cantidad:0},
    {clave:'3',comida:"Hamburguesa especial(doble)",precio:2500,cantidad:0},
    {clave:'4',comida:"Taco 1000",precio:1000,cantidad:0},
    {clave:'5',comida:"Taco 1500",precio:1500,cantidad:0},
    {clave:'6',comida:"Super taco 2000",precio:2000,cantidad:0},
    {clave:'7',comida:"Super taco doble papas 2500",precio:2500,cantidad:0},
    {clave:'8',comida:"Chalupa pequeña(sin papas)",precio:1000,cantidad:0},
    {clave:'9',comida:"Chalupa pequeña(con papas)",precio:1500,cantidad:0},
    {clave:'10',comida:"Super chalupa(con papas)",precio:2000,cantidad:0},
    {clave:'11',comida:"Orden papas 1000",precio:1000,cantidad:0},
    {clave:'12',comida:"Orden papas 1500",precio:1500,cantidad:0},
    {clave:'13',comida:"Orden papas 2000",precio:2000,cantidad:0},
    {clave:'14',comida:"Burrito normal",precio:1000,cantidad:0},
    {clave:'15',comida:"Burrito (con papas)",precio:1500,cantidad:0},
    {clave:'16',comida:"Super burrito(con papas)",precio:2000,cantidad:0},
    {clave:'17',comida:"Salchipapas 1500",precio:1500,cantidad:0},
    {clave:'18',comida:"Salchipapas 2000",precio:2000,cantidad:0},
    {clave:'19',comida:"Torta arreglada",precio:1000,cantidad:0},
    {clave:'20',comida:"Torta arreglada(con papas)",precio:1500,cantidad:0},
    {clave:'21',comida:"Super torta(con papas)",precio:2000,cantidad:0},
    {clave:'22',comida:"Empanada 1000",precio:1000,cantidad:0},
    {clave:'23',comida:"Empanada arreglada",precio:1500,cantidad:0},
    {clave:'24',comida:"Super empanada",precio:2200,cantidad:0},
    {clave:'25',comida:"Fresco natural(chan,piña,maracuya,cas)",precio:500,cantidad:0},
    {clave:'26',comida:"Batido en agua(Papaya,mora,fresa,frutas)",precio:700,cantidad:0},
    {clave:'27',comida:"Batido en leche",precio:1200,cantidad:0},
    {clave:'28',comida:"Nacho 2000 (pequeño)",precio:2000,cantidad:0},
    {clave:'29',comida:"Nacho 3000 (grande)",precio:3000,cantidad:0},
    {clave:'30',comida:"Papanacho pequeño",precio:2500,cantidad:0},
    {clave:'31',comida:"Papanacho grande",precio:3500,cantidad:0},
    {clave:'32',comida:"Papi carne pequeño",precio:2500,cantidad:0},
    {clave:'33',comida:"Papi carne grande",precio:3500,cantidad:0},
    {clave:'34',comida:"Papi pollo pequeño",precio:2000,cantidad:0},
    {clave:'35',comida:"Papi pollo grande",precio:3000,cantidad:0},
    //refrescos
    {clave:'36',comida:"Coca retornable 2.5L",precio:1500,cantidad:0},
    {clave:'37',comida:"Pitufa",precio:500,cantidad:0},
    {clave:'38',comida:"Tropical 2.5L",precio:1850,cantidad:0},
    {clave:'39',comida:"Te tropical pitufa",precio:550,cantidad:0},
    {clave:'40',comida:"Te tropical mediano",precio:700,cantidad:0}

  ];//solo para probar el componente de hacer pedidos.

let manejadorPedidos = null;


export default class ParentViewTomaPedido extends React.Component{

    constructor(props){
        super(props);

        this.refToShipCar = React.createRef();

        this.state = {
            inputNombreCliente:'',
            pedido:{listado:[],total:0},
            menu:[],
            isConnected:false
        };


        this.handleTomarPedido = this.handleTomarPedido.bind(this);
        this.handleResetOnClick = this.handleResetOnClick.bind(this);
        this.gestionarOrden = this.gestionarOrden.bind(this);
    }

    componentWillMount(){
        let selfReference = this;
        socketLogicObject.on('connect',function(){
            console.log("El socket se conecto correctamente!!");
            selfReference.setState({isConnected:true});

            socketLogicObject.on('disconnect',function(){
                selfReference.setState({isConnected:false});
            });
        });

        socketLogicObject.connect();
    }

    componentDidMount(){
        let selfReference = this;
        getFoods(function(err,listaComidas){
            if(!err){
                //Primeramente se agrega un campo cantidad a cada item del menu
                //ya que ese campo lo utiliza el manejador de pedidos.
                for (let index = 0; index < listaComidas.length; index++) {
                    const itemComida = listaComidas[index];
                    itemComida.cantidad = 0;
                }
                manejadorPedidos = new ManejadorPedidos(listaComidas);
                selfReference.setState({menu:listaComidas});
            }
        });

    }

    componentWillUnmount(){
        socketLogicObject.disconnect();//Se desconecta la conexión del socket.
    }

    //Esta funcion es invocada desde el componente item-pedido.
    gestionarOrden(comida,accionARealizar){
        if(manejadorPedidos){
            switch(accionARealizar){
                case '+':
                    let menuActualizadoAlSumar = manejadorPedidos.agregarComidaAPedido(comida);
                    let listaPedido1 =  manejadorPedidos.getPedido();
                    let totalPedido1 = manejadorPedidos.getMontoTotal();
                    let pedidoObject1 = {listado:listaPedido1,total:totalPedido1};
                    this.setState({menu:menuActualizadoAlSumar,pedido:pedidoObject1});
                    break;
                case '-':
                    let menuActualizadoAlRestar = manejadorPedidos.restarComidaPedido(comida);
                    let listaPedido2 =  manejadorPedidos.getPedido();
                    let totalPedido2 = manejadorPedidos.getMontoTotal();
                    let pedidoObject2 = {listado:listaPedido2,total:totalPedido2};
                    this.setState({menu:menuActualizadoAlRestar,pedido:pedidoObject2});
                    break;
                default:
                    break;
            }
            
        }
    }

    handleResetOnClick(event){
        if(manejadorPedidos){
            let menuReseteado = manejadorPedidos.resetAll();
            this.setState({inputNombreCliente:'',menu:menuReseteado,pedido:{listado:[],total:0}});
            this.refToShipCar.current.clearAll();//se limpian los campos del carrito de compras.
        }
    }

    //Para guardar el pedido correctamente en la base de datos.
    handleTomarPedido(nombreCliente,orderType){
        if(manejadorPedidos){
            let pedido = {};
            if (nombreCliente === '' || manejadorPedidos.isEmpty()){
                alert("Ingrese los datos necesarios!");
            }else{
                if(confirm("Esta seguro que desea registrar el pedido ?")){
                    pedido.cliente = {nombre:nombreCliente};
                    pedido.listado = manejadorPedidos.getPedido();
                    pedido.total = manejadorPedidos.getMontoTotal();
                    //Obtener aqui el tipo de pedido(express,llevar...)
                    pedido.tipo = orderType;

                    console.log("El pedido que estas enviando a guardar es : "+JSON.stringify(pedido));

                    axios.post('/addOrder',pedido).then((response)=>{
                        if(this.state.isConnected){
                            socketLogicObject.emit('waiter-send-order',response.data);
                        }
                        alert("Orden registrada exitosamente!");
                        let menuReseteado = manejadorPedidos.resetAll();
                        this.setState({inputNombreCliente:'',menu:menuReseteado,pedido:{listado:[],total:0}});
                        this.refToShipCar.current.clearAll();//se limpian los campos del carrito de compras.
                    },error => {
                    if (error.response) {
                        console.log("error.response"+error.response);
            
                        //this.setState({err:error.response.message});
            
                        console.log(error.response.data);
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        // console.log(error.response.data);
                        // console.log(error.response.status);
                        // console.log(error.response.headers);
                        } else if (error.request) {
                            console.log("error.request: "+error.request);
                            //this.setState({err:'error inesperado :-( !'});
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js
                            console.log(error.request);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            //console.log('Error', error.message);
                            this.setState({err:error.message});
                        }
                    });
                }
            }
        }
    }

    render(){
        return (
            <div className="container-hacer-pedido">
                <div className="list-comidas-container">
                    <ShipCar ref={this.refToShipCar} listado={this.state.pedido.listado} total={this.state.pedido.total} manejadorDePedido={this.handleTomarPedido}/>
                    <input type="button" value="Resetear" onClick={this.handleResetOnClick}/>
                    <ListItems itemsComida={this.state.menu} metodoGestionarOrden={this.gestionarOrden}/>
                </div>
            </div>
        );
    }
}