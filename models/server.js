
const express = require('express');
const cors = require('cors');
const { request } = require('express');



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Migdlewares
        this.middlewares();

        // Rutas de la aplicacion
        this.routes();
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
        
        this.app.use( this.usuariosPath, require( '../routes/usuarios' ) );

    }
    // ================== listen ==================
    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        } );
    }
}


module.exports = Server;
