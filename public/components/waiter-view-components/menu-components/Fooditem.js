import React from 'react';

export default class Fooditem extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (<li className="menuItem">{this.props.comida.nombre +" ₡"+ this.props.comida.precio}
                    <div>
                        <button>Eliminar</button>
                        <button onClick={this.props.funcion}>Editar</button>
                    </div>
                </li>);
    }
}