import React from 'react';

export default class ItemPedido extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {cantidad:0};
        this.handleMasBoton = this.handleMasBoton.bind(this);
        this.handleMenosBoton = this.handleMenosBoton.bind(this);
    }

    handleMasBoton(event){
        let comida = this.props.comida;
        let accionArealizar = '+';
        this.props.metodoGestionarOrden(comida,accionArealizar);

        /*
        this.setState((prevState) => ({
            cantidad:prevState.cantidad + 1
        }));

        this.props.manejadorPedido.agregarComidaAPedido(this.props.comida);
        */
    }

    handleMenosBoton(){
        let comida = this.props.comida;
        let accionArealizar = '-';
        this.props.metodoGestionarOrden(comida,accionArealizar);
        /*
        if(this.state.cantidad === 0)
            return;

        this.setState((prevState) => ({
            cantidad: prevState.cantidad - 1
        }));

        this.props.manejadorPedido.restarComidaPedido(this.props.comida);
        */
    }
    
    render(){
        return (
            <li className="listItem">
                
                <div className="itemInformationContainer">
                    <p className="nombreComida">{this.props.comida.nombre}</p>
                    <div className="priceAndQuantityContainer">
                        <p className="cantidad">{this.props.comida.cantidad}</p>
                        <p className="price">{'₡'+this.props.comida.precio}</p>
                    </div>
                </div>

                <div className="itemControlsContainer">
                    <input type="button" className="add" value="+" onClick={this.handleMasBoton}/>
                    <input type="button" className="substract" value="-" onClick={this.handleMenosBoton}/>
                </div>

            </li>
        );
    }
}