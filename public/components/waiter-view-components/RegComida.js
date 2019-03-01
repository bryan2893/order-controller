import React from 'react';
import Header from './Header';
import FormRegComida from './FormRegComida';
import {getSessionStorage} from '../../services/index';
import {Redirect} from 'react-router-dom';

export default class RegComida extends React.Component{
    constructor(props){
        super(props);
        this.state = {isLogin:false};
    }

    componentWillMount(){
        let storage = getSessionStorage();
        if(storage){
            let token = storage.getItem('userToken');
            if(token){
                this.setState({isLogin:true});
            }
        }
    }

    render(){
        if(this.state.isLogin){
            return (
                <React.Fragment>
                    <Header />
                    <FormRegComida />
                </React.Fragment>
            );
        }else{
            return <Redirect to="/waiter"/>
        }
    }
}