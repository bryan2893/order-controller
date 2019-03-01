import React from 'react';
import Header from './Header';
import ParentViewTomaPedido from './tomar-pedido/Parent-view';
import {getSessionStorage} from '../../services/index';
import {Redirect} from 'react-router-dom';

export default class RegOrden extends React.Component{
    constructor(props){
        super(props);
        this.state = {isLogin:false}
    }

    componentWillMount(){
        let storage = getSessionStorage();
        if(storage){
            let token = storage.getItem('userToken');
            if (token){
                this.setState({isLogin:true});
            }
        }
    }

    render(){
        if(this.state.isLogin){
            return (
                <React.Fragment>
                    <Header />
                    <ParentViewTomaPedido />
                </React.Fragment>
            );
        }else{
            return <Redirect to="/waiter"/>;
        }
    }

}