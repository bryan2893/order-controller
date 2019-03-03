import React from 'react';
import ItemPedido from './Item-pedido';

export default class ListItems extends React.Component{
    constructor(props){
        super(props);
        for (let index = 0; index < this.props.itemsComida.length; index++) {
          const comida = this.props.itemsComida[index];
          comida.cantidad = 0; //se agrega campo cantidad a cada comida para
          //que pueda ser manejada por "manejador de pedidos".
        }
    }

    //pedido es una lista de {"comida":"alguna comida"....}
    render(){
        let itemsComida = this.props.itemsComida.map((item)=>
            <ItemPedido key={item.id} comida={item} metodoGestionarOrden={this.props.metodoGestionarOrden}/>
        );

        return(
            <ul className="listaComidas">
                {itemsComida}
            </ul>
        );
    }
}