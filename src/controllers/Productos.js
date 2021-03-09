import { save } from '../models/Save.js';
import { v4 as uuidv4 } from 'uuid';

class Productos {

    getAll = () => (save.getItems('src/data/productos.json')) 
                        ? save.getItems('src/data/productos.json')
                        : { info: 'No existen productos actualmente' };
        

    checkById = (id) => save.getItems('src/data/productos.json').some(producto => (producto.id === id)
                        ? true : false);

    getById = (id) => {
        let response = null;
        if(this.getAll().length > 0) {
            response = this.checkById(id);
            if(response) response = save.getItems('src/data/productos.json').find(producto => producto.id === id)
            else response = {error: 'No existe un producto con ese id'};
        }else response = {info: 'No existen productos actualmente'};
        return response;
    }

    setId = (producto) =>  {
        (producto) ? producto.id = uuidv4() || {error: 'error al asignarle un id'} : { error: 'No existe un producto al que asignarle un id'};
        return producto;
    }

    set = (producto) => {
        console.log(producto)
        let response = null;
        if(producto && typeof producto === 'object') {
            response = this.setId(producto);
            if(response.id) {
                producto.timestamp = Date.now();
                console.log(producto)
                save.writeItem(producto, 'src/data/productos.json');
                response = {success: 'Se ha creado el producto correctamente'};
            }
        }else response =  { error: 'No existe información para crear un producto' };
        return response;
    }

    update = (producto, id) => {
        
        let response = null;
        if(this.getAll().length > 0) {
            response = this.checkById(id)
            if(response) {
                const isUpdated = save.updateItem(producto, id , 'src/data/productos.json');
                if(isUpdated) response = {success: 'Se ha actualizado el producto correctamente'}
                else response = {error: 'No se ha podido actualizar el producto'}
            } else response = {error: 'No existe un producto con ese id'};
        } else response = {info: 'No existen productos actualmente'}
        return response;
    }

    delete = (id) => {
        
        let response = null;
        response = this.checkById(id);
        if(response) {
            response = save.getItems('src/data/productos.json').filter(producto => producto.id !== id);
            const isDelete = save.deleteItem(response, 'src/data/productos.json');
            if(isDelete) response = { success: 'Se ha eliminado el producto correctamente' };
        } else response = {error: 'No existe un producto con ese id'};
        return response;
    }
}

export const productos = new Productos();