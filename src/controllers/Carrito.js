import { v4 as uuidv4 } from 'uuid';
import { save } from '../models/Save.js';

class Carrito {

    constructor() {
        this.productos = [];
        this.id = this.setId()
        this.timestamp = Date.now();
    }

    getAll = () => (save.getItems('src/data/carrito.json'))
        ? save.getItems('src/data/carrito.json')
        : { info: 'No existen productos en el carrito' };

    setId = () =>  uuidv4() || {error: 'error al asignarle un id'}

    checkById = (id) => save.getItems('src/data/carrito.json').some(producto => (producto.id === id)
                        ? true : false);

    getById = (id) => {

        let response = null;
        if(this.getAll().length > 0) {
            response = this.checkById(id);
            if(response) response = save.getItems('src/data/carrito.json').find(producto => producto.id === id)
            else response = { error: 'No existe un producto con ese id' };
        }else response = { error: 'No existen productos actualmente' };
        return response;
    }

    set = (producto) => {
        let response = null;
        if(producto && typeof producto === 'object') {
            save.writeItem(producto, 'src/data/carrito.json')
            response = {success: 'Se ha agregado el producto correctamente'}
        }else response =  { error: 'No existe información para crear un producto' };
        return response;
    }

    delete = (id) => {

        let response = null;
        response = this.checkById(id);
        if(response) {
            response = save.getItems('src/data/carrito.json').filter(producto => producto.id !== id);
            const isDelete = save.deleteItem(response, 'src/data/carrito.json');
            if(isDelete) response = { success: 'Se ha eliminado el producto correctamente' };
        } else response = {error: 'No existe un producto con ese id'};
        return response;
    }
}

export const carrito = new Carrito();