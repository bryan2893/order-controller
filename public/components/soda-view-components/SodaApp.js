import React from 'react';
import store from '../redux/store/index';
import {Provider} from 'react-redux';
import OrdersList from './OrdersList';
import axios from 'axios';
import Header from './Header';

import {setOrdersList,setCounter,setPendings,setReady,setSoldOrders} from '../redux/actions/index';

export default class SodaApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {hayError:false};
    }

    componentDidMount(){
        axios.get('/globalStateSodaApp').then((response)=>{
            let orders = response.data.orders;
            let stadistics = response.data.stadistics;
            store.dispatch(setOrdersList(orders));
            store.dispatch(setCounter(stadistics.orderNumber));
            store.dispatch(setReady(stadistics.ready));
            store.dispatch(setPendings(stadistics.pendings));
            store.dispatch(setSoldOrders(stadistics.soldOrders));
        },error => {
        if (error.response) {
            console.log("error.response"+error.response);

            this.setState({hayError:true});

            console.log(error.response.data);
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            } else if (error.request) {
                console.log("error.request: "+error.request);
                this.setState({hayError:true});
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                this.setState({hayError:true});
            }
        });
    }

    render(){
        if(!this.state.hayError){
            return(
                <Provider store = {store}>
                    <React.Fragment>
                        <Header />
                        <OrdersList />
                    </React.Fragment>
                </Provider>
            ); 
        }else{
            return <h1>Ocurrio un error mientras se extraían las ordenes y estadísticas!</h1>
        }  
    }
}