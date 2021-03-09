import { isAdmin } from '../helpers/helpers.js';
import { productos } from '../controllers/Productos.js';

export class Routes {

    constructor(app, router, instancia) {
        this.app = app;
        this.router = router;
        this.instancia = instancia;
        this.root = '/';
    }

    setRouter = (ruta) => this.app.use(ruta, this.router);

    get = () =>  {   
            this.router.get(this.root, (req, res) => {
                try {
                    const response = this.instancia.getAll();
                    if(response) res.json(response);
                    else throw new Error({error: 'Se ha producido un error'})
                }catch(err) {
                    res.json(err);
                }  
             });     
        }

    post = () => {
        this.router.post(this.root, isAdmin, async (req, res) => {
            
            try {
                let response = await req.body;
                if(response) {
                    response = this.instancia.set(response);
                    res.json(response);
                } else throw new Error({error: 'Se ha producido un error:'});
             
            }catch(err) {
                res.json(err)
            } 
        });
    }

    postById = () => {
        this.router.post(`${this.root}:id`, async (req, res) => {
            try{
                const id = await req.params.id;
                const producto = productos.getById(id);
                const response = this.instancia.set(producto);
                res.json(response);
            }catch(err) {
                res.json(err);
            }
        })
    }

    getById = () => {
        this.router.get(`${this.root}:id`, async (req, res) => {
            try {
                
                const id = await req.query.id;
                
                if(id) {
                    const response = this.instancia.getById(id);
                    res.json(response);
                } else throw new Error({error: 'Se ha producido un error'});
                
            }catch(err) {
                res.json(err)
            }  
         }); 
    }

    update = () => {
        this.router.put(`${this.root}:id`, isAdmin, async (req, res) => {
            try {
                const id = await req.params.id;
                if(id) {
                    const response = this.instancia.update(req.body, id);
                    res.json(response);
                } else throw new Error({error: 'Se ha producido un error'});
                
            }catch(err) {
                res.json(err)
            }
        });
    }

    delete = () => {
        this.router.delete(`${this.root}:id`, isAdmin, async (req, res) => {
            
            try {
                const id = await req.params.id;
                if(id) {
                    const response = this.instancia.delete(id);
                    res.json(response)
                } else throw new Error({error: 'Se ha producido un error'});
            }catch(err) {
                res.json(err);
            }
        })
    }
}
