const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { createCompany, updateCompany, deleteCompany, getAllCompanies } = require('../controllers/companies');
const { createProduct, deleteProduct, updateProduct, getProduct, getAllProducts, getProductsByBrand } = require('../controllers/products');
const { createContract, deleteContract, updateContract, getAllContracts, getContractsByCompany } = require('../controllers/contracts');
const { createBrand, deleteBrand, updateBrand, getAllBrands } = require('../controllers/brands');
const { getAllPrioritys } = require('../controllers/prioritys');
const { getAllStates } = require('../controllers/states');
const { getAllResponsibles } = require('../controllers/responsibles');
const { getUserRol } = require('../helpers/validators');
const { validarJWT } = require('../middlewares/validar-jwt');
const { setState, setPriority, setResponsible, setAutoEvaluation, setHours, setNote } = require('../controllers/ticket_actions');

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

        validarCampos,
        validarJWT
    ],

    deleteCompany
);

/**
 * @openapi
 * /api/entities/getAllCompanies:
 *   post:
 *     summary: Obtener listado de todas las compañías en el sistema
 *     description: Este endpoint permite obtener el listado de todas las empresas en el sistema. Se requieren credenciales de usuario autenticado.
 *     tags: [Companys]
 *     responses:
 *       200:
 *         description: Listado de todas las compañías obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 companies:
 *                   type: array
 *                   description: Detalles de todas las compañías.
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
 *     summary: Obtener información de todos los productos en el sistema
 *     description: Este endpoint permite obtener información detallada de todos los productos en el sistema. Se requieren credenciales de usuario autenticado.
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
 *     summary: Obtener información de todos los productos por marca en el sistema
 *     description: Este endpoint permite obtener información detallada de todos los productos por marca en el sistema. Se requieren credenciales de usuario autenticado.
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
 *     summary: Obtener información de un producto en el sistema
 *     description: Este endpoint permite obtener información detallada de un producto mediante su ID en el sistema. Se requiere un nombre válido y credenciales de usuario autenticado.
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
 *     summary: Crear un nuevo producto en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas crear un nuevo producto en el sistema. Se requieren varios campos obligatorios para la creación del producto. Roles válidos => LocalSM.
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
 * /api/entities/deleteProduct/{id}:
 *   delete:
 *     summary: Eliminación de un producto en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas eliminar un producto existente en el sistema. Roles válidos => LocalSM.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto que se va a eliminar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 brand:
 *                   type: object
 *                   description: Información de la marca actualizada y código único generado.
 *       201:
 *         description: Actualización no permitida (201) debido a validaciones.
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
router.delete(
    '/deleteProduct/:id',
    [
        check('id', 'El label es obligatorio').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    deleteProduct
);

/**
 * @openapi
 * /api/entities/updateProduct/{id}:
 *   put:
 *     summary: Actualización de un producto en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas actualizar un producto existente en el sistema. Roles válidos => LocalSM.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto que se va a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: El nombre actualizado del producto.
 *                 example: nuevoProducto1
 *               modelo:
 *                 type: string
 *                 description: El modelo actualizado del producto.
 *                 example: modeloNuevo
 *               habilitado:
 *                 type: boolean
 *                 description: Indica si el producto está habilitado o no.
 *                 example: true
 *               marca_id:
 *                 type: integer
 *                 description: ID de la marca asociada al producto.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   description: Información del producto actualizado y código único generado.
 *       201:
 *         description: Actualización no permitida (201) debido a validaciones.
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
    '/updateProduct/:id',
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
 *     summary: Obtener todos los contratos en el sistema
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
 *     summary: Obtener todos los contratos por compañía en el sistema
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
 *     summary: Crear un nuevo contrato en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas crear un nuevo contrato en el sistema. Se requieren varios campos obligatorios para la creación del contrato. Roles válidos => LocalSM.
 *     tags: [Contracts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empresa_id:
 *                 type: string
 *                 description: El ID de la empresa asociada al contrato.
 *                 example: 313
 *               ejecutivo_id:
 *                 type: string
 *                 description: El ID del ejecutivo asociado al contrato.
 *                 example: 486
 *               sla_horas_respuesta:
 *                 type: integer
 *                 description: El tiempo en horas para la respuesta del contrato.
 *                 example: 0
 *               sla_horas_provisorio:
 *                 type: integer
 *                 description: El tiempo en horas para el estado provisorio del contrato.
 *                 example: 0
 *               sla_horas_definitivo:
 *                 type: integer
 *                 description: El tiempo en horas para el estado definitivo del contrato.
 *                 example: 0
 *               tipo:
 *                 type: integer
 *                 description: Tipo de contrato (ej. 1 para mantenimiento, 2 para soporte).
 *                 example: 1
 *               horas_paquete:
 *                 type: integer
 *                 description: Número de horas incluidas en el paquete del contrato.
 *                 example: 2
 *               notas:
 *                 type: string
 *                 description: Notas adicionales o comentarios sobre el contrato.
 *                 example: Test.
 *               habilitado:
 *                 type: boolean
 *                 description: Indica si el contrato está habilitado o no.
 *                 example: true
 *               soporte_onsite:
 *                 type: boolean
 *                 description: Indica si el contrato incluye soporte onsite.
 *                 example: false
 *               reemplazo_partes:
 *                 type: boolean
 *                 description: Indica si el contrato incluye reemplazo de partes.
 *                 example: false
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio del contrato en formato YYYY-MM-DD.
 *                 example: 2024-01-10
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *                 description: Fecha de fin del contrato en formato YYYY-MM-DD.
 *                 example: 2025-01-10
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
 * /api/entities/updateContract/{id}:
 *   put:
 *     summary: Actualización de un contrato en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas actualizar un contrato existente en el sistema. Roles válidos => LocalSM.
 *     tags: [Contracts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contrato que se va a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empresa_id:
 *                 type: string
 *                 description: El ID de la empresa asociada al contrato.
 *                 example: "313"
 *               ejecutivo_id:
 *                 type: string
 *                 description: El ID del ejecutivo asociado al contrato.
 *                 example: "486"
 *               sla_horas_respuesta:
 *                 type: integer
 *                 description: El tiempo en horas para la respuesta del contrato.
 *                 example: 0
 *               sla_horas_provisorio:
 *                 type: integer
 *                 description: El tiempo en horas para el estado provisorio del contrato.
 *                 example: 0
 *               sla_horas_definitivo:
 *                 type: integer
 *                 description: El tiempo en horas para el estado definitivo del contrato.
 *                 example: 0
 *               tipo:
 *                 type: integer
 *                 description: Tipo de contrato (ej. 1 para mantenimiento, 2 para soporte).
 *                 example: 1
 *               horas_paquete:
 *                 type: integer
 *                 description: Número de horas incluidas en el paquete del contrato.
 *                 example: 2
 *               notas:
 *                 type: string
 *                 description: Notas adicionales o comentarios sobre el contrato.
 *                 example: "Test."
 *               habilitado:
 *                 type: boolean
 *                 description: Indica si el contrato está habilitado o no.
 *                 example: true
 *               soporte_onsite:
 *                 type: boolean
 *                 description: Indica si el contrato incluye soporte onsite.
 *                 example: false
 *               reemplazo_partes:
 *                 type: boolean
 *                 description: Indica si el contrato incluye reemplazo de partes.
 *                 example: false
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio del contrato en formato YYYY-MM-DD.
 *                 example: "2024-01-10"
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *                 description: Fecha de fin del contrato en formato YYYY-MM-DD.
 *                 example: "2025-01-10"
 *             required:
 *               - empresa_id
 *               - ejecutivo_id
 *               - sla_horas_respuesta
 *               - sla_horas_provisorio
 *               - sla_horas_definitivo
 *               - tipo
 *               - horas_paquete
 *               - notas
 *               - habilitado
 *               - soporte_onsite
 *               - reemplazo_partes
 *     responses:
 *       200:
 *         description: Contrato actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contract:
 *                   type: object
 *                   description: Información del contrato actualizado y código único generado.
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
 *     security:
 *      - x-token: []
 */
