import React from 'react';
import Toggle from './Toggle';

export default class ShipCar extends React.Component{
    constructor(props){
        super(props);
        this.state = {inputNombreCliente:'',inputPagoCon:'',vuelto:0};
        this.handleNombreClienteonChange = this.handleNombreClienteonChange.bind(this);
        this.handlePagoConInputOnChange = this.handlePagoConInputOnChange.bind(this);
        this.handleOnclickButtonProcessOrder = this.handleOnclickButtonProcessOrder.bind(this);
        this.refToToggle = React.createRef();//Referencia al objeto Toggle.
        this.clearAll.bind(this);
    }

    handleOnclickButtonProcessOrder(event){
        this.props.manejadorDePedido(this.state.inputNombreCliente,this.refToToggle.current.getSelectedValue());
    }

    clearAll(){
        this.setState({inputNombreCliente:'',inputPagoCon:'',vuelto:0});
    }

    handleNombreClienteonChange(event){
        this.setState({inputNombreCliente:event.target.value});
    }

    handlePagoConInputOnChange(event){
        if(event.target.value === ''){
            this.setState({inputPagoCon:event.target.value,vuelto:0});
        }else{
            this.setState({inputPagoCon:event.target.value,vuelto:event.target.value - this.props.total});
        }
    }

    render(){
        if(this.props.listado.length === 0){
            return (<h3>Orden vacía!</h3>);
        }else{
            let items = this.props.listado.map(function(filaComida){
                return (<p className="letraMediana"><span>+{filaComida.cantidad} </span>{filaComida.nombre}</p>);
            });
    
            return(
                <div className="carritoItems">
                    <input type="text" name="cliente" id="cli" placeholder="Nombre del cliente" value={this.state.inputNombreCliente} onChange={this.handleNombreClienteonChange}/>
                    <input type="number" name="pagocon" id="pag" placeholder="Pagó con" value={this.state.inputPagoCon} onChange={this.handlePagoConInputOnChange}/>
                    {items}

                    <Toggle ref={this.refToToggle}/>

                    <hr className = "divisorTotal"/>
                    <p className="letraMediana"><span>Total: </span>₡{this.props.total}</p>
                    <p className="letraMediana"><span>Vuelto: </span>₡{this.state.vuelto}</p>

                    <button onClick={this.handleOnclickButtonProcessOrder}>Procesar orden</button>
                </div>
            );
        }
    }
}