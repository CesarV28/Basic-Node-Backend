const { response } = require("express");
const { Producto } = require('../models');


const obtenerProductos = async ( req, res ) => {

    const { limit = 5, since = 0 } = req.query;

    const query = { estado: true };

    const [ total, productos ] = await Promise.all( [
        Producto.countDocuments( query ),
        Producto.find( query )
         .populate( 'usuario', 'nombre')
         .populate( 'categoria', 'nombre')
         .skip( Number( since ) )
         .limit( Number( limit ) )
    ] );

    res.json( {
        total,
        productos
    });
    
}


const obtenerProducto = async ( req, res ) => {
    
    const { id } = req.params;

    const producto = await Producto.findById( id )
                                   .populate('usuario', 'nombre')
                                   .populate('categoria', 'nombre')


    res.json( producto )

}


const crearProducto = async ( req, res = response ) => {
    
    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne( { nombre: body.nombre } );

    if( productoDB ) {
        return res.status(400).json({
            msg: `La categoria ${ productoDB.nombre } ya existe`
        });
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto( data );

    await producto.save();
    
    res.status(201).json( producto );
}



const actualizarProducto = async ( req, res ) => {

    const { id } = req.params;

    const { usuario, estado, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate( id, data, { new: true} );

    res.json( producto );

}


const borrarProducto = async ( req, res ) => {

    const { id } = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate( id, { estado: false}, { new: true } );

    res.json({
        productoBorrado
    })
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}









































// const { response, request } = require("express");
// const { existeCategoria } = require("../helpers/db-validators");
// const { Producto, Categoria } = require('../models');

// // obtenerProductos

// const obtenerProductos = async ( req = request, res = response ) => {

//     const { limit = 5, since = 0 } = req.query;

//     const query = { estado: true };

//     const [ total, productos ] = await Promise.all([
//         Producto.countDocuments( query ),
//         Producto.find( query )
//                 .populate( 'usuario', 'nombre' )
//                 .populate( 'categoria', 'nombre' )
//                 .skip( Number(since) )
//                 .limit( Number(limit) )
//     ])

//     res.json( {
//         total, 
//         productos
//     } );

// }

// // obtenerProducto

// const obtenerProducto = async ( req = request, res = response ) => {

//     const { id } = req.params;

//     const producto = await Producto.findById( id )
//                                     .populate('usuario', 'nombre')
//                                     .populate('categoria', 'nombre');

//     if ( !producto.estado ){
//         return res.status(401).json({
//             msg: '¡Ups!, el producto no existe'
//         })
//     }

//     res.json( producto )

// }

// // crearProducto

// const crearProducto = async ( req = request, res = response ) => {

//     const nombre = req.body.nombre.toUpperCase();

//     const nombreCategoria = req.body.categoria.toUpperCase();

//     const { precio, descripcion } = req.body;

//     const [ productoDB, categoriaDB ] = await Promise.all([
//         Producto.findOne( { nombre } ),
//         Categoria.findOne( { nombre: nombreCategoria } )
//     ]);


//     if( productoDB ) {
//         return res.status(400).json({
//             msg: `El producto ${ productoDB.nombre } ya existe.`
//         })
//     }

//     if( !categoriaDB ) {
//         return res.status(400).json({
//             msg: `La categoria ${ nombreCategoria } NO existe.`
//         })
//     }

//     data = {
//         nombre,
//         precio,
//         descripcion,
//         'usuario': req.usuario._id,
//         'categoria': categoriaDB._id
//     }


//     const producto = new Producto( data );

//     await producto.save();
    
//     res.status(201).json( producto );

// }

// // actualizarProducto

// const actualizarProducto = async ( req = request, res = response ) => {

//     const { id } = req.params; 

//     const { estado, _id, usuario, ...data } = req.body;                   

//     if( data.nombre ){
//         data.nombre = data.nombre.toUpperCase()
//     }

//     if( data.categoria ){
        
//         const categoria = await Categoria.findOne( { nombre: data.categoria.toUpperCase() } );

//         if( categoria ) {
//             data.categoria = categoria._id;
//         }
        
//     }

//     const producto = await Producto.findByIdAndUpdate( id, data, { new: true} );

//     res.json({
//         producto
//     });

// }

// // borrarProducto



// module.exports = {
//     crearProducto,
//     obtenerProductos,
//     obtenerProducto,
//     actualizarProducto
// }