const { response } = require('express');
const { getDBProduct, getDBProductByBrand, getAllDBProducts, createDBProduct, updateDBProduct, deleteDBProduct, getDBProductByBrandAndContract } = require('../databases/queries_products');
const { logger, loggerCSV } = require('../logger');
const { userType } = require('../helpers/constants');
const crypto = require('crypto');

const getAllProducts = async (req, res = response) => {
    let function_enter_time = new Date();
    logger.info(`getAllProducts.`)
    try {
        getAllDBProducts()
            .then(result => {
                logger.info(`<== getAllProducts`);
                loggerCSV.info(`getAllProducts, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de productos obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getAllDBProducts => getAllDBProducts : error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllDBProducts : params=> error=> ${error}`);
        res.status(500).json({
            ok: false,
            value: [],
            msg: 'Error obteniendo listado de productos.'
        });
    }
}

const getProduct = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token.
    const { label } = req;
    const { id } = req.body;

    let function_enter_time = new Date();
    logger.info(`getProduct. id:${id}`)
    try {

        getDBProduct(id)
            .then(result => {
                logger.info(`<== getProduct`);
                loggerCSV.info(`getProduct, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: { product: result },
                    msg: 'Listado de productos obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getProduct => getProduct : params=> id=${id} error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getDBProduct : params=> id=${id} error=> ${error}`);
        res.status(500).json({
            ok: false,
            value: [],
            msg: 'Error obteniendo listado de productos.'
        });
    }
}

const getProductsByBrandAndContract = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token.
    const { marca_id, contract } = req.body;

    let function_enter_time = new Date();
    logger.info(`getProductsByBrandAndContract. marca_id:${marca_id} contract: ${contract}`)
    try {

        getDBProductByBrandAndContract(marca_id, contract)
            .then(result => {
                logger.info(`<== getProductsByBrandAndContract`);
                loggerCSV.info(`getProductsByBrandAndContract, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de productos obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getProductsByBrandAndContract => getDBProductByBrandAndContract : params=> marca_id=> ${marca_id} contract=> ${contract} error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getDBProductByBrandAndContract : params=> marca_id=> ${marca_id} contract=> ${contract} error=> ${error}`);
        res.status(500).json({
            ok: false,
            value: [],
            msg: 'Error obteniendo listado de productos.'
        });
    }
}

const getProductsByBrand = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token.
    const { marca_id } = req.body;

    let function_enter_time = new Date();
    logger.info(`getProductByBrand. marca_id:${marca_id}`)
    try {

        getDBProductByBrand(marca_id)
            .then(result => {
                logger.info(`<== getDBProductByBrand`);
                loggerCSV.info(`getDBProductByBrand, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de productos obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getDBProductByBrand => getDBProductByBrand : params=> marca_id=> ${marca_id} error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getDBProductByBrand : params=> marca_id=> ${marca_id} error=> ${error}`);
        res.status(500).json({
            ok: false,
            value: [],
            msg: 'Error obteniendo listado de productos.'
        });
    }
}

const createProduct = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token
    const { label } = req;

    const { nombre, modelo, habilitado, marca_id } = req.body;

    logger.info(`createProduct nombre:${nombre} modelo:${modelo} habilitado:${habilitado} marca_id:${marca_id} `)

    try {

        createDBProduct(nombre, modelo, habilitado, marca_id)
            .then(result => {
                res.status(200).json({
                    ok: true,
                    value: { product: result },
                    msg: `Producto ${nombre} creado correctamente con id: ${nombre}`
                });
            })
            .catch(dataError => {
                logger.error(`createProduct => createDBProduct : params=> nombre:${nombre} modelo:${modelo} habilitado:${habilitado} marca_id:${marca_id} error=> ${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear el producto. `
                });
            });

    } catch (error) {
        logger.error(`createBrand => createDBProduct : params=> nombre:${nombre} modelo:${modelo} habilitado:${habilitado} marca_id:${marca_id} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateProduct = async (req, res = response) => {

    const id = req.params.id;

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { nombre, modelo, habilitado, marca_id } = req.body;
    logger.info(`updateBrand. id:${id} nombre:${nombre} modelo:${modelo} habilitado:${habilitado} marca_id:${marca_id}`)
    try {

        updateDBProduct(id, nombre, modelo, habilitado, marca_id)
            .then(result => {
                if (result == 1) {
                    res.status(200).json({
                        ok: true,
                        value: result,
                        msg: `La marca '${nombre}' fue actualizado correctamente.`
                    });
                }
                else {
                    return res.status(401).json({
                        ok: false,
                        msg: `La marca no pudo ser actualizada en el sistema.-`
                    });
                }

            })
            .catch(dataError => {
                logger.error(`updateBrand  => updateDBBrand : params=> id=${id} nombre=${nombre}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo actualizar la marca '${nombre}' `
                });
            });

    } catch (error) {
        logger.error(`updateCompany : params=> id=${id} nombre=${nombre} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Hable con el administrador'
        });
    }
}

const deleteProduct = async (req, res = response) => {

    const id = req.params.id;

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token
    logger.info(`deleteProduct id:${id}`)

    try {
        // AL ELIMINAR PUEDE QUE SEA NECESARIO CHEQUEAR PRIVILEGIOS DE USUARIO
        // DEBE VALIDAR SI EXISTE EL ELEMENTO

        deleteDBProduct(id)
            .then(result => {
                if (result === 1) {
                    res.status(200).json({
                        ok: true,
                        value: result,
                        msg: `Producto id: ${id} fue eliminado correctamente`
                    });
                }
                else {
                    //Ocurrio un error no manejado en sql.
                    return res.status(401).json({
                        ok: false,
                        msg: 'El producto no pudo ser eliminado del sistema.'
                    });
                }
            })
            .catch(dataError => {
                logger.error(`deleteProduct => deleteDBProduct: params=> id=${id} error=> ${dataError}`);
                // DESDE CAPA databases recibira un objeto error { code, message, stack }
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo eliminar el producto '${id}' `
                });

            });
    } catch (error) {
        logger.error(`deleteProduct: params=> id=${id} error=> ${error}`);
        res.status(502).json({
            ok: false,
            error: error,
            msg: `No se pudo eliminar el producto '${id}' `
        });
    }
}

module.exports = {
    getProduct,
    getProductsByBrand,
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByBrandAndContract
}
