const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { createCompany, updateCompany, deleteCompany, getAllCompanies } = require('../controllers/companies');
const { createProduct, deleteProduct, updateProduct, getProduct, getAllProducts, getProductsByBrand, getProductsByBrandAndCompany } = require('../controllers/products');
const { createContract, deleteContract, updateContract, getAllContracts, getContractsByCompany } = require('../controllers/contracts');
const { createBrand, deleteBrand, updateBrand, getAllBrands, getBrandsByCompany } = require('../controllers/brands');
const { getAllPrioritys } = require('../controllers/prioritys');
const { getAllStatesByTicketId, getAllStates } = require('../controllers/states');
const { getSummarizeHoursByTechnician, getHourDetailByTechnician } = require('../controllers/reports');
const { createHoliday, deleteHoliday } = require('../controllers/holidays');
const { getUserRol, getCompanyByUser } = require('../helpers/validators');
const { validarJWT } = require('../middlewares/validar-jwt');
const { setState, setPriority, setResponsible, setAutoEvaluation, setHours, setNote, getTicketActionByTicketId, setFilePath, setHiddenNote, setExtraHours, getAllUsers, getTicketDetail, getAllUsersByCompany, setHoursByList } = require('../controllers/ticket_actions');
const { createTicket, updateTicket, deleteTicket, getAllTicketsByFilter, getFailTypes, getTicketTypes } = require('../controllers/tickets');
const { getProjectByCompany } = require('../controllers/projects');
const router = Router();

