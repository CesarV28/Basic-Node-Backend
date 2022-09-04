const path = require('path');
const fs = require('fs');

const { response, request } = require("express");
const { subirArchivo } = require("../helpers");

const { Usuario, Producto } = require('../models');


const cargarArchivo = async ( req, res = response) => {

    try {
        
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );

        res.json( { nombre } );

    } catch (msg) {
        res.status(400).json({ msg });
    }
    
}

const actualizarImagen = async( req, res ) => {

    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
        
            modelo = await Usuario.findById( id );

            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe el usuario con el id: ${id}`
                });
            }

            break;

        case 'productos':
        
            modelo = await Producto.findById( id );

            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe el producto con el id: ${id}`
                });
            }

            break;
    
        default:
            return res.status(500).json({ msg: 'No existe la validacion'});
    }

    // Limpiar imagenes previas
    if( modelo.img ) {
        // borrar imagen del servidor 
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );

        if( fs.existsSync( pathImagen ) ){
            fs.unlinkSync( pathImagen );
        }
    }

    const nombre = await subirArchivo( req.files, undefined, coleccion );

    modelo.img = nombre;

    await modelo.save();

    res.json(modelo);

}

const mostrarImagen = async ( req = request, res ) => {

    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
        
            modelo = await Usuario.findById( id );

            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe el usuario con el id: ${id}`
                });
            }

            break;

        case 'productos':
        
            modelo = await Producto.findById( id );

            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe el producto con el id: ${id}`
                });
            }

            break;
    
        default:
            return res.status(500).json({ msg: 'No existe la validacion'});
    }

    // Limpiar imagenes previas
    if( modelo.img ) {
        // borrar imagen del servidor 
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );

        if( fs.existsSync( pathImagen ) ){
            return res.sendFile( pathImagen );
        }
    }

    const pathImagen = path.join( __dirname, '../assets', 'no-image.jpg');
    return res.sendFile( pathImagen );

}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}