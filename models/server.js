
const express = require('express');
const cors = require('cors');
const { request } = require('express');
const { dbConnection } = require('../database/config');



class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

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
        
        this.app.use( this.authPath, require( '../routes/auth' ) );
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