/**
 * @openapi
 * /api/entities/createCompany:
 *   post:
 *     summary: Alta de nueva empresa en el sistema
 *     description: Este endpoint permite a un usuario  con credenciales validas dar de alta una nueva empresa cliente al sistema.
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
 *     description: Este endpoint permite a un usuario con credenciales válidas actualizar una empresa cliente existente en el sistema.
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
 *     description: Este endpoint permite a un usuario con credenciales válidas eliminar una empresa cliente del sistema
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

router.post(
    '/getCompanyByUser',
    [
        check('label', 'El label es obligatorio').not().isEmpty(),
        validarCampos,
        validarJWT
    ],

    getCompanyByUser
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
 * /api/entities/getProductsByBrandAndCompany:
 *   post:
 *     summary: Obtener información de todos los productos por marca y compañía en el sistema
 *     description: Este endpoint permite obtener información detallada de todos los productos por marca y compañia en el sistema. Se requieren credenciales de usuario autenticado.
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
 *               company:
 *                 type: integer
 *                 description: Id de la compañía de los productos a buscar.
 *             required:
 *               - marca_id
 *               - company
 *     responses:
 *       200:
 *         description: Información de todos los productos por marca y compañía obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   description: Detalles de todos los productos por marca y compañía.
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
    '/getProductsByBrandAndCompany',
    [
        check('marca_id', 'Debe ingresar una marca').not().isEmpty(),
        check('company', 'Debe ingresar una compañia').not().isEmpty(),

        validarJWT
    ],

    getProductsByBrandAndCompany
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
 *     description: Este endpoint permite a un usuario con credenciales válidas crear un nuevo producto en el sistema. Se requieren varios campos obligatorios para la creación del producto.
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
 *     description: Este endpoint permite a un usuario con credenciales válidas eliminar un producto existente en el sistema.
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
 *     description: Este endpoint permite a un usuario con credenciales válidas actualizar un producto existente en el sistema.
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
 *     description: Este endpoint permite a un usuario con credenciales válidas crear un nuevo contrato en el sistema. Se requieren varios campos obligatorios para la creación del contrato.
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
 *     description: Este endpoint permite a un usuario con credenciales válidas actualizar un contrato existente en el sistema.
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
 *     description: Este endpoint permite a un usuario con credenciales válidas eliminar un contrato mediante su ID en el sistema. Se requiere proporcionar el ID del contrato a eliminar.
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
 *     description: Este endpoint permite a un usuario con credenciales válidas obtener la lista de todas las marcas en el sistema.
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
 *     description: Este endpoint permite a un usuario con credenciales válidas crear una nueva marca en el sistema. Se requiere proporcionar el nombre de la marca.
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: El id de la marca.
 *                 example: 100
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
        check('id', 'El id es obligatorio').not().isEmpty(),
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
 *     description: Este endpoint permite a un usuario con credenciales válidas actualizar una marca existente en el sistema.
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
 *     description: Este endpoint permite a un usuario con credenciales válidas eliminar una marca existente en el sistema.
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
 * /api/entities/getAllUsers:
 *   post:
 *     summary: Obtener todos los responsables en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas obtener la lista de todas los responsables en el sistema.
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
    '/getAllUsers',
    [
        validarJWT
    ],

    getAllUsers
);

/**
 * @openapi
 * /api/entities/getAllUsersByCompany:
 *   post:
 *     summary: Obtener todos los usuarios por empresa
 *     description: Este endpoint permite obtener todos los usuarios por empresa. Se requieren credenciales de usuario autenticado.
 *     tags: [Ticket Actions]
 *     security:
 *      - x-token: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empresaId:
 *                 type: integer
 *                 description: Id de la empresa.
 *                 example: 15
 *               includemyself:
 *                 type: integer
 *                 description: Id de inclución.
 *                 example: 1
 *             required:
 *               - empresaId
 *               - includemyself
 *     responses:
 *       200:
 *         description: Obtención de todos los usuarios por empresa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   description: Obtención de todos los usuarios por empresa.
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
    '/getAllUsersByCompany',
    [
        check('empresaId', 'Debe ingresar empresaId').not().isEmpty(),
        check('includemyself', 'Debe ingresar includemyself').not().isEmpty(),
        validarJWT
    ],

    getAllUsersByCompany
);


/**
 * @openapi
 * /api/entities/getAllPrioritys:
 *   post:
 *     summary: Obtener todas las prioridades en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas obtener la lista de todas las prioridades en el sistema.
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
 * /api/entities/getAllStatesByTicketId:
 *   post:
 *     summary: Obtener todos los estados en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas obtener la lista de todos los estados en el sistema.
 *     tags: [Ticket Actions]
 *     security:
 *      - x-token: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: integer
 *                 description: Id del ticket.
 *                 example: 8290
 *             required:
 *               - ticket_id
 *     responses:
 *       200:
 *         description: Información de todas los estados en el sistema obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticket_actions:
 *                   type: array
 *                   description: Detalles de todas las acciones por ticket.
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
    '/getAllStatesByTicketId',
    [
        //Recibo un id de ticket.
        // Si ticket es -1 devuelve los estados validos para un filtro, si no los validos para el ticket.
        check('ticket_id', 'Debe ingresar un ticket_id').not().isEmpty(),

        validarJWT
    ],

    getAllStatesByTicketId
);

/**
 * @openapi
 * /api/entities/getAllStates:
 *   post:
 *     summary: Obtener todas los estados en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas obtener la lista de todas las prioridades en el sistema.
 *     tags: [Ticket Actions]
 *     responses:
 *       200:
 *         description: Lista de estados obtenidos correctamente.
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
 * /api/entities/getTicketActionByTicketId:
 *   post:
 *     summary: Obtener información de todas las acciones por ticket id en el sistema
 *     description: Este endpoint permite obtener información detallada de todas las acciones de un ticket en el sistema. Se requieren credenciales de usuario autenticado.
 *     tags: [Ticket Actions]
 *     security:
 *      - x-token: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: integer
 *                 description: Id del ticket.
 *                 example: 8290
 *             required:
 *               - ticket_id
 *     responses:
 *       200:
 *         description: Información de todas las acciones de un ticket por id de ticket obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticket_actions:
 *                   type: array
 *                   description: Detalles de todas las acciones por ticket.
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
    '/getTicketActionByTicketId',
    [
        check('ticket_id', 'Debe ingresar un ticket_id').not().isEmpty(),

        validarJWT
    ],

    getTicketActionByTicketId
);

/**
 * @openapi
 * /api/entities/getProjectByCompany:
 *   post:
 *     summary: Obtener información de todos los proyectos por compañía en el sistema
 *     description: Este endpoint permite obtener información detallada de todos los proyectos por compañía en el sistema. Se requieren credenciales de usuario autenticado.
 *     tags: [Projects]
 *     security:
 *      - x-token: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: integer
 *                 description: Id de la companía.
 *                 example: 3
 *             required:
 *               - company
 *     responses:
 *       200:
 *         description: Información de todas las acciones de un ticket por id de ticket obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projects:
 *                   type: array
 *                   description: Detalles de todas las acciones por ticket.
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
    '/getProjectByCompany',
    [
        check('company', 'Debe ingresar un company').not().isEmpty(),

        validarJWT
    ],

    getProjectByCompany
);

/**
 * @openapi
 * /api/entities/getBrandsByCompany:
 *   post:
 *     summary: Obtener información de todas las marcas por compañía en el sistema
 *     description: Este endpoint permite obtener información detallada de todas las marcas por compañía en el sistema. Se requieren credenciales de usuario autenticado.
 *     tags: [Brands]
 *     security:
 *      - x-token: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: integer
 *                 description: Id de la compañía.
 *                 example: 3
 *             required:
 *               - company
 *     responses:
 *       200:
 *         description: Información de todas las acciones de un ticket por id de ticket obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 brands:
 *                   type: array
 *                   description: Detalles de todas las acciones por ticket.
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
    '/getBrandsByCompany',
    [
        check('company', 'Debe ingresar un company').not().isEmpty(),

        validarJWT
    ],

    getBrandsByCompany
);


/**
 * @openapi
 * /api/entities/setResponsible:
 *   post:
 *     summary: Establecer un nuevo responsable en el ticket
 *     description: Este endpoint permite a un usuario con credenciales válidas crear un nuevo responsable en el ticket. Se requieren varios campos obligatorios para la creación del contrato.
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
 *     description: Este endpoint permite a un usuario con credenciales válidas crear una nueva prioridad en el ticket. Se requieren varios campos obligatorios para la creación del contrato.
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
 *     description: Este endpoint permite a un usuario con credenciales válidas crear un nuevo estado en el ticket. Se requieren varios campos obligatorios para la creación del contrato.
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
 *     description: Este endpoint permite a un usuario con credenciales válidas crear una nueva nota en el ticket. Se requieren varios campos obligatorios para la creación del contrato.
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
 *     description: Este endpoint permite a un usuario con credenciales válidas crear una nueva autoevaluación en el ticket. Se requieren varios campos obligatorios para la creación del contrato.
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
 *     summary: Setea las horas trabajadas en el ticket
 *     description: Este endpoint permite a un usuario con credenciales válidas setear las horas trabajadas en el ticket. Se requieren varios campos obligatorios para la creación del contrato.
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
 *               horas:
 *                 type: string
 *                 description: Nueva hora asociada al ticket.
 *                 example: "00:01:00"
 *               fecha_accion_hs:
 *                 type: string
 *                 description: Nueva hora real asociada al ticket.
 *                 example: "2024-01-01 00:00:00"
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
        check('horas', 'Las horas son obligatoria').not().isEmpty(),
        check('fecha_accion_hs', 'Las horas son obligatoria').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    setHours
);

/**
 * @openapi
 * /api/entities/setHoursByList:
 *   post:
 *     summary: Setea las horas trabajadas en el ticket
 *     description: Este endpoint permite a un usuario con credenciales válidas setear las horas trabajadas en el ticket. Se requieren varios campos obligatorios para la creación del contrato.
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
 *               horas:
 *                 type: string
 *                 description: Nueva hora asociada al ticket.
 *                 example: "00:01:00"
 *               fecha_accion_hs:
 *                 type: string
 *                 description: Nueva hora real asociada al ticket.
 *                 example: "2024-01-01 00:00:00"
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
    '/setHoursByList',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('horas', 'Las horas son obligatoria').not().isEmpty(),
        check('fecha_accion_hs', 'Las horas son obligatoria').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    setHoursByList
);

/**
 * @openapi
 * /api/entities/setFilePath:
 *   post:
 *     summary: Setea una nueva ruta de archivo en el ticket
 *     description: Este endpoint permite a un usuario con credenciales válidas crear una nueva ruta de archivo en el ticket. Se requieren varios campos obligatorios para la creación del contrato.
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
 *               archivo:
 *                 type: string
 *                 description: Ruta del archivo.
 *                 example: "files/test.txt"
 *     responses:
 *       201:
 *         description: File creado correctamente.
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
    '/setFilePath',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('archivo', 'Las horas son obligatoria').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    setFilePath
);

/**
 * @openapi
 * /api/entities/setHiddenNote:
 *   post:
 *     summary: Setear una nueva nota oculta en el ticket
 *     description: Este endpoint permite a un usuario con credenciales válidas crear una nota oculta en el ticket. Se requieren varios campos obligatorios para la creación del contrato.
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
 *               nota:
 *                 type: string
 *                 description: Nota oculta.
 *                 example: Test
 *     responses:
 *       201:
 *         description: Nota oculta creada correctamente.
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
    '/setHiddenNote',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('nota', 'La nota oculta es obligatorio').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    setHiddenNote
);

/**
 * @openapi
 * /api/entities/updateTicket:
 *   put:
 *     summary: Actualización de un ticket en el sistema.
 *     description: >
 *       Este endpoint permite a un usuario con credenciales válidas actualizar un nuevo ticket en el sistema. .
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empresaId:
 *                 type: integer
 *                 description: ID de la empresa asociada al ticket.
 *                 example: 28013
 *               tipoFalla:
 *                 type: integer
 *                 description: Tipo de falla del ticket.
 *                 example: 1
 *               cliente:
 *                 type: string
 *                 description: ID del cliente asociado al ticket.
 *                 example: "Test"
 *               partner:
 *                 type: string
 *                 description: ID del partner asociado al ticket.
 *                 example: "1"
 *               rma:
 *                 type: string
 *                 description: ID del RMA asociado al ticket.
 *                 example: "Test"
 *               bug:
 *                 type: string
 *                 description: ID del bug asociado al ticket.
 *                 example: "Test"
 *               comment:
 *                 type: string
 *                 description: Comentario asociado al ticket.
 *                 example: "Test"
 *               nroSerie:
 *                 type: string
 *                 description: Número de serie asociado al ticket.
 *                 example: "SN123"
 *               nodo:
 *                 type: string
 *                 description: Información sobre el nodo asociado al ticket.
 *                 example: "123"
 *               titulo:
 *                 type: string
 *                 description: Título del ticket.
 *                 example: "Problema con el producto - actualizado"
 *               causaRaiz:
 *                 type: string
 *                 description: Causa raíz del problema asociado al ticket.
 *                 example: "Test"
 *               preventa:
 *                 type: integer
 *                 description: ID de la preventa asociada al ticket.
 *                 example: 0
 *               vendedor:
 *                 type: integer
 *                 description: ID del vendedor asociado al ticket.
 *                 example: 0
 *               producto:
 *                 type: integer
 *                 description: ID del producto asociado al ticket.
 *                 example: 258
 *               esProjecto:
 *                 type: string
 *                 description: Indica si el ticket está asociado a un proyecto.
 *                 example: '0'
 *               proyecton:
 *                 type: integer
 *                 description: ID del proyecto asociado al ticket.
 *                 example: -1
 *               array_user_id_notif:
 *                 type: string
 *                 description: Array para notificaciones.
 *                 example: "2108;2316;test@test.com"
 *     responses:
 *       201:
 *         description: Ticket creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticket:
 *                   type: object
 *                   description: Información del nuevo ticket creado y código único generado.
 *       400:
 *         description: Error de validación al intentar crear el ticket.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de validación fallida.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *       500:
 *         description: Error interno del servidor al intentar crear el ticket.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de fallo interno.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *     parameters: []
 *     security:
 *       - x-token: []
 */
