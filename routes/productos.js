const { Router } = require('express');
const { check } = require('express-validator');

const { crearProducto, 
        obtenerProductos, 
        obtenerProducto,
        actualizarProducto,
        borrarProducto
      } = require('../controllers/productos');

const { existeCategoriaPorId, existePrudctoPorId } = require('../helpers/db-validators');

const { validarCampos, validarJWT, esAdminRol } = require('../middlewares');

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', 'No es un id valido de Mongo').isMongoId(),
    check('id').custom( existePrudctoPorId ),
    validarCampos,
], obtenerProducto);

router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id valido de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos,
] , crearProducto);

router.put('/:id', [ 
    validarJWT,
    //check('categoria', 'No es un id valido de Mongo').isMongoId(),
    check('id').custom( existePrudctoPorId ),
    validarCampos,
], actualizarProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id valido de Mongo').isMongoId(),
    check('id').custom( existePrudctoPorId ),
    validarCampos,
], borrarProducto);


module.exports = router;
















































// const { Router } = require('express');
// const { check } = require('express-validator');

// const { crearProducto, 
//         obtenerProductos, 
//         obtenerProducto,
//         actualizarProducto 
//     } = require('../controllers/productos');

// const { existePrudctoPorId, productoExistente, categoriaExistente } = require('../helpers/db-validators');

// const { validarJWT, validarCampos } = require('../middlewares');

// const router = Router();

// router.get('/', obtenerProductos);

// router.get('/:id', [
//     check('id', 'No es un id de valido de Mongo ').isMongoId(),
//     check('id').custom( existePrudctoPorId ),
//     validarCampos
// ],obtenerProducto);

// router.post('/', [
//     validarJWT,
//     check('nombre', 'El nombre es necesario').not().isEmpty(),
//     check('categoria', 'La categoria es necesaria').not().isEmpty(),
//     validarCampos
// ],crearProducto);

// router.put('/:id', [
//     validarJWT,
//     check('id', 'No es un id de valido de Mongo ').isMongoId(),
//     check('id').custom( existePrudctoPorId ),
//     check('nombre').custom( productoExistente ),
//     check('categoria').custom( categoriaExistente ),
//     validarCampos
// ],actualizarProducto);


// module.exports = router;