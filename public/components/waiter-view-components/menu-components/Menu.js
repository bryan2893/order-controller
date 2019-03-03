import React from 'react';
import {getFoods} from '../../../model/index';
import FoodList from './FoodList';

export default class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {listaComidas:[]};
    }

    componentDidMount(){
        let self = this;
        getFoods(function(err,res){
            if(!err){
                self.setState({listaComidas:res});
            }
        });
    }

    render(){
        return (<FoodList listaComidas={this.state.listaComidas}/>);
    }
}