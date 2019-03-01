import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from './Login';
import App from './App';
import MenuPrueba from './MenuPrueba';
import RegComida from './RegComida';
import RegOrden from './RegOrden';

const Root = () => {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Route exact path="/waiter" component={Login} />
                <Route exact path="/waiter/app" component={App} />
                <Route exact path="/waiter/app/menu" component={MenuPrueba} />
                <Route exact path="/waiter/app/regComida" component={RegComida}/>
                <Route exact path="/waiter/app/regOrder" component={RegOrden}/>
            </React.Fragment>
        </BrowserRouter>
    );
};

export default Root;