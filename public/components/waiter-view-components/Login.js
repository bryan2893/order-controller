import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {verifySessionStorage} from '../../services/index';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {usernameField:'',passwordField:'',storageApi:null,savedToken:false};
        this.handleOnchangeUsernameField = this.handleOnchangeUsernameField.bind(this);
        this.handleOnchangePasswordField = this.handleOnchangePasswordField.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    componentDidMount(){
        let storage = verifySessionStorage();
        if(storage){
            console.log("El storage funciona!");
            this.setState({storageApi:storage});
            //storage.setItem("token",response.data.token);
        }
    }

    handleOnchangeUsernameField(event){
        let value = event.target.value;
        this.setState({usernameField:value});
    }

    handleOnchangePasswordField(event){
        let value = event.target.value;
        this.setState({passwordField:value});
    }

    handleOnSubmit(event){
        event.preventDefault();
        let username = event.target.username.value;
        let password = event.target.password.value;

        let credenciales = {username:username,password:password};

        //Enviar los datos al servidor para verificar si es un usuario válido...
        axios.post('/login',credenciales).then((response)=>{
            let respuesta = response.data;
            console.log("Data devuelta por /login = "+JSON.stringify(respuesta));
            //guardar el token en el session storage.
            this.state.storageApi.setItem('userToken',respuesta.token);
            this.setState({savedToken:true});
        },error => {
        if (error.response) {
            console.log("error.response"+error.response);

            this.setState({err:error.response.message});

            console.log(error.response.data);
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            } else if (error.request) {
                console.log("error.request: "+error.request);
                this.setState({err:'error inesperado :-( !'});
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                this.setState({err:error.message});
            }
        });
    }

    render(){
        if (this.state.storageApi !== null){//si existe API storage.
            if(this.state.savedToken){//Si se guarda el token correctamente!
                return (<Redirect to="/waiter/app"/>);
            }else{
                return (
                    <form onSubmit={this.handleOnSubmit}>
                        <label htmlFor="username">Username</label><br/>
                        <input name="username" type="text" value = {this.state.usernameField} onChange={this.handleOnchangeUsernameField}/><br/>
                        <label htmlFor="password">Password</label><br/>
                        <input name="password" type="text" value = {this.state.passwordField} onChange={this.handleOnchangePasswordField}/><br/>
                        <input type="submit" value="Login"></input>
                    </form>   
                );
            }
        }else{
            return (
                <h1>El navegador no cuenta con Storage para guardar sesion de usuario!</h1>
            );
        }
    }
}