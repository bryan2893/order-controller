    import React from 'react';
    import Fooditem from './Fooditem';

    export default class FoodList extends React.Component{
        constructor(props){
            super(props);
        }

        render(){
            return(
                <ul className="menuContainer">
                    {this.props.listaComidas.map(function(comida){
                        return <Fooditem comida={comida} key={comida.id}/>
                    })}
                </ul>
            );
        }
    }