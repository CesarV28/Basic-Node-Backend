const Role = require('../models/role'); 
const { Usuario, Categoria, Producto } = require('../models');


const esRoleValido = async ( rol = '' ) => {

    const existeRole = await Role.findOne( { rol } );

    if(!existeRole) {
        throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }
}

const existeEmail = async ( correo ) => {

    const existeEmail = await Usuario.findOne( { correo } );

    if( existeEmail ) {
        throw new Error( `El correo: ${correo} ya esta registrado`);
    }
}

const existeUsuarioId = async ( id ) => {

    const existeUsuario = await Usuario.findById( id );

    if( !existeUsuario ) {
        throw new Error( `El Usuario con el id: ${ id } no esta registrado`);
    }
}

const existeCategoriaPorId = async ( id ) => {

    const existeCategoriaId = await Categoria.findById( id );

    if( !existeCategoriaId ) {
        throw new Error( `La categoria con el id: ${ id } no esta registrada`);
    }
}

const categoriaExistente = async ( categoria = '' ) => {
    
    const existeCategoriaDB = await Categoria.findOne( { nombre: categoria.toUpperCase() } );

    if( !existeCategoriaDB && categoria ) {
        throw new Error( `La categoria NO existe.` );
    }

}

const existePrudctoPorId = async ( id ) => {

    const existeProducto = await Producto.findById( id );

    if( !existeProducto ) {
        throw new Error( `El producto con el id: ${ id } no esta registrado`);
    }
}

const productoExistente = async ( producto = '' ) => {

    const existeProductoDB = await Producto.findOne( { nombre: producto.toUpperCase() } );

    if( existeProductoDB ) {
        throw new Error( `El producto ya existe.` );
    }

}

const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {

    const incluida = colecciones.includes( coleccion );

    if( !incluida ) {
        throw new Error(`La coleccion ${ coleccion } no existe - ${ colecciones }`);
    }

    return true;

}


module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioId,
    existeCategoriaPorId,
    categoriaExistente,
    existePrudctoPorId,
    productoExistente,
    coleccionesPermitidas
}