router.put(
    '/updateTicket',
    [
        check('empresaId', 'La empresaId no puede estar vacío').notEmpty(),
        check('tipoFalla', 'El tipoFalla no puede estar vacío').notEmpty(),
        check('cliente', 'El cliente no puede estar vacío').notEmpty(),
        check('partner', 'El partner no puede estar vacío').notEmpty(),
        check('rma', 'El rma no puede estar vacío').notEmpty(),
        check('bug', 'La bug no puede estar vacía').notEmpty(),
        check('comment', 'El comment no puede estar vacío').notEmpty(),
        check('nroSerie', 'El nroSerie no puede estar vacío').notEmpty(),
        check('nodo', 'El nodo no puede estar vacío').notEmpty(),
        check('titulo', 'El titulo no puede estar vacío').notEmpty(),
        check('causaRaiz', 'El causaRaiz no puede estar vacío').notEmpty(),
        check('preventa', 'El preventa no puede estar vacío').notEmpty(),
        check('vendedor', 'El vendedor no puede estar vacío').notEmpty(),
        check('producto', 'El producto no puede estar vacío').notEmpty(),
        check('esProjecto', 'El isproject no puede estar vacío').notEmpty(),
        check('proyecton', 'El proyecton no puede estar vacío').notEmpty(),
        check('array_user_id_notif', 'El array_user_id_notif no puede estar vacío').notEmpty(),

        validarCampos,
        validarJWT
    ],

    updateTicket
);

