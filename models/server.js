
const express = require('express');
const cors = require('cors');
const { request } = require('express');
const { dbConnection } = require('../database/config');



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
        }

        // Conectar a base de datos
        this.conectarDB();

        // Migdlewares
        this.middlewares();

        // Rutas de la aplicacion
        this.routes();
    }

    // ================== Data Base ==================
    async conectarDB() {
        await dbConnection();
    }

    // ================== middlewares ==================
    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static( 'public') );

    }
    // ================== routes ==================
    routes() {
        
        this.app.use( this.path.auth, require( '../routes/auth' ) );
        this.app.use( this.path.buscar, require( '../routes/buscar' ) );
        this.app.use( this.path.categorias, require( '../routes/categorias' ) );
        this.app.use( this.path.productos, require( '../routes/productos' ) );
        this.app.use( this.path.usuarios, require( '../routes/usuarios' ) );
        
    }
    // ================== listen ==================
    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        } );
    }
}


module.exports = Server;
