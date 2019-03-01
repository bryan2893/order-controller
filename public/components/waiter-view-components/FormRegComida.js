import React from 'react';
import axios from 'axios';

export default class FormRegistrarComida extends React.Component{
    constructor(props){
        super(props);
        this.state = {campoNombreComida:'',campoPrecioComida:''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnchangeComida = this.handleOnchangeComida.bind(this);
        this.handleOnChangePrecio = this.handleOnChangePrecio.bind(this);
    }

    handleOnchangeComida(event){
        this.setState({campoNombreComida:event.target.value});
    }

    handleOnChangePrecio(event){
        this.setState({
            campoPrecioComida: event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        if(confirm("Seguro que deseas guardar la comida ?")){
            let nombreComida = event.target.campoComida.value;
            let prec = parseInt(event.target.campoPrecio.value);

            let dataToSend = {nombre:nombreComida,precio:prec};

            //Enviar los datos al servidor para verificar si es un usuario válido...
            axios.post('/regComida',dataToSend).then((response)=>{
                console.log("Data devuelta por /regComida = "+JSON.stringify(response.data));
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
    }

    render(){
        return (
            <div className="contenedorFormularioRegistrarComida">
                <form action="" className="formRegistrarComida" onSubmit={this.handleSubmit}>
                    <h3>Registra una comida para el menu</h3>
                    <label className="labelFormRegistrarComida" htmlFor="comida">Nombre de la comida</label>
                    <input type="text" id="comida" name="campoComida" value={this.state.campoNombreComida} onChange={this.handleOnchangeComida}/>
                    <label className="labelFormRegistrarComida" htmlFor="precio">Precio de la comida</label>
                    <input type="number" id="precio" name="campoPrecio" value={this.state.campoPrecioComida} onChange={this.handleOnChangePrecio}/>
                    <input className="inputButtonSubmitFormRegistrarComida" type="submit" value="Registrar"/>
                </form>
            </div>
        );
    }
}