router.put(
    '/updateContract/:id',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),
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

        validarCampos,
        validarJWT
    ],

    updateContract
);


/**
 * @openapi
 * /api/entities/deleteContract/{id}:
 *   delete:
 *     summary: Eliminar un contrato en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas eliminar un contrato mediante su ID en el sistema. Se requiere proporcionar el ID del contrato a eliminar. Roles válidos => LocalSM.
 *     tags: [Contracts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contrato que se va a eliminar.
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
 *     security:
 *      - x-token: []
 */
router.delete(
    '/deleteContract/:id',
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
 *     summary: Obtener todas las marcas en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas obtener la lista de todas las marcas en el sistema. Roles válidos => LocalSM.
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
 *     summary: Crear una nueva marca en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas crear una nueva marca en el sistema. Se requiere proporcionar el nombre de la marca. Roles válidos => LocalSM.
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
 * /api/entities/updateBrand/{id}:
 *   put:
 *     summary: Actualización de una marca en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas actualizar una marca existente en el sistema. Roles válidos => LocalSM.
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la marca que se va a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: El nombre actualizado de la marca.
 *                 example: nuevaPrueba1
 *     responses:
 *       200:
 *         description: Marca actualizada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 brand:
 *                   type: object
 *                   description: Información de la marca actualizada y código único generado.
 *       201:
 *         description: Actualización no permitida (201) debido a validaciones.
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
    '/updateBrand/:id',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    updateBrand
);


