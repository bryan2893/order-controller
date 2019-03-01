export default class ManejadorPedidos{
    constructor(menu){
        this.menu = menu;
    }

    resetAll(){
        for (let index = 0; index < this.menu.length; index++) {
            const comida = this.menu[index];
            comida.cantidad = 0;
        }

        return this.menu;
    }

    buscarComidaEnMenu(clave){
        for (let index = 0; index < this.menu.length; index++) {
            const comida = this.menu[index];
            if(comida.clave === clave){
                return index;
            }
        }
        return null;
    }

    agregarComidaAPedido(comida){
        //let indexComida = this.buscarComidaEnPedido(comida.clave);
        let indexComidaMenu = this.buscarComidaEnMenu(comida.clave);

        if(indexComidaMenu !== null){//Si la comida ha sido ordenada ya entonces...
            //this.pedido[indexComida].cantidad += 1;
            this.menu[indexComidaMenu].cantidad += 1;
        }

        return this.menu;
    }

    restarComidaPedido(comida){
        //let indexComida = this.buscarComidaEnPedido(comida.clave);
        let indexComidaMenu = this.buscarComidaEnMenu(comida.clave);

        if(indexComidaMenu !== null){//Si la comida ha sido ordenada ya entonces...
            let cantidadComidasDeEsteTipo = this.menu[indexComidaMenu].cantidad;
            if(cantidadComidasDeEsteTipo > 1){
                //this.pedido[indexComida].cantidad -= 1;
                this.menu[indexComidaMenu].cantidad -= 1;
            }else{
                this.menu[indexComidaMenu].cantidad = 0;
            }
        }

        return this.menu;
    }

    getMontoTotal(){
        let montoTotal = 0;
        for (let index = 0; index < this.menu.length; index++) {
            const linea = this.menu[index];
            if(linea.cantidad !== 0){
                montoTotal += linea.cantidad * linea.precio;
            }
        }
        
        return montoTotal;
    }

    getPedido(){
        let pedido = [];
        for (let index = 0; index < this.menu.length; index++) {
            const linea = this.menu[index];
            if(linea.cantidad !== 0){
                pedido.push(linea);
            }
        }
        return pedido;
    }

    getMenu(){
        return this.menu;
    }

    isEmpty(){
        for (let index = 0; index < this.menu.length; index++) {
            const linea = this.menu[index];
            if(linea.cantidad !== 0){
                return false;
            }
        }
        return true;
    }
}