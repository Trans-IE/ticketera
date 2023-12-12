const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUserByLogin } = require('../controllers/users');

const router = Router();


router.post(
    '/getUserByLogin',
    [
        check('username', 'El username es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('check_password', 'El check_password es obligatorio').not().isEmpty(),
        validarCampos
    ],

    getUserByLogin
);

module.exports = router;