/**
 * @openapi
 * /api/entities/deleteBrand/{id}:
 *   delete:
 *     summary: Eliminación de una marca en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas eliminar una marca existente en el sistema. Roles válidos => LocalSM.
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la marca que se va a eliminar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *     responses:
 *       200:
 *         description: Marca eliminada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 brand:
 *                   type: object
 *                   description: Información de la marca actualizada y código único generado.
 *       201:
 *         description: Actualización no permitida (201) debido a validaciones.
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
router.delete(
    '/deleteBrand/:id',
    [
        check('id', 'El nombre es obligatorio').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    deleteBrand
);

/**
 * @openapi
 * /api/entities/getAllResponsibles:
 *   post:
 *     summary: Obtener todas los responsables en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas obtener la lista de todas los responsables en el sistema. Roles válidos => LocalSM.
 *     tags: [Ticket Actions]
 *     responses:
 *       200:
 *         description: Lista de responsables obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responsibles:
 *                   type: array
 *                   description: Lista de responsables.
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
    '/getAllResponsibles',
    [
        validarJWT
    ],

    getAllResponsibles
);

/**
 * @openapi
 * /api/entities/getAllPrioritys:
 *   post:
 *     summary: Obtener todas las prioridades en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas obtener la lista de todas las prioridades en el sistema. Roles válidos => LocalSM.
 *     tags: [Ticket Actions]
 *     responses:
 *       200:
 *         description: Lista de prioridades obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 prioritys:
 *                   type: array
 *                   description: Lista de prioridades.
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
    '/getAllPrioritys',
    [
        validarJWT
    ],

    getAllPrioritys
);

/**
 * @openapi
 * /api/entities/getAllStates:
 *   post:
 *     summary: Obtener todas los estados en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas obtener la lista de todos los estados en el sistema. Roles válidos => LocalSM.
 *     tags: [Ticket Actions]
 *     responses:
 *       200:
 *         description: Lista de estados obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 states:
 *                   type: array
 *                   description: Lista de estados.
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
    '/getAllStates',
    [
        validarJWT
    ],

    getAllStates
);

/**
 * @openapi
 * /api/entities/setResponsible:
 *   post:
 *     summary: Establecer un nuevo responsable en el ticket
 *     description: Este endpoint permite a un usuario con credenciales válidas crear un nuevo responsable en el ticket. Se requieren varios campos obligatorios para la creación del contrato. Roles válidos => LocalSM.
 *     tags: [Ticket Actions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: integer
 *                 description: El ID del ticket
 *                 example: 8290
 *               usuario_id:
 *                 type: integer
 *                 description: El ID del usuario asociado al ticket.
 *                 example: 44
 *               responsable_id:
 *                 type: integer
 *                 description: El ID del ejecutivo asociado al contrato.
 *                 example: 486
 *     responses:
 *       201:
 *         description: Responsable creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contract:
 *                   type: object
 *                   description: Información del responsable creado y código único generado.
 *       400:
 *         description: Solicitud incorrecta (400) debido a validaciones.
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
 *                   description: Mensaje con información adicional devuelta.
 *       401:
 *         description: No autorizado (401) debido a falta de credenciales.
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
 *                   description: Mensaje con información adicional devuelta.
 *     parameters: []
 *     security:
 *      - x-token: []
 */
