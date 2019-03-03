import React from 'react';
import ItemPedido from './Item-pedido';

export default class ListItems extends React.Component{
    constructor(props){
        super(props);
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