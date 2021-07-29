const Role = require('../models/role'); 
const Usuario = require('../models/usuario');


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

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioId,
}