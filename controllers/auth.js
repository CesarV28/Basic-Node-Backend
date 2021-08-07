const { response } = require("express");
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


const login = async ( req, res = response ) => {

    const { correo, password } = req.body;

    try {

        // verifficar el email
        const usuario = await Usuario.findOne( { correo } );

        if( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        // Verificar que este en la base de datos
        if( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado:false'
            })
        }

        // Validar contraseña
        const validarPassword = bcryptjs.compareSync( password, usuario.password );

        if( !validarPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        // Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'ALgo salio mal, hable con el administrador'
        });
    }

}

const googleSingin = async (req, res = response) => {

    const { id_token } = req.body;
    
    try {

        const { nombre, img, correo } = await googleVerify( id_token );

        let usuario = await Usuario.findOne( { correo } );

        if( !usuario ) {
            // Crear el usuario
            const data = {
                nombre,
                correo,
                password: 'googlePassword',
                img,
                google: true
            };

            usuario = new Usuario( data );

            await usuario.save();
        }

        // Si el usuario de la bd
        if( !usuario.estado ) {
            return res.status( 401 ).json({
                msg: 'Hable con el administrador, usuario BLOQUEADO'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            msg: 'Todo ok, google in',
            usuario,
            token
        });

    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no reconocido'
        });
    }

    

}


module.exports = {
    login,
    googleSingin
}