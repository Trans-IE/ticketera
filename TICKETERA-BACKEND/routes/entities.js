const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { createCompany, updateCompany, deleteCompany, getAllCompanies } = require('../controllers/companies');
const { createUser, getUserRol } = require('../controllers/users');
const { getProduct, createProduct, updateProduct, deleteProduct, getAllProducts, getProductsByBrand } = require('../controllers/products');
const { getAllContracts, createContract, updateContract, deleteContract, getContractsByCompany } = require('../controllers/contracts');
const { getAllBrands, createBrand, updateBrand, deleteBrand } = require('../controllers/brands');
const { getAllStates } = require('../controllers/states');
const { getAllPrioritys } = require('../controllers/prioritys');
const { getAllResponsibles } = require('../controllers/responsibles');
const { setPriority, setState, setResponsible, setHours, setAutoEvaluation, setNote } = require('../controllers/ticket_actions');

const router = Router();

router.post(
    '/getAllCompanies',
    [

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
    '/getProductsByBrand',
    [
        check('marca_id', 'Debe ingresar una marca').not().isEmpty(),

        validarCampos
    ],

    getProductsByBrand
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

router.put(
    '/updateProduct/:id',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('modelo', 'El modelo es obligatorio').not().isEmpty(),
        check('habilitado', 'El habilitado es obligatorio').not().isEmpty(),
        check('marca_id', 'El marca_id es obligatorio').not().isEmpty(),

        validarCampos,

    ],

    updateProduct
);

router.delete(
    '/deleteProduct/:id',
    [
        check('id', 'El label es obligatorio').not().isEmpty(),

        validarCampos,
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
    '/getContractsByCompany',
    [
        check('empresa_id', 'El nombre de la compañía es obligatorio').not().isEmpty(),
    ],

    getContractsByCompany
);

router.post(
    '/createContract',
    [
        check('empresa_id', 'empresa_id es obligatorio').not().isEmpty(),
        check('ejecutivo_id', 'ejecutivo_id es obligatorio').not().isEmpty(),
        check('sla_horas_respuesta', 'sla_horas_respuesta es obligatorio').not().isEmpty(),
        check('sla_horas_provisorio', 'sla_horas_provisorio es obligatorio').not().isEmpty(),
        check('sla_horas_definitivo', 'sla_horas_definitivo es obligatorio').not().isEmpty(),
        check('tipo', 'El tipo es obligatorio').not().isEmpty(),
        check('horas_paquete', 'horas_paquete es obligatorio').not().isEmpty(),
        check('notas', 'notas es obligatorio').not().isEmpty(),
        check('habilitado', 'habilitado es obligatorio').not().isEmpty(),
        check('soporte_onsite', 'soporte_onsite es obligatorio').not().isEmpty(),
        check('reemplazo_partes', 'reemplazo_partes es obligatorio').not().isEmpty(),
        check('fecha_inicio', 'fecha_inicio es obligatorio').not().isEmpty(),
        check('fecha_fin', 'fecha_fin es obligatorio').not().isEmpty(),

        validarCampos
    ],

    createContract
);

router.put(
    '/updateContract/:id',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),
        check('empresa_id', 'empresa_id es obligatorio').not().isEmpty(),
        check('ejecutivo_id', 'ejecutivo_id es obligatorio').not().isEmpty(),
        check('sla_horas_respuesta', 'sla_horas_respuesta es obligatorio').not().isEmpty(),
        check('sla_horas_provisorio', 'sla_horas_provisorio es obligatorio').not().isEmpty(),
        check('sla_horas_definitivo', 'sla_horas_definitivo es obligatorio').not().isEmpty(),
        check('tipo', 'tipo es obligatorio').not().isEmpty(),
        check('horas_paquete', 'horas_paquete es obligatorio').not().isEmpty(),
        check('notas', 'notas es obligatorio').not().isEmpty(),
        check('habilitado', 'habilitado es obligatorio').not().isEmpty(),
        check('soporte_onsite', 'soporte_onsite es obligatorio').not().isEmpty(),
        check('reemplazo_partes', 'reemplazo_partes es obligatorio').not().isEmpty(),

        validarCampos
    ],

    updateContract
);

router.delete(
    '/deleteContract/:id',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),

        validarCampos,
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

router.put(
    '/updateBrand/:id',
    [
        check('id', 'El id es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),

        validarCampos,

    ],

    updateBrand
);

router.delete(
    '/deleteBrand/:id',
    [
        check('id', 'El nombre es obligatorio').not().isEmpty(),

        validarCampos,
    ],

    deleteBrand
);

router.post(
    '/getAllResponsibles',
    [

    ],

    getAllResponsibles
);

router.post(
    '/getAllPrioritys',
    [

    ],

    getAllPrioritys
);

router.post(
    '/getAllStates',
    [

    ],

    getAllStates
);

router.post(
    '/setResponsible',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('usuario_id', 'El id es obligatorio').not().isEmpty(),
        check('responsable_id', 'El responsable_id es obligatorio').not().isEmpty(),
    ],

    setResponsible
);

router.post(
    '/setPriority',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('usuario_id', 'El id es obligatorio').not().isEmpty(),
        check('prioridad', 'La prioridad es obligatoria').not().isEmpty(),
    ],

    setPriority
);

router.post(
    '/setState',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('usuario_id', 'El id es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio').not().isEmpty(),
    ],

    setState
);

router.post(
    '/setNote',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('usuario_id', 'El id es obligatorio').not().isEmpty(),
        check('notas', 'Las notas son obligatorias').not().isEmpty(),
    ],

    setNote
);

router.post(
    '/setAutoEvaluation',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('usuario_id', 'El id es obligatorio').not().isEmpty(),
        check('auto_evaluacion', 'La autoevaluacion es obligatoria').not().isEmpty(),
    ],

    setAutoEvaluation
);

router.post(
    '/setHours',
    [
        check('ticket_id', 'El ticket_id es obligatorio').not().isEmpty(),
        check('usuario_id', 'El id es obligatorio').not().isEmpty(),
        check('horas', 'Las horas son obligatoria').not().isEmpty(),

    ],

    setHours
);

module.exports = router;