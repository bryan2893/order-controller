    import React from 'react';
    import Fooditem from './Fooditem';
    //import axios from 'axios';

    export default class FoodList extends React.Component{
        constructor(props){
            super(props);
        }

        render(){
            return(
                <ul>
                    {this.props.listaComidas.map(function(comida){
                        return <Fooditem comida={comida} key={comida.id}/>
                    })}
                </ul>
            );
        }
    }