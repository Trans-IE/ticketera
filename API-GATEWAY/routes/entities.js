const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { createCompany, updateCompany, deleteCompany, getAllCompanies } = require('../controllers/companies');
const { createProduct, deleteProduct, updateProduct, getProduct, getAllProducts, getProductsByBrand } = require('../controllers/products');
const { createContract, deleteContract, updateContract, getAllContracts, getContractsByCompany } = require('../controllers/contracts');
const { createBrand, deleteBrand, updateBrand, getAllBrands } = require('../controllers/brands');
const { getUserRol } = require('../helpers/validators');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/**
 * @openapi
 * /api/entities/createCompany:
 *   post:
 *     summary: Alta de nueva empresa en el sistema
 *     description: Este endpoint permite a un usuario  con credenciales validas dar de alta una nueva empresa cliente al sistema. . Roles válidos => LocalSM.
 *     tags: [Companys]
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
        check('direccion', 'La debe ser mayor a 3 caracteres'),
        check('telefono', 'El teléfono debe ser mayor a 3 caracteres'),
        check('mail', 'El mail es obligatorio').not().isEmpty(),

        validarCampos,
        validarJWT
    ],
    createCompany
);

/**
 * @openapi
 * /api/entities/updateCompany/{id}:
 *   put:
 *     summary: Actualización de una empresa en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas actualizar una empresa cliente existente en el sistema. Roles válidos => LocalSM.
 *     tags: [Companys]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la empresa que se va a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: El nombre actualizado de la empresa.
 *                 example: nuevaPrueba1
 *               direccion:
 *                 type: string
 *                 description: La dirección actualizada de la empresa.
 *                 example: nuevaPrueba1
 *               telefono:
 *                 type: string
 *                 description: El teléfono actualizado de la empresa.
 *                 example: nuevaPrueba1
 *               mail:
 *                 type: string
 *                 description: El correo electrónico actualizado de la empresa.
 *                 example: test@test.com.ar
 *               habilitado:
 *                 type: string
 *                 description: El correo electrónico actualizado de la empresa.
 *                 example: "true"
 *     responses:
 *       201:
 *         description: Empresa actualizada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 company:
 *                   type: object
 *                   description: Información de la empresa actualizada y código único generado.
 *       200:
 *         description: Actualización no permitida (200) debido a validaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de actualización fallida.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional devuelta.
 *       501:
 *         description: Actualización no permitida (501) debido a un error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de actualización fallida.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional devuelta.
 *     security:
 *      - x-token: []
 */
router.put(
    '/updateCompany/:id',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('mail', 'El mail es obligatorio').not().isEmpty(),
        check('habilitado', 'El campo habilitado es obligatorio').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    updateCompany
);

/**
 * @openapi
 * /api/entities/deleteCompany/{id}:
 *   delete:
 *     summary: Elimina una empresa en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas eliminar una empresa cliente del sistema. Roles válidos => LocalSM.
 *     tags: [Companys]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: int
 *         description: ID de la empresa que se va a eliminar.
 *     responses:
 *       201:
 *         description: Empresa eliminada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 company:
 *                   type: object
 *                   description: Información de la empresa eliminada y código único generado.
 *       200:
 *         description: Eliminación no permitida (200) debido a validaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de eliminación fallida.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional devuelta.
 *       501:
 *         description: Eliminación no permitida (501) debido a un error en el servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de eliminación fallida.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional devuelta.
 *     security:
 *      - x-token: []
 */
router.delete(
    '/deleteCompany',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),
        check('id', 'el id debe ser numerico').isNumeric(),

        validarCampos,
        validarJWT
    ],

    deleteCompany
);

/**
 * @openapi
 * /api/entities/getAllCompanies:
 *   post:
 *     summary: Obtener listado de todas las compañías
 *     description: Este endpoint permite obtener el listado de todas las compañías. Se requieren credenciales de usuario autenticado.
 *     tags: [Companys]
 *     security:
 *      - x-token: []
 *     responses:
 *       200:
 *         description: Listado de todas las compañias obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   description: Detalles de todos los productos.
 *       401:
 *         description: No autorizado (401) por falta de credenciales.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de falta de autorización.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 */
router.post(
    '/getAllCompanies',
    [
        validarJWT
    ],
    getAllCompanies
);

router.post(
    '/getUserRol',
    [
        check('label', 'El label es obligatorio').not().isEmpty(),
        validarCampos,
        validarJWT
    ],

    getUserRol
);

/**
 * @openapi
 * /api/entities/getAllProducts:
 *   post:
 *     summary: Obtener información de todos los productos
 *     description: Este endpoint permite obtener información detallada de todos los productos. Se requieren credenciales de usuario autenticado.
 *     tags: [Products]
 *     security:
 *      - x-token: []
 *     responses:
 *       200:
 *         description: Información de todos los productos obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   description: Detalles de todos los productos.
 *       401:
 *         description: No autorizado (401) por falta de credenciales.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de falta de autorización.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 */

router.post(
    '/getAllProducts',
    [
        validarJWT
    ],
    getAllProducts
);

/**
 * @openapi
 * /api/entities/getProductsByBrand:
 *   post:
 *     summary: Obtener información de todos los productos por marca
 *     description: Este endpoint permite obtener información detallada de todos los productos por marca. Se requieren credenciales de usuario autenticado.
 *     tags: [Products]
 *     security:
 *      - x-token: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marca_id:
 *                 type: integer
 *                 description: Id de la marca de los productos a buscar.
 *             required:
 *               - marca_id
 *     responses:
 *       200:
 *         description: Información de todos los productos por marca obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   description: Detalles de todos los productos por marca.
 *       401:
 *         description: No autorizado (401) por falta de credenciales.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de falta de autorización.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 */
router.post(
    '/getProductsByBrand',
    [
        check('marca_id', 'Debe ingresar una marca').not().isEmpty(),

        validarJWT
    ],

    getProductsByBrand
);

/**
 * @openapi
 * /api/entities/getProduct:
 *   post:
 *     summary: Obtener información de un producto
 *     description: Este endpoint permite obtener información detallada de un producto mediante su ID. Se requiere un nombre válido y credenciales de usuario autenticado.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: El ID del producto.
 *                 example: 12345
 *     responses:
 *       200:
 *         description: Información del producto obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   description: Detalles del producto.
 *       400:
 *         description: Solicitud incorrecta (400) por validaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de solicitud incorrecta.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *       401:
 *         description: No autorizado (401) por falta de credenciales.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de falta de autorización.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *     parameters: []
 *     security:
 *      - x-token: []
 */
router.post(
    '/getProduct',
    [
        check('id', 'Debe ingresar un nombre').not().isEmpty(),

        validarCampos,
        validarJWT
    ],
    getProduct
);

/**
 * @openapi
 * /api/entities/createProduct:
 *   post:
 *     summary: Crear un nuevo producto
 *     description: Este endpoint permite a un usuario con credenciales válidas crear un nuevo producto en el sistema. Se requieren varios campos obligatorios para la creación del producto. Roles válidos => [Roles permitidos].
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: El nombre del producto.
 *                 example: Producto1
 *               modelo:
 *                 type: string
 *                 description: El modelo del producto.
 *                 example: Modelo1
 *               habilitado:
 *                 type: boolean
 *                 description: Indica si el producto está habilitado o no.
 *                 example: true
 *               marca_id:
 *                 type: string
 *                 description: El ID de la marca del producto.
 *                 example: 2
 *     responses:
 *       201:
 *         description: Producto creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   description: Información del producto creado y código único generado.
 *       400:
 *         description: Solicitud incorrecta (400) por validaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de solicitud incorrecta.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *       401:
 *         description: No autorizado (401) por falta de credenciales.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de falta de autorización.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *     parameters: []
 *     security:
 *      - x-token: []
 */
router.post(
    '/createProduct',
    [
        check('nombre', 'Debe ingresar un nombre').not().isEmpty(),
        check('modelo', 'Debe ingresar un modelo').not().isEmpty(),
        check('habilitado', 'Debe ingresar si está habilitado').not().isEmpty(),
        check('marca_id', 'Debe ingresar la marca').not().isEmpty(),

        validarCampos,
        validarJWT
    ],
    createProduct
);

/**
 * @openapi
 * /api/entities/deleteProduct:
 *   post:
 *     summary: Eliminar un producto
 *     description: Este endpoint permite a un usuario con credenciales válidas eliminar un producto del sistema mediante su ID. Se requiere proporcionar el ID del producto a eliminar. Roles válidos => [Roles permitidos].
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: El ID del producto a eliminar.
 *                 example: 12345
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que el producto ha sido eliminado con éxito.
 *       400:
 *         description: Solicitud incorrecta (400) por validaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de solicitud incorrecta.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *       401:
 *         description: No autorizado (401) por falta de credenciales.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de falta de autorización.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *     parameters: []
 *     security:
 *      - x-token: []
 */
router.post(
    '/deleteProduct',
    [
        check('id', 'El label es obligatorio').not().isEmpty(),
        validarCampos,
        validarJWT
    ],

    deleteProduct
);

/**
 * @openapi
 * /api/entities/updateProduct:
 *   post:
 *     summary: Actualizar información de un producto
 *     description: Este endpoint permite a un usuario con credenciales válidas actualizar la información de un producto en el sistema mediante su ID. Se requiere proporcionar el ID del producto y los campos a actualizar. Roles válidos => [Roles permitidos].
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: El ID del producto a actualizar.
 *                 example: 12345
 *               nombre:
 *                 type: string
 *                 description: El nuevo nombre del producto.
 *                 example: NuevoNombre
 *               modelo:
 *                 type: string
 *                 description: El nuevo modelo del producto.
 *                 example: NuevoModelo
 *               habilitado:
 *                 type: boolean
 *                 description: Estado de habilitación del producto.
 *                 example: true
 *               marca_id:
 *                 type: string
 *                 description: El nuevo ID de la marca asociada al producto.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que el producto ha sido actualizado con éxito.
 *       400:
 *         description: Solicitud incorrecta (400) por validaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de solicitud incorrecta.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *       401:
 *         description: No autorizado (401) por falta de credenciales.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de falta de autorización.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *     parameters: []
 *     security:
 *      - x-token: []
 */

router.post(
    '/updateProduct',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('modelo', 'El modelo es obligatorio').not().isEmpty(),
        check('habilitado', 'Habilitado es obligatorio').not().isEmpty(),
        check('marca_id', 'La marca id es obligatorio').not().isEmpty(),
        validarCampos,
        validarJWT
    ],

    updateProduct
);

/**
 * @openapi
 * /api/entities/getAllContracts:
 *   post:
 *     summary: Obtener todos los contratos
 *     description: Este endpoint permite a un usuario con credenciales válidas obtener la lista de todos los contratos en el sistema. Se requiere autenticación con un token válido.
 *     tags: [Contracts]
 *     responses:
 *       200:
 *         description: Lista de contratos obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contracts:
 *                   type: array
 *                   description: Lista de contratos.
 *                   items:
 *                     type: object
 *       401:
 *         description: No autorizado (401) por falta de credenciales.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de falta de autorización.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *     parameters: []
 *     security:
 *      - x-token: []
 */
router.post(
    '/getAllContracts',
    [
        validarJWT
    ],

    getAllContracts
);

/**
 * @openapi
 * /api/entities/getContractsByCompany:
 *   post:
 *     summary: Obtener todos los contratos por compañía
 *     description: Este endpoint permite a un usuario con credenciales válidas obtener la lista de todos los contratos en el sistema. Se requiere autenticación con un token válido.
 *     tags: [Contracts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empresa_id:
 *                 type: integer
 *             required:
 *               - empresa_id
 *     responses:
 *       200:
 *         description: Lista de contratos por compañía obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contracts:
 *                   type: array
 *                   description: Lista de contratos por compañía.
 *                   items:
 *                     type: object
 *       401:
 *         description: No autorizado (401) por falta de credenciales.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de falta de autorización.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *     security:
 *      - x-token: []
 */
router.post(
    '/getContractsByCompany',
    [
        check('empresa_id', 'El nombre de la compañía es obligatorio').not().isEmpty(),
        validarJWT
    ],

    getContractsByCompany
);

/**
 * @openapi
 * /api/entities/createContract:
 *   post:
 *     summary: Crear un nuevo contrato
 *     description: Este endpoint permite a un usuario con credenciales válidas crear un nuevo contrato en el sistema. Se requieren varios campos obligatorios para la creación del contrato. Roles válidos => [Roles permitidos].
 *     tags: [Contracts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: El nombre del contrato.
 *                 example: Contrato1
 *               empresa_id:
 *                 type: string
 *                 description: El ID de la empresa asociada al contrato.
 *                 example: 12345
 *               ejecutivo_id:
 *                 type: string
 *                 description: El ID del ejecutivo asociado al contrato.
 *                 example: 67890
 *               sla_horas_respuesta:
 *                 type: integer
 *                 description: El tiempo en horas para la respuesta del contrato.
 *                 example: 24
 *     responses:
 *       201:
 *         description: Contrato creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contract:
 *                   type: object
 *                   description: Información del contrato creado y código único generado.
 *       400:
 *         description: Solicitud incorrecta (400) por validaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de solicitud incorrecta.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *       401:
 *         description: No autorizado (401) por falta de credenciales.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de falta de autorización.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *     parameters: []
 *     security:
 *      - x-token: []
 */
router.post(
    '/createContract',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('empresa_id', 'El nombre es obligatorio').not().isEmpty(),
        check('ejecutivo_id', 'El nombre es obligatorio').not().isEmpty(),
        check('sla_horas_respuesta', 'El nombre es obligatorio').not().isEmpty(),
        check('sla_horas_provisorio', 'El nombre es obligatorio').not().isEmpty(),
        check('sla_horas_definitivo', 'El nombre es obligatorio').not().isEmpty(),
        check('tipo', 'El nombre es obligatorio').not().isEmpty(),
        check('horas_paquete', 'El nombre es obligatorio').not().isEmpty(),
        check('notas', 'El nombre es obligatorio').not().isEmpty(),
        check('habilitado', 'El nombre es obligatorio').not().isEmpty(),
        check('soporte_onsite', 'El nombre es obligatorio').not().isEmpty(),
        check('reemplazo_partes', 'El nombre es obligatorio').not().isEmpty(),
        check('fecha_inicio', 'El nombre es obligatorio').not().isEmpty(),
        check('fecha_fin', 'El nombre es obligatorio').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    createContract
);

/**
 * @openapi
 * /api/entities/updateContract:
 *   post:
 *     summary: Actualizar información de un contrato
 *     description: Este endpoint permite a un usuario con credenciales válidas actualizar la información de un contrato en el sistema mediante su ID. Se requiere proporcionar el ID del contrato y los campos a actualizar. Roles válidos => [Roles permitidos].
 *     tags: [Contracts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: El ID del contrato a actualizar.
 *                 example: 12345
 *               nombre:
 *                 type: string
 *                 description: El nuevo nombre del contrato.
 *                 example: Contrato Actualizado
 *               empresa_id:
 *                 type: string
 *                 description: El nuevo ID de la empresa asociada al contrato.
 *                 example: 67890
 *               ejecutivo_id:
 *                 type: string
 *                 description: El nuevo ID del ejecutivo asociado al contrato.
 *                 example: 54321
 *               sla_horas_respuesta:
 *                 type: integer
 *                 description: El nuevo tiempo en horas para la respuesta del contrato.
 *                 example: 48
 *     responses:
 *       200:
 *         description: Contrato actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que el contrato ha sido actualizado con éxito.
 *       400:
 *         description: Solicitud incorrecta (400) por validaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de solicitud incorrecta.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *       401:
 *         description: No autorizado (401) por falta de credenciales.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de falta de autorización.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *     parameters: []
 *     security:
 *      - x-token: []
 */
router.post(
    '/updateContract',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('empresa_id', 'El nombre es obligatorio').not().isEmpty(),
        check('ejecutivo_id', 'El nombre es obligatorio').not().isEmpty(),
        check('sla_horas_respuesta', 'El nombre es obligatorio').not().isEmpty(),
        check('sla_horas_provisorio', 'El nombre es obligatorio').not().isEmpty(),
        check('sla_horas_definitivo', 'El nombre es obligatorio').not().isEmpty(),
        check('tipo', 'El nombre es obligatorio').not().isEmpty(),
        check('horas_paquete', 'El nombre es obligatorio').not().isEmpty(),
        check('notas', 'El nombre es obligatorio').not().isEmpty(),
        check('habilitado', 'El nombre es obligatorio').not().isEmpty(),
        check('soporte_onsite', 'El nombre es obligatorio').not().isEmpty(),
        check('reemplazo_partes', 'El nombre es obligatorio').not().isEmpty(),
        check('fecha_inicio', 'El nombre es obligatorio').not().isEmpty(),
        check('fecha_fin', 'El nombre es obligatorio').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    updateContract
);

/**
 * @openapi
 * /api/entities/deleteContract:
 *   post:
 *     summary: Eliminar un contrato
 *     description: Este endpoint permite a un usuario con credenciales válidas eliminar un contrato del sistema mediante su ID. Se requiere proporcionar el ID del contrato a eliminar. Roles válidos => [Roles permitidos].
 *     tags: [Contracts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: El ID del contrato a eliminar.
 *                 example: 12345
 *     responses:
 *       200:
 *         description: Contrato eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que el contrato ha sido eliminado con éxito.
 *       400:
 *         description: Solicitud incorrecta (400) por validaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de solicitud incorrecta.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *       401:
 *         description: No autorizado (401) por falta de credenciales.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de falta de autorización.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *     parameters: []
 *     security:
 *      - x-token: []
 */
router.post(
    '/deleteContract',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    deleteContract
);

/**
 * @openapi
 * /api/entities/getAllBrands:
 *   post:
 *     summary: Obtener todas las marcas
 *     description: Este endpoint permite a un usuario con credenciales válidas obtener la lista de todas las marcas en el sistema. Se requiere autenticación con un token válido.
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Lista de marcas obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 brands:
 *                   type: array
 *                   description: Lista de marcas.
 *                   items:
 *                     type: object
 *       401:
 *         description: No autorizado (401) por falta de credenciales.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de falta de autorización.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *     parameters: []
 *     security:
 *      - x-token: []
 */
router.post(
    '/getAllBrands',
    [
        validarJWT
    ],

    getAllBrands
);

/**
 * @openapi
 * /api/entities/createBrand:
 *   post:
 *     summary: Crear una nueva marca
 *     description: Este endpoint permite a un usuario con credenciales válidas crear una nueva marca en el sistema. Se requiere proporcionar el nombre de la marca. Roles válidos => [Roles permitidos].
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: El nombre de la marca.
 *                 example: Marca1
 *     responses:
 *       201:
 *         description: Marca creada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 brand:
 *                   type: object
 *                   description: Información de la marca creada y código único generado.
 *       400:
 *         description: Solicitud incorrecta (400) por validaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de solicitud incorrecta.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *       401:
 *         description: No autorizado (401) por falta de credenciales.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de falta de autorización.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *     parameters: []
 *     security:
 *      - x-token: []
 */
router.post(
    '/createBrand',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    createBrand
);

/**
 * @openapi
 * /api/entities/updateBrand:
 *   post:
 *     summary: Actualizar información de una marca
 *     description: Este endpoint permite a un usuario con credenciales válidas actualizar la información de una marca en el sistema mediante su ID. Se requiere proporcionar el ID de la marca y el nuevo nombre. Roles válidos => [Roles permitidos].
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: El ID de la marca a actualizar.
 *                 example: 12345
 *               nombre:
 *                 type: string
 *                 description: El nuevo nombre de la marca.
 *                 example: NuevoNombre
 *     responses:
 *       200:
 *         description: Marca actualizada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que la marca ha sido actualizada con éxito.
 *       400:
 *         description: Solicitud incorrecta (400) por validaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de solicitud incorrecta.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *       401:
 *         description: No autorizado (401) por falta de credenciales.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de falta de autorización.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *     parameters: []
 *     security:
 *      - x-token: []
 */
router.post(
    '/updateBrand',
    [
        check('id', 'El nombre es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    updateBrand
);

/**
 * @openapi
 * /api/entities/deleteBrand:
 *   post:
 *     summary: Eliminar una marca
 *     description: Este endpoint permite a un usuario con credenciales válidas eliminar una marca del sistema mediante su ID. Se requiere proporcionar el ID de la marca a eliminar. Roles válidos => [Roles permitidos].
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: El ID de la marca a eliminar.
 *                 example: 12345
 *     responses:
 *       200:
 *         description: Marca eliminada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje indicando que la marca ha sido eliminada con éxito.
 *       400:
 *         description: Solicitud incorrecta (400) por validaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de solicitud incorrecta.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *       401:
 *         description: No autorizado (401) por falta de credenciales.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de falta de autorización.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *     parameters: []
 *     security:
 *      - x-token: []
 */
router.post(
    '/deleteBrand',
    [
        check('id', 'El nombre es obligatorio').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    deleteBrand
);

module.exports = router;