router.post(
    '/setResponsible',
    [
        check('ticket_id', 'El ticket_id es obligatorio').isInt(),
        check('usuario_id', 'El usuario_id es obligatorio').isInt(),
        check('responsable_id', 'El responsable_id es obligatorio').isInt(),
        validarCampos,
        validarJWT
    ],
    setResponsible
);


/**
 * @openapi
 * /api/entities/setPriority:
 *   post:
 *     summary: Establecer una nueva prioridad en el ticket
 *     description: Este endpoint permite a un usuario con credenciales válidas crear una nueva prioridad en el ticket. Se requieren varios campos obligatorios para la creación del contrato. Roles válidos => LocalSM.
 *     tags: [Ticket Actions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: integer
 *                 description: El ID del ticket
 *                 example: 8290
 *               usuario_id:
 *                 type: integer
 *                 description: El ID del usuario asociado al ticket.
 *                 example: 44
 *               prioridad:
 *                 type: integer
 *                 description: El ID de la prioridad asociada al ticket.
 *                 example: 1
 *     responses:
 *       201:
 *         description: Prioridad creada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contract:
 *                   type: object
 *                   description: Información de la prioridad y código único generado.
 *       400:
 *         description: Solicitud incorrecta (400) debido a validaciones.
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
 *                   description: Mensaje con información adicional devuelta.
 *       401:
 *         description: No autorizado (401) debido a falta de credenciales.
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
 *                   description: Mensaje con información adicional devuelta.
 *     parameters: []
 *     security:
 *      - x-token: []
 */
router.post(
    '/setPriority',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('usuario_id', 'El id es obligatorio').not().isEmpty(),
        check('prioridad', 'La prioridad es obligatoria').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    setPriority
);


/**
 * @openapi
 * /api/entities/setState:
 *   post:
 *     summary: Establecer un nuevo estado en el ticket
 *     description: Este endpoint permite a un usuario con credenciales válidas crear un nuevo estado en el ticket. Se requieren varios campos obligatorios para la creación del contrato. Roles válidos => LocalSM.
 *     tags: [Ticket Actions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: integer
 *                 description: El ID del ticket
 *                 example: 8290
 *               usuario_id:
 *                 type: integer
 *                 description: El ID del usuario asociado al ticket.
 *                 example: 44
 *               estado:
 *                 type: integer
 *                 description: El ID del estado asociado al ticket.
 *                 example: 1
 *     responses:
 *       201:
 *         description: Estado creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contract:
 *                   type: object
 *                   description: Información del estado y código único generado.
 *       400:
 *         description: Solicitud incorrecta (400) debido a validaciones.
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
 *                   description: Mensaje con información adicional devuelta.
 *       401:
 *         description: No autorizado (401) debido a falta de credenciales.
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
 *                   description: Mensaje con información adicional devuelta.
 *     parameters: []
 *     security:
 *      - x-token: []
 */
router.post(
    '/setState',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('usuario_id', 'El id es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio').not().isEmpty(),

        validarCampos,
        validarJWT
    ],
    setState
);


/**
 * @openapi
 * /api/entities/setNote:
 *   post:
 *     summary: Setea una nueva nota en el ticket
 *     description: Este endpoint permite a un usuario con credenciales válidas crear una nueva nota en el ticket. Se requieren varios campos obligatorios para la creación del contrato. Roles válidos => LocalSM.
 *     tags: [Ticket Actions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: integer
 *                 description: El ID del ticket
 *                 example: 8290
 *               usuario_id:
 *                 type: integer
 *                 description: El ID del usuario asociado al ticket.
 *                 example: 44
 *               notas:
 *                 type: string
 *                 description: Nueva nota asociada al ticket.
 *                 example: 1
 *     responses:
 *       201:
 *         description: Estado creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contract:
 *                   type: object
 *                   description: Información de la nota y código único generado.
 *       400:
 *         description: Solicitud incorrecta (400) debido a validaciones.
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
 *                   description: Mensaje con información adicional devuelta.
 *       401:
 *         description: No autorizado (401) debido a falta de credenciales.
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
 *                   description: Mensaje con información adicional devuelta.
 *     parameters: []
 *     security:
 *      - x-token: []
 */
router.post(
    '/setNote',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('usuario_id', 'El id es obligatorio').not().isEmpty(),
        check('notas', 'Las notas son obligatorias').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    setNote
);

/**
 * @openapi
 * /api/entities/setAutoEvaluation:
 *   post:
 *     summary: Setea una nueva autoevaluación en el ticket
 *     description: Este endpoint permite a un usuario con credenciales válidas crear una nueva autoevaluación en el ticket. Se requieren varios campos obligatorios para la creación del contrato. Roles válidos => LocalSM.
 *     tags: [Ticket Actions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: integer
 *                 description: El ID del ticket
 *                 example: 8290
 *               usuario_id:
 *                 type: integer
 *                 description: El ID del usuario asociado al ticket.
 *                 example: 44
 *               auto_evaluacion:
 *                 type: integer
 *                 description: Nueva autoevaluacion asociada al ticket.
 *                 example: 1
 *     responses:
 *       201:
 *         description: Estado creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contract:
 *                   type: object
 *                   description: Información de la autoevaluación y código único generado.
 *       400:
 *         description: Solicitud incorrecta (400) debido a validaciones.
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
 *                   description: Mensaje con información adicional devuelta.
 *       401:
 *         description: No autorizado (401) debido a falta de credenciales.
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
 *                   description: Mensaje con información adicional devuelta.
 *     parameters: []
 *     security:
 *      - x-token: []
 */
router.post(
    '/setAutoEvaluation',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('usuario_id', 'El id es obligatorio').not().isEmpty(),
        check('auto_evaluacion', 'La autoevaluacion es obligatoria').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    setAutoEvaluation
);

/**
 * @openapi
 * /api/entities/setHours:
 *   post:
 *     summary: Setea una nueva hora en el ticket
 *     description: Este endpoint permite a un usuario con credenciales válidas crear una nueva hora en el ticket. Se requieren varios campos obligatorios para la creación del contrato. Roles válidos => LocalSM.
 *     tags: [Ticket Actions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: integer
 *                 description: El ID del ticket
 *                 example: 8290
 *               usuario_id:
 *                 type: integer
 *                 description: El ID del usuario asociado al ticket.
 *                 example: 44
 *               horas:
 *                 type: string
 *                 description: Nueva hora asociada al ticket.
 *                 example: "00:01:00"
 *     responses:
 *       201:
 *         description: Estado creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contract:
 *                   type: object
 *                   description: Información de la hora y código único generado.
 *       400:
 *         description: Solicitud incorrecta (400) debido a validaciones.
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
 *                   description: Mensaje con información adicional devuelta.
 *       401:
 *         description: No autorizado (401) debido a falta de credenciales.
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
 *                   description: Mensaje con información adicional devuelta.
 *     parameters: []
 *     security:
 *      - x-token: []
 */
router.post(
    '/setHours',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('usuario_id', 'El id es obligatorio').not().isEmpty(),
        check('horas', 'Las horas son obligatoria').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    setHours
);

module.exports = router;