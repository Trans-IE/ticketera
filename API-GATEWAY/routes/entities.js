const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {  loginUser, revalidarToken, createCompany, updateCompany, deleteCompany } = require('../controllers/companies');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/**
 * @openapi
 * /api/entities/createCompany:
 *   post:
 *     summary: Alta de nueva empresa en el sistema
 *     description: Este endpoint permite a un usuario  con credenciales validas dar de alta una nueva empresa cliente al sistema. . Roles válidos => ADMINISTRADOR.
 *     tags: [Alta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: El nombre de la empresa.
 *                 example: prueba1
 *               direccion:
 *                 type: string
 *                 description: La direccion de la empresa.
 *                 example: prueba1
 *               telefono:
 *                 type: string
 *                 description: El telefono de la empresa.
 *                 example: prueba1
 *               mail:
 *                 type: string
 *                 description: el e-mail de la empresa.
 *                 example: prueba1
 *     responses:
 *       201:
 *         description: Empresa creada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 company:
 *                   type: object
 *                   description: Información de la empresa creada y codigo unico generado.
 *       200:
 *         description: Inserción no permitida (200) por validaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de inserción fallida.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *       501:
 *         description: Inserción no permitida (501) por error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de inserción fallida.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *     parameters: []
 *     security:
 *      - x-token: []
 */
router.post(
    '/createCompany',
    [
        check('nombre', 'El nombre debe ser mayor a 3 caracteres'),
        check('direccion', 'El password debe ser mayor a 3 caracteres'),
        check('telefono', 'El password debe ser mayor a 3 caracteres'),
        check('mail', 'El password debe ser mayor a 3 caracteres'),

        check('mail', 'El mail debe tener el formato correcto').not().isEmail(),

        validarCampos,
        validarJWT
    ],
    createCompany
);
 // id, nombre, direccion, telefono, mail, habilitado
 router.put(
    '/updateCompany/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('mail', 'El mail es obligatorio').not().isEmpty(),
        check('habilitado', 'El campo habilitado es obligatorio').not().isEmpty(),

        check('mail', 'El mail debe tener el formato correcto').not().isEmail(),

        validarCampos,
        validarJWT
    ],
    updateCompany
);

router.delete(
    '/deleteCompany/:id',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),

        check('id', 'el ID debe ser numerico').not().isNumeric(),

        validarCampos,
        validarJWT
    ],
    deleteCompany
);


module.exports = router;
