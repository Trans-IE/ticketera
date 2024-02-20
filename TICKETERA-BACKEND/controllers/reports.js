const { response } = require('express');
const { getAllDBSummarizeHoursByTechnician, getAllDBHourDetailByTechnician } = require('../databases/queries_reports');
const { logger, loggerCSV } = require('../logger');
const { userType } = require('../helpers/constants');
const crypto = require('crypto');

const getHourDetailByTechnician = async (req, res = response) => {
    const { fechaIni, fechaFin, idUsuario, idEmpresa, proyecto } = req.body;
    let function_enter_time = new Date();

    logger.info(`==> getHourDetailByTechnician. fechaIni:${fechaIni} fechaFin:${fechaFin} idUsuario:${idUsuario} idEmpresa:${idEmpresa} proyecto:${proyecto}`)
    try {
        getAllDBHourDetailByTechnician(fechaIni, fechaFin, idUsuario, idEmpresa, proyecto)
            .then(result => {
                logger.info(`<== getHourDetailByTechnician`);
                loggerCSV.info(`getHourDetailByTechnician, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Resumen obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getHourDetailByTechnician => getAllDBHourDetailByTechnician error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getHourDetailByTechnician error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo el resumido de horas por técnico.'
        });
    }
}
const getSummarizeHoursByTechnician = async (req, res = response) => {
    const { fechaIni, fechaFin, idUsuario, idEmpresa } = req.body;

    let function_enter_time = new Date();
    logger.info(`==> getSummarizeHoursByTechnician.`)
    try {
        getAllDBSummarizeHoursByTechnician(fechaIni, fechaFin, idUsuario, idEmpresa)
            .then(result => {
                logger.info(`<== getSummarizeHoursByTechnician`);
                loggerCSV.info(`getSummarizeHoursByTechnician, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Resumen obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getSummarizeHoursByTechnician => getAllDBSummarizeHoursByTechnician error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getSummarizeHoursByTechnician error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo el resumido de horas por técnico.'
        });
    }
}

module.exports = {
    getSummarizeHoursByTechnician,
    getHourDetailByTechnician
}
