const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async ( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            msg: 'No hay TOKEN en la peticion'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        const usuario = await Usuario.findById( uid );

        if(!usuario){
            return res.status(401).json({
                msg: 'El usuario no existe en la BD'
            });
        }

        // Verificar si el uid tiene estado en true
        if( !usuario.estado ) {
            return res.status(401).json({
                msg: 'TOKEN no valido - usuario con estado false'
            }); 
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

    //console.log(token)
    

}



module.exports = {
    validarJWT,
}