import React from 'react';
import Header from './Header';
import FoodList from './menu-components/FoodList';

const MenuPrueba = (props) => {
    return (
        <React.Fragment>
            <Header/>
            <FoodList listaComidas={[{nombre:"hamburguer",precio:2000}]}/>
        </React.Fragment>
    );
};

export default MenuPrueba;