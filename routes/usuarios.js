
const { Router } = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRol, tieneRol } = require('../middlewares/validar-roles');

const { 
    validarCampos, 
    validarJWT, 
    tieneRol 
} = require('../middlewares');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch 
    } = require('../controllers/usuarios');

const { esRoleValido, existeEmail, existeUsuarioId } = require('../helpers/db-validators');




const router = Router();


router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mayo a 6 caracteres').isLength( {min: 6} ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( existeEmail ),
    //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    validarJWT,
    //esAdminRol,
    tieneRol('ADMIN_ROL', 'VENTAS_ROL'),
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    validarCampos
],usuariosDelete);

router.patch('/', usuariosPatch);






module.exports = router;