/**
 * @openapi
 * /api/entities/createTicket:
 *   post:
 *     summary: Creación de un nuevo ticket en el sistema.
 *     description: >
 *       Este endpoint permite a un usuario con credenciales válidas crear un nuevo ticket en el sistema. .
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               empresaId:
 *                 type: integer
 *                 description: ID de la empresa asociada al ticket.
 *                 example: 3
 *               contratoId:
 *                 type: integer
 *                 description: ID del contrato asociado al ticket.
 *                 example: -1
 *               productoId:
 *                 type: integer
 *                 description: ID del producto asociado al ticket.
 *                 example: 258
 *               tipoFalla:
 *                 type: integer
 *                 description: Tipo de falla del ticket.
 *                 example: 1
 *               description:
 *                 type: string
 *                 description: Descripción detallada del ticket.
 *                 example: Descripción detallada del problema.
 *               title:
 *                 type: string
 *                 description: Título del ticket.
 *                 example: "Problema con el producto"
 *               nroSerie:
 *                 type: string
 *                 description: Número de serie asociado al ticket.
 *                 example: ""
 *               nodo:
 *                 type: string
 *                 description: Información sobre el nodo asociado al ticket.
 *                 example: ""
 *               esProyecto:
 *                 type: integer
 *                 description: Indica si el ticket está asociado a un proyecto.
 *                 example: 0
 *               padreId:
 *                 type: integer
 *                 description: ID del ticket padre.
 *                 example: 0
 *               preventaId:
 *                 type: integer
 *                 description: ID de la preventa asociada al ticket.
 *                 example: 0
 *               vendedorId:
 *                 type: integer
 *                 description: ID del vendedor asociado al ticket.
 *                 example: 0
 *               tkEnPartner:
 *                 type: string
 *                 description: ID del ticket asociado al partner.
 *                 example: ""
 *               responsableId:
 *                 type: integer
 *                 description: ID del responsableId asociado al ticket.
 *                 example: 2108
 *               array_user_id_notif:
 *                 type: string
 *                 description: Array para notificaciones.
 *                 example: "2108;test@test.com;2316"
 *     responses:
 *       201:
 *         description: Ticket creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticket:
 *                   type: object
 *                   description: Información del nuevo ticket creado y código único generado.
 *       400:
 *         description: Error de validación al intentar crear el ticket.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de validación fallida.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *       500:
 *         description: Error interno del servidor al intentar crear el ticket.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de fallo interno.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional retornada.
 *     parameters: []
 *     security:
 *       - x-token: []
 */
