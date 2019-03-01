import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

const Header = function(props){
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Comidas rápidas jireh</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Menu
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to='/waiter/app/regComida'>Agregar comida</Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to='/waiter/app/menu'>Editar comida</Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to='/waiter/app/menu'>Eliminar comida</Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to='/waiter/app/menu'>Ver menu</Link>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <a name="clientesLink" className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Ordenes
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link id="registrarClienteLink" className="dropdown-item" to='/waiter/app/regOrder'>Crear Orden</Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to=''>Ordenes listas</Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to=''>Ordenes pendientes</Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to=''>Ordenes vendidas</Link>
                    </div>
                </li>
                </ul>
            </div>
        </nav>
        </header>
        );
};

export default Header;