import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = function(state){
    return {stadistics:state.stadistics};
}

const connectedList = function({stadistics}){
    return (
        <header className="cabecera">
            <div className="stadistics">
                <div>
                    <p>Contador: <span>{stadistics.counter}</span></p>
                    <p>Pendientes: <span>{stadistics.pendings}</span></p>
                </div>
                <div>
                    <p>Listos: <span>{stadistics.ready}</span></p>
                    <p>Vendidos: <span>{stadistics.soldOrders}</span></p>
                </div>
            </div>

            <button className="btnActualizar">Actualizar</button>
        </header>
    );
};

const Header = connect(mapStateToProps)(connectedList);

export default Header;