router.post(
    '/createTicket',
    [
        check('empresaId', 'La empresaId no puede estar vacío').notEmpty(),
        check('contratoId', 'El contratoId no puede estar vacío').notEmpty(),
        check('productoId', 'El productoId no puede estar vacío').notEmpty(),
        check('tipoFalla', 'El tipoFalla no puede estar vacío').notEmpty(),
        check('title', 'El title no puede estar vacío').notEmpty(),
        check('description', 'La description no puede estar vacía').notEmpty(),
        check('esProyecto', 'El esProyecto no puede estar vacío').notEmpty(),
        check('padreId', 'El padreId no puede estar vacío').notEmpty(),
        check('preventaId', 'El preventaId no puede estar vacío').notEmpty(),
        check('vendedorId', 'El vendedorId no puede estar vacío').notEmpty(),

        validarCampos,
        validarJWT
    ],

    createTicket
);

/**
 * @openapi
 * /api/entities/deleteTicket/{id}:
 *   delete:
 *     summary: Elimina un ticket en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas eliminar una empresa cliente del sistema.
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: int
 *         description: ID del ticket que se va a eliminar.
 *     responses:
 *       201:
 *         description: Ticket eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 company:
 *                   type: object
 *                   description: Información del ticket eliminado
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
    '/deleteTicket/:id',
    [
        check('id', 'El label es obligatorio').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    deleteTicket
);

/**
 * @openapi
 * /api/entities/getAllTicketsByFilter:
 *   post:
 *     summary: Obtener todos los tickets en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas obtener la lista de todos los tickets en el sistema.
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Cadena de búsqueda para filtrar los tickets.
 *                 example: ""
 *               causaRaiz:
 *                 type: string
 *                 description: Cadena de búsqueda para filtrar los tickets.
 *                 example: ""
 *               ticketPartner:
 *                 type: string
 *                 description: Cadena de búsqueda para filtrar los tickets.
 *                 example: ""
 *               empresaId:
 *                 type: integer
 *                 description: Cadena de búsqueda para filtrar los tickets.
 *                 example: -1
 *               productoId:
 *                 type: integer
 *                 description: Cadena de búsqueda para filtrar los tickets.
 *                 example: -1
 *               responsableId:
 *                 type: integer
 *                 description: Cadena de búsqueda para filtrar los tickets.
 *                 example: -1
 *               numeroId:
 *                 type: integer
 *                 description: Cadena de búsqueda para filtrar los tickets.
 *                 example: -1
 *               prioridad:
 *                 type: integer
 *                 description: Cadena de búsqueda para filtrar los tickets.
 *                 example: -1
 *               estado:
 *                 type: integer
 *                 description: Cadena de búsqueda para filtrar los tickets.
 *                 example: -1
 *               tipoFalla:
 *                 type: integer
 *                 description: Cadena de búsqueda para filtrar los tickets.
 *                 example: -1
 *               dateFrom:
 *                 type: string
 *                 description: Cadena de búsqueda para filtrar los tickets.
 *                 example: ""
 *               dateTo:
 *                 type: string
 *                 description: Cadena de búsqueda para filtrar los tickets.
 *                 example: ""
 *               tipoTicket:
 *                 type: integer
 *                 description: Tipo de ticket.
 *                 example: -1
 *               offset:
 *                 type: integer
 *                 description: Valor de desplazamiento para la paginación de resultados.
 *                 example: 0
 *               orderBy:
 *                 type: string
 *                 description: Tipo de ticket.
 *                 example: ""
 *               orderByType:
 *                 type: string
 *                 description: Tipo de ticket.
 *                 example: ""
 *               limit:
 *                 type: integer
 *                 description: Tipo de ticket.
 *                 example: 15
 *     responses:
 *       200:
 *         description: Lista de tickets obtenida correctamente.
 *         content:
  *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error en caso de eliminación fallida.
 *                 msg:
 *                   type: string
 *                   description: Mensaje con información adicional devuelta.
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
 *       - x-token: []
 */
