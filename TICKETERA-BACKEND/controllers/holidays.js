const { response } = require('express');
const { createDBHoliday, deleteDBHoliday } = require('../databases/queries_holidays');
const { logger, loggerCSV } = require('../logger');
const { userType } = require('../helpers/constants');
const crypto = require('crypto');

const createHoliday = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token
    const { label } = req;
    const { fecha, descripcion } = req.body;

    logger.info(`createHoliday fecha:${fecha} descripcion:${descripcion}`)

    try {
        createDBHoliday(fecha, descripcion)
            .then(result => {
                res.status(200).json({
                    ok: true,
                    value: { holiday: result },
                    msg: `Feriado creado correctamente`
                });
            })
            .catch(dataError => {
                logger.error(`createHoliday => createDBHoliday : params=> fecha:${fecha} descripcion:${descripcion} error=> ${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear el feriado. `
                });
            });

    } catch (error) {
        logger.error(`createBrand => createHoliday : params=> error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const deleteHoliday = async (req, res = response) => {

    const fecha = req.params.fecha;

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token
    logger.info(`deleteHoliday fecha:${fecha}`)

    try {
        // AL ELIMINAR PUEDE QUE SEA NECESARIO CHEQUEAR PRIVILEGIOS DE USUARIO
        // DEBE VALIDAR SI EXISTE EL ELEMENTO

        deleteDBHoliday(fecha)
            .then(result => {
                if (result === 1) {
                    res.status(200).json({
                        ok: true,
                        value: result,
                        msg: `El feriado fue eliminado correctamente`
                    });
                }
                else {
                    //Ocurrio un error no manejado en sql.
                    return res.status(401).json({
                        ok: false,
                        msg: 'El feriado no pudo ser eliminado del sistema.'
                    });
                }
            })
            .catch(dataError => {
                logger.error(`deleteHoliday => deleteDBHoliday: params=> fecha=${fecha} error=> ${dataError}`);
                // DESDE CAPA databases recibira un objeto error { code, message, stack }
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo eliminar el feriado `
                });

            });
    } catch (error) {
        logger.error(`deleteHoliday: params=> fecha=${fecha} error=> ${error}`);
        res.status(502).json({
            ok: false,
            error: error,
            msg: `No se pudo eliminar el feriado`
        });
    }
}

module.exports = {
    createHoliday,
    deleteHoliday
}
