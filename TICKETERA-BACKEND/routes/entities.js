const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { createCompany, updateCompany, deleteCompany } = require('../controllers/companies');
const { createUser } = require('../controllers/users');

const router = Router();
//nombre, direccion, telefono, mail, codigoMD5Company
router.post(
    '/createCompany',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('mail', 'El mail es obligatorio').not().isEmpty(),


        check('mail', 'El mail debe tener el formato correcto').not().isEmail(),
        
        validarCampos
    ],

    createCompany
);

router.put(
    '/updateCompany/:id',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),

        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('mail', 'El mail es obligatorio').not().isEmpty(),
        check('codigo', 'El codigo es obligatorio').not().isEmpty(),



        check('mail', 'El mail debe tener el formato correcto').not().isEmail(),

        validarCampos
    ],

    updateCompany
);

router.delete(
    '/deleteCompany/:id',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),
        validarCampos
    ],

    deleteCompany
);
// usuario, password, apellido, nombre, telefono, mail, codigo 

router.post(
    '/createUser',
    [
        check('usuario', 'El usuario es obligatorio').not().isEmpty(),
        check('password', 'La password es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('mail', 'El mail es obligatorio').not().isEmpty(),

        check('mail', 'El mail debe tener el formato correcto').not().isEmail(),

        check('usuario', 'El usuario debe tener al menos 8 caracteres').isLength({ min: 8 }),
        
        validarCampos
    ],

    createUser
);

module.exports = router;