const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { createCompany, updateCompany, deleteCompany, getAllCompanies } = require('../controllers/companies');
const { createUser, getUserRol } = require('../controllers/users');
const { getProduct, createProduct, updateProduct, deleteProduct, getAllProducts } = require('../controllers/products');
const { getAllContracts, createContract, updateContract, deleteContract } = require('../controllers/contracts');
const { getAllBrands, createBrand, updateBrand, deleteBrand } = require('../controllers/brand');

const router = Router();

router.post(
    '/getAllCompanies',
    [
        check('label', 'El label es obligatorio').not().isEmpty(),

        validarCampos
    ],

    getAllCompanies
);

router.post(
    '/createCompany',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('mail', 'El mail es obligatorio').not().isEmpty(),

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
        check('habilitado', 'El campo habilitado es obligatorio').not().isEmpty(),

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

router.post(
    '/getUserRol',
    [
        check('label', 'El label es obligatorio').not().isEmpty(),

        validarCampos
    ],

    getUserRol
);

router.post(
    '/getProduct',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),

        validarCampos
    ],

    getProduct
);

router.post(
    '/getAllProducts',
    [
    ],

    getAllProducts
);

router.post(
    '/createProduct',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('modelo', 'El modelo es obligatorio').not().isEmpty(),
        check('habilitado', 'Habilitado es obligatorio').not().isEmpty(),
        check('marca_id', 'Marca id es obligatorio').not().isEmpty(),

        validarCampos
    ],

    createProduct
);

router.post(
    '/updateProduct',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('modelo', 'El modelo es obligatorio').not().isEmpty(),

        validarCampos
    ],

    updateProduct
);

router.post(
    '/deleteProduct',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),

        validarCampos
    ],

    deleteProduct
);

router.post(
    '/getAllContracts',
    [

    ],

    getAllContracts
);

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

        validarCampos
    ],

    createContract
);

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

        validarCampos
    ],

    updateContract
);

router.post(
    '/deleteContract',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),

        validarCampos
    ],

    deleteContract
);

router.post(
    '/getAllBrands',
    [
    ],

    getAllBrands
);

router.post(
    '/createBrand',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),

        validarCampos,
    ],

    createBrand
);

router.post(
    '/updateBrand',
    [
        check('id', 'El nombre es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),

        validarCampos,
    ],

    updateBrand
);

router.post(
    '/deleteBrand',
    [
        check('id', 'El nombre es obligatorio').not().isEmpty(),

        validarCampos,
    ],

    deleteBrand
);

module.exports = router;