const { response } = require('express');
const { getAllDBBrands, createDBBrand, updateDBBrand, deleteDBBrand } = require('../databases/queries_brands');
const { logger, loggerCSV } = require('../logger');
const { userType } = require('../helpers/constants');
const crypto = require('crypto');

const getAllBrands = async (req, res = response) => {

    let function_enter_time = new Date();
    logger.info(`==> getAllBrands.`)
    try {

        getAllDBBrands()
            .then(result => {
                logger.info(`<== getAllBrands`);
                loggerCSV.info(`getAllBrands, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de marcas obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getAllBrands => getAllDBBrands error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllDBBrands error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de marcas.'
        });
    }
}

const createBrand = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { nombre, direccion, telefono, mail } = req.body;

    logger.info(`createBrand nombre:${nombre} direccion:${direccion} telefono:${telefono} mail:${mail} `)

    const codigoMD5Brand = nombre => crypto.createHash('md5').update(nombre).digest("hex");

    try {

        createDBBrand(nombre, direccion, telefono, mail)
            .then(result => {
                res.status(200).json({
                    ok: true,
                    value: { brand: result },
                    msg: `empresa ${nombre} creado correctamente con id: ${result}`
                });

            })
            .catch(dataError => {
                logger.error(`createBrand => createDBBrand : params=> nombre=${nombre} direccion=${direccion} telefono=${telefono} mail=${mail} error=> ${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear el empresa. `
                });
            });

    } catch (error) {
        logger.error(`createBrand => createDBBrand : params=> nombre=${nombre} direccion=${direccion} telefono=${telefono} mail=${mail} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateBrand = async (req, res = response) => {

    const id = req.params.id;

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { nombre } = req.body;
    logger.info(`updateBrand. id:${id}  nombre:${nombre}`)
    try {

        updateDBBrand(id, nombre)
            .then(result => {
                console.log(`result: ${result}`);
                if (result == 1) {
                    res.status(200).json({
                        ok: true,
                        item: result,
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

const deleteBrand = async (req, res = response) => {

    const id = req.params.id;

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token
    logger.info(`deleteBrand id:${id}`)

    try {
        // AL ELIMINAR PUEDE QUE SEA NECESARIO CHEQUEAR PRIVILEGIOS DE USUARIO
        // DEBE VALIDAR SI EXISTE EL ELEMENTO

        deleteDBBrand(id)
            .then(result => {
                if (result == 1) {
                    res.status(200).json({
                        ok: true,
                        item: result,
                        msg: `Marca id: ${id} fue eliminado correctamente`
                    });
                }
                else {
                    //Ocurrio un error no manejado en sql.
                    return res.status(401).json({
                        ok: false,
                        msg: 'La marca no pudo ser eliminado del sistema.'
                    });
                }
            })
            .catch(dataError => {
                logger.error(`deleteBrand => deleteBrand: params=> id=${id} error=> ${dataError}`);
                // DESDE CAPA databases recibira un objeto error { code, message, stack }
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo eliminar la empresa '${id}' `
                });

            });
    } catch (error) {
        logger.error(`deleteBrand: params=> id=${id} error=> ${error}`);
        res.status(502).json({
            ok: false,
            error: error,
            msg: `No se pudo eliminar la empresa '${id}' `
        });
    }
}

module.exports = {
    getAllBrands,
    createBrand,
    updateBrand,
    deleteBrand
}
