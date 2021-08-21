const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoria,
        actualizarCategoria,
        borrarCategoria
      } = require('../controllers/categorias');

const { existeCategoriaPorId } = require('../helpers/db-validators');

const { validarCampos, validarJWT, esAdminRol } = require('../middlewares');

const router = Router();

router.get('/', obtenerCategorias);

router.get('/:id', [
    check('id', 'No es un id valido de Mongo').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
],obtenerCategoria);

router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
] , crearCategoria);

router.put('/:id', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido de Mongo').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
],actualizarCategoria);

router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id valido de Mongo').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
],borrarCategoria);


module.exports = router;