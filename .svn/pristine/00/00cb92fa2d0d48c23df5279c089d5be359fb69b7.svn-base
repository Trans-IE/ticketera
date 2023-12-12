const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {  loginUser, revalidarToken, } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     description: Este endpoint permite a un usuario iniciar sesión proporcionando un nombre de usuario y contraseña válidos. Roles válidos => TODOS.
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: El nombre de usuario del usuario.
 *               password:
 *                 type: string
 *                 description: La contraseña del usuario.
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: Información del usuario autenticado.
 *       500:
 *         description: Error en la autenticación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de autenticación fallida.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *     parameters: []
 *     security: []
 */
router.post(
    '/login',
    [
        check('username', 'El username debe ser ingresado').not().isEmpty(),
        check('password', 'El password debe ser ingresado').not().isEmpty(),


        validarCampos
    ],
    loginUser
);


/**
 * @openapi
 * /api/auth/renew:
 *   get:
 *     summary: Renueva el token de sesión del usuario
 *     description: Este endpoint permite a un usuario renovar su token de sesion a partir de su token de sesión a renovar válido. Roles válidos => TODOS.
 *     tags: [Autenticación]
 *     responses:
 *       200:
 *         description: Renovacion de token exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   description: Confirmación de proceso exitoso.
 *                 value:
 *                   type: object
 *                   description: Valor retornado.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *       500:
 *         description: Error interno
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de proceso fallido.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *     parameters: []
 *     security: 
 *      - x-token: []
 */
router.get('/renew', validarJWT, revalidarToken);

module.exports = router;