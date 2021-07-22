const { response, request } = require('express');



const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', page = 1, limit = 10, apikey} = req.query;

    res.json( {
        msg: 'Get API - Controlador',
        q,
        nombre,
        page,
        limit,
        apikey
    })
}

const usuariosPost = (req, res) => {
    
    const { nombre, edad } = req.body;

    res.json( {
        msg: 'Post API - Controlador',
        nombre,
        edad
    })
}

const usuariosPut = (req, res) => {

    const { id } = req.params;

    res.json( {
        msg: 'Put API - Controlador',
        id
    })
}

const usuariosDelete = (req, res) => {
    res.json( {
        msg: 'Delete API - Controlador'
    })
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