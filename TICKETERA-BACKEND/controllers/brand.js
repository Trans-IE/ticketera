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
    const { label } = req;

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

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { label } = req;

    const { id, nombre } = req.body;
    logger.info(`updateBrand id:${id} nombre:${nombre} `)

    try {
        updateDBBrand(id, nombre)
            .then(result => {
                res.status(200).json({
                    ok: true,
                    item: { product: result },
                    msg: `Marca '${nombre}' fue actualizada correctamente.`
                });
            })
            .catch(dataError => {
                logger.error(`updateBrand => updateDBProduct : params=> id:${id} nombre:${nombre}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo actualizar el producto '${nombre}' `
                });
            });

    } catch (error) {
        logger.error(`updateBrand : params=> id:${id} nombre:${nombre} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Hable con el administrador'
        });
    }

}

const deleteBrand = async (req, res = response) => {

    const { id } = req.body;

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token
    logger.info(`deleteBrand id:${id}`)

    try {
        // AL ELIMINAR PUEDE QUE SEA NECESARIO CHEQUEAR PRIVILEGIOS DE USUARIO
        // DEBE VALIDAR SI EXISTE EL ELEMENTO

        deleteDBBrand(id)
            .then(id_result => {

                // LA FUNCION FINALIZO SU EJECUCION 
                // let id_result = result.rows[0].f_r2_vdn_delete;

                if (id_result > 0) {
                    // http status 200: elemento actualizado correctamente
                    // retorno objeto actualizado
                    let objBrand = new Object();
                    objBrand.deleted_id = id;

                    res.status(200).json({
                        ok: true,
                        item: objBrand,
                        msg: `Marca id: ${id} fue eliminado correctamente`
                    });
                }
                else if (id == -1) {
                    // la empresa NO EXISTE: retorno msg "empresa no pudo ser encontrado". retorno HTTP 404 recurso no encontrado.
                    return res.status(404).json({
                        ok: false,
                        msg: `Marca id: ${id} no pudo ser encontrado en el sistema.`
                    });
                }
                else {
                    // ocurrio otro error no manejado en sql.
                    return res.status(401).json({
                        ok: false,
                        msg: 'La marca no pudo ser eliminado del sistema.'
                    });
                }
            })
            .catch(dataError => {
                logger.error(`deleteBrand => deleteDBBrand: params=> id=${id} error=> ${dataError}`);
                // DESDE CAPA databases recibira un objeto error { code, message, stack }
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo eliminar la marca '${id}' `
                });

            });
    } catch (error) {
        logger.error(`deleteBrand: params=> id=${id} error=> ${error}`);
        res.status(502).json({
            ok: false,
            error: error,
            msg: `No se pudo eliminar la marca '${id}' `
        });
    }
}

module.exports = {
    getAllBrands,
    createBrand,
    updateBrand,
    deleteBrand
}
