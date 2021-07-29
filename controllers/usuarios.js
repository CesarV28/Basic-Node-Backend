const { response, request } = require('express');
const bcryptjs = require('bcryptjs'); 


const Usuario = require('../models/usuario');
const { query } = require('express-validator');


const usuariosGet = async (req = request, res = response) => {

    const { limit = 5, since = 0 } = req.query;

    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all( [
        Usuario.countDocuments( query ),
        Usuario.find( query )
         .skip( Number( since ) )
         .limit( Number( limit ) )
    ] );

    res.json( {
        total,
        usuarios
    });
}

const usuariosPost = async (req, res) => {

    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario( { nombre, correo, password, rol } );

    // Encriptar password
    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en base de datos
    await usuario.save();

    res.json( {
        usuario
    })
}

const usuariosPut = async (req, res) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if ( password ) {
        // Encriptar password
        const salt = bcryptjs.genSaltSync();

        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario)
}

const usuariosDelete = async (req, res) => {

    const { id } = req.params;

    // Borrar fisicamente
    //const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json( usuario );
}

const usuariosPatch = (req, res) => {
    res.json( {
        msg: 'Patch API - Controlador'
    })
}




module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}