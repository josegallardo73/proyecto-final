import  * as fs  from 'fs';

class Save {

    readFile = (ruta) => fs.readFileSync(ruta);
    writeFile = (content, ruta) => fs.writeFileSync(ruta, JSON.stringify(content, null, 2));

    writeItem = (item, ruta) => {

            const data = this.readFile(ruta);
            let content = JSON.parse(data);
            content.push(item);
            
            this.writeFile(content, ruta);
    }

    getItems = (ruta) => {
        const data = this.readFile(ruta);
        let content = JSON.parse(data);
        if(content.length > 0) return content;
        return false;
    }

    updateItem = (item, id, ruta) => {
        console.log(item, id)
        let response = null;
        const data = this.readFile(ruta);
        let content = JSON.parse(data);
        console.log(content)
        content.forEach(itemBD => {
            if(id === itemBD.id) {
                itemBD.timestamp = Date.now();
                itemBD.nombre = item.nombre;
                itemBD.descripcion = item.descripcion;
                itemBD.codigo = item.codigo;
                itemBD.urlFoto = item.foto;
                itemBD.precio = item.precio;
                itemBD.stock = item.stock;

                this.writeFile(content, ruta);
                response = true;
            }
        })
        return response;
    }

    deleteItem = (content, ruta) => {
        
        let response = null;
        this.writeFile(content, ruta);
        response = true;

        return response;
    }
}

export const save = new Save();