import React from 'react';

//Prueba redux...
import { connect } from "react-redux";
import { addArticle } from './redux/actions/index';

const mapDispatchToProps = function(dispatch){
    return {addArticle: article => dispatch(addArticle(article))};
};

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {usernameField:'',passwordField:''};
        this.handleOnchangeUsernameField = this.handleOnchangeUsernameField.bind(this);
        this.handleOnchangePasswordField = this.handleOnchangePasswordField.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
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

        this.props.addArticle({ title:username, id:password });
        this.setState({usernameField:'',passwordField:''});
        //Enviar los datos al servidor para verificar si es un usuario válido...
    }

    render(){
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
}

const Form = connect(null,mapDispatchToProps)(LoginForm);

export default Form;