import React from 'react';
import Header from './Header';
import Menu from './menu-components/Menu';
import {getSessionStorage} from '../../services/index';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {isLogin:false};
    }

    componentWillMount(){
        let storage = getSessionStorage();
        if(storage){
            let token = storage.getItem('userToken');
            if (token){
                axios.defaults.headers.common['Authorization'] = token;
                console.log("El token se guardó en el storage! "+token);
                this.setState({isLogin:true});
            }
        }
    }

    render(){
        if(this.state.isLogin){
            return (
                <React.Fragment>
                    <Header />
                    <Menu />
                </React.Fragment>
            );
        }else{
            //Redirigir al componente login.
            return <Redirect to="/waiter"/>
        }
    }
}