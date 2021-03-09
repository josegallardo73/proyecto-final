import { Routes } from './src/routes/Routes.js';
import { productos } from './src/controllers/Productos.js';
import { carrito } from './src/controllers/Carrito.js'
import express  from 'express';
const app = express();
const routerProductos = express.Router();
const routerCarrito = express.Router();
const PORT = process.env.PORT || 8080;

app.use(express.json());

//Rutas para productos

const rutasProductos = new Routes(app, routerProductos, productos);
rutasProductos.setRouter('/productos');

rutasProductos.get();
rutasProductos.getById();
rutasProductos.post();
rutasProductos.update();
rutasProductos.delete();

// Rutas para carrito

const rutasCarrito = new Routes(app, routerCarrito, carrito);
rutasCarrito.setRouter('/carrito');

rutasCarrito.get();
rutasCarrito.getById();
rutasCarrito.postById();
rutasCarrito.delete();
 

app.listen(PORT, () => {
    console.log(`Server in running on port ${PORT}`);
}).on('error', (err) => {
    console.log('Error: ', err);
});