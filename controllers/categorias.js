const { response } = require("express");
const { Categoria } = require('../models');


const obtenerCategorias = async ( req, res ) => {

    const { limit = 5, since = 0 } = req.query;

    const query = { estado: true };

    const [ total, categorias ] = await Promise.all( [
        Categoria.countDocuments( query ),
        Categoria.find( query )
         .populate( 'usuario', 'nombre')
         .skip( Number( since ) )
         .limit( Number( limit ) )
    ] );

    res.json( {
        total,
        categorias
    });
    
}


const obtenerCategoria = async ( req, res ) => {
    
    const { id } = req.params;

    const categoria = await Categoria.findById( id ).populate('usuario', 'nombre');

    res.json( categoria )

}


const crearCategoria = async ( req, res = response ) => {
    
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne( { nombre } );

    if( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre } ya existe`
        });
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    await categoria.save();
    
    res.status(201).json( categoria );
}



const actualizarCategoria = async ( req, res ) => {

    const { id } = req.params;

    const { usuario, estado, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true} );

    res.json( categoria );

}


const borrarCategoria = async ( req, res ) => {

    const { id } = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate( id, { estado: false}, { new: true } );

    res.json({
        categoriaBorrada
    })
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}