router.post(
    '/getAllTicketsByFilter',
    [
        check('titulo', 'El titulo es obligatorio').not().isEmpty(),
        check('causaRaiz', 'El causaRaiz es obligatorio').not().isEmpty(),
        check('ticketPartner', 'El ticketPartner es obligatorio').not().isEmpty(),
        check('empresaId', 'La empresaId es obligatorio').not().isEmpty(),
        check('productoId', 'El productoId es obligatorio').not().isEmpty(),
        check('responsableId', 'El responsableId es obligatorio').not().isEmpty(),
        check('numeroId', 'El numeroId es obligatorio').not().isEmpty(),
        check('prioridad', 'El prioridad es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio').not().isEmpty(),
        check('tipoFalla', 'El tipoFalla es obligatorio').not().isEmpty(),
        check('dateFrom', 'El dateFrom es obligatorio').not().isEmpty(),
        check('dateTo', 'El dateTo es obligatorio').not().isEmpty(),
        check('tipoTicket', 'El tipoticket es obligatorio').not().isEmpty(),
        check('offset', 'El offset es obligatorio').not().isEmpty(),
        check('orderBy', 'El orderBy es obligatorio').not().isEmpty(),
        check('orderByType', 'El orderByType es obligatorio').not().isEmpty(),
        check('limit', 'El limit es obligatorio').not().isEmpty(),

        validarJWT
    ],

    getAllTicketsByFilter
);

