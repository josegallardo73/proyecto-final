import { admin } from '../auth.js';

export const isAdmin = (req, res, next) => {
    if(req.originalUrl === '/carrito/') next;
    else if(req.originalUrl === '/productos/' || req.originalUrl === '/productos/'+req.params.id) {
        admin ? next() : res.json({error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada` });
    }  
};