/**
 * @openapi
 * /api/entities/getSummarizeHoursByTechnician:
 *   post:
 *     summary: Obtener reporte de horas por técnico
 *     description: Este endpoint permite a un usuario con credenciales válidas obtener un reporte de horas resumido por técnico en el sistema.
 *     tags: [Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaIni:
 *                 type: string
 *                 description: Fecha de inicio (obligatorio).
 *                 example: "2024-02-16"
 *               fechaFin:
 *                 type: string
 *                 description: Fecha de fin (obligatorio).
 *                 example: "2024-02-16"
 *               idUsuario:
 *                 type: string
 *                 description: ID de usuario (obligatorio).
 *                 example: "-1"
 *               idEmpresa:
 *                 type: string
 *                 description: ID de empresa (obligatorio).
 *                 example: "-1"
 *     responses:
 *       200:
 *         description: Reporte obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 states:
 *                   type: array
 *                   description: Reporte de horas por técnico.
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
    '/getSummarizeHoursByTechnician',
    [
        check('fechaIni', 'La fecha es obligatorio').not().isEmpty(),
        check('fechaFin', 'La fecha es obligatorio').not().isEmpty(),
        check('idUsuario', 'La fecha es obligatorio').not().isEmpty(),
        check('idEmpresa', 'La fecha es obligatorio').not().isEmpty(),

        validarJWT
    ],

    getSummarizeHoursByTechnician
);

/**
 * @openapi
 * /api/entities/getHourDetailByTechnician:
 *   post:
 *     summary: Obtener reporte detallado de horas por técnico
 *     description: Este endpoint permite a un usuario con credenciales válidas obtener un reporte detallado de horas por técnico en el sistema.
 *     tags: [Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fechaIni:
 *                 type: string
 *                 description: Fecha de inicio (obligatorio).
 *                 example: "2024-02-16"
 *               fechaFin:
 *                 type: string
 *                 description: Fecha de fin (obligatorio).
 *                 example: "2024-02-16"
 *               idUsuario:
 *                 type: string
 *                 description: ID de usuario (obligatorio).
 *                 example: "-1"
 *               idEmpresa:
 *                 type: string
 *                 description: ID de empresa (obligatorio).
 *                 example: "-1"
 *               proyecto:
 *                 type: integer
 *                 description: Proyecto (obligatorio).
 *                 example: 0
 *     responses:
 *       200:
 *         description: Reporte detallado de horas por técnico obtenido correctamente.
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
 *     security:
 *      - x-token: []
 */
router.post(
    '/getHourDetailByTechnician',
    [
        check('fechaIni', 'La fecha es obligatorio').not().isEmpty(),
        check('fechaFin', 'La fecha es obligatorio').not().isEmpty(),
        check('idUsuario', 'La fecha es obligatorio').not().isEmpty(),
        check('idEmpresa', 'La fecha es obligatorio').not().isEmpty(),
        check('proyecto', 'La fecha es obligatorio').not().isEmpty(),

        validarJWT
    ],

    getHourDetailByTechnician
);

/**
 * @openapi
 * /api/entities/createHoliday:
 *   post:
 *     summary: Establecer un feriado en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas establecer un nuevo feriado en el sistema.
 *     tags: [Holidays]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 description: Fecha del feriado (obligatorio).
 *                 example: "2024-02-16"
 *               descripcion:
 *                 type: string
 *                 description: Descripción del feriado (obligatorio).
 *                 example: "Test feriado"
 *     responses:
 *       200:
 *         description: Feriado establecido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 states:
 *                   type: array
 *                   description: Establecimiento de feriado.
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
    '/createHoliday',
    [
        check('fecha', 'La fecha es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),

        validarJWT
    ],

    createHoliday
);

/**
 * @openapi
 * /api/entities/deleteHoliday/{fecha}:
 *   delete:
 *     summary: Eliminación de un feriado en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas eliminar un feriado existente en el sistema.
 *     tags: [Holidays]
 *     parameters:
 *       - in: path
 *         name: fecha
 *         required: true
 *         schema:
 *           type: string
 *         description: Fecha del feriado que se va a eliminar.
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
    '/deleteHoliday/:fecha',
    [
        check('fecha', 'El label es obligatorio').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    deleteHoliday
);

/**
 * @openapi
 * /api/entities/setHours:
 *   post:
 *     summary: Setea las horas extras trabajadas en el ticket
 *     description: Este endpoint permite a un usuario con credenciales válidas setear las horas extras trabajadas en el ticket. Se requieren varios campos obligatorios para la creación del contrato.
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
 *               horas:
 *                 type: string
 *                 description: Nueva hora asociada al ticket.
 *                 example: "00:01:00"
 *               fecha_accion_hs:
 *                 type: string
 *                 description: Nueva hora real asociada al ticket.
 *                 example: "2024-01-01 00:00:00"
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
        check('horas', 'Las horas son obligatoria').not().isEmpty(),
        check('fecha_accion_hs', 'Las horas son obligatoria').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    setHours
);

/**
 * @openapi
 * /api/entities/setExtraHours:
 *   post:
 *     summary: Setea las horas extras trabajadas en el ticket
 *     description: Este endpoint permite a un usuario con credenciales válidas setear las horas extras trabajadas en el ticket. Se requieren varios campos obligatorios para la creación del contrato.
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
 *               fecha_inicio:
 *                 type: string
 *                 description: Fecha de inicio de las horas extras.
 *                 example: "2024-01-01 00:00:00"
 *               fecha_fin:
 *                 type: string
 *                 description: Fecha de finalización de las horas extras.
 *                 example: "2024-01-01 01:00:00"
 *               porcentaje:
 *                 type: integer
 *                 description: Porcentaje de horas extras trabajadas.
 *                 example: 50
 *               detalle:
 *                 type: string
 *                 description: Detalles adicionales de las horas extras.
 *                 example: "Trabajo adicional en la implementación de nuevas funcionalidades."
 *               estado:
 *                 type: string
 *                 description: Estado de las horas extras (aprobadas, pendientes, rechazadas, etc.).
 *                 example: "aprobadas"
 *               id:
 *                 type: integer
 *                 description: ID del usuario responsable de registrar las horas extras.
 *                 example: 123
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
    '/setExtraHours',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('fecha_inicio', 'Las horas son obligatoria').not().isEmpty(),
        check('fecha_fin', 'El username es obligatorio').not().isEmpty(),
        check('porcentaje', 'El username es obligatorio').not().isEmpty(),
        check('detalle', 'El username es obligatorio').not().isEmpty(),
        check('estado', 'El username es obligatorio').not().isEmpty(),
        check('id', 'El username es obligatorio').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    setExtraHours
);

/**
 * @openapi
 * /api/entities/getTicketDetail:
 *   post:
 *     summary: Obtener listado de todos los detalles del ticket en el sistema
 *     description: Este endpoint permite obtener el listado de todas las empresas en el sistema. Se requieren credenciales de usuario autenticado.
 *     tags: [Ticket Actions]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: integer
 *                 description: ID del ticket para el que se desean obtener los detalles. Este campo es obligatorio.
 *     responses:
 *       200:
 *         description: Listado de todos los detalles del ticket obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 details:
 *                   type: array
 *                   description: Detalles del ticket.
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
    '/getTicketDetail',
    [
        check('ticket_id', 'Debe ingresar un rol').not().isEmpty(),

        validarCampos,
        validarJWT
    ],

    getTicketDetail
);

/**
 * @openapi
 * /api/entities/getFailTypes:
 *   post:
 *     summary: Obtener todos las fallas en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas obtener la lista de todas las fallas en el sistema.
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: Lista de fallas obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 states:
 *                   type: array
 *                   description: Lista de fallas.
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
    '/getFailTypes',
    [
        validarJWT
    ],

    getFailTypes
);

/**
 * @openapi
 * /api/entities/getTicketTypes:
 *   post:
 *     summary: Obtener todos los tipos en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas obtener la lista de tipos en el sistema.
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: Lista de tipos obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticketTypes:
 *                   type: array
 *                   description: Lista de tipos.
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
    '/getTicketTypes',
    [
        validarJWT
    ],

    getTicketTypes
);

/**
 * @openapi
 * /api/entities/getFailTypes:
 *   post:
 *     summary: Obtener todos los tipos en el sistema
 *     description: Este endpoint permite a un usuario con credenciales válidas obtener la lista de tipos en el sistema.
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: Lista de tipos obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fileTypes:
 *                   type: array
 *                   description: Lista de tipos.
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
    '/getFailTypes',
    [
        validarJWT
    ],

    getFailTypes
);


module.exports = router;