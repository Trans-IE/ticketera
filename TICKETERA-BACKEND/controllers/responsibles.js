const { response } = require('express');
const { getAllDBResponsibles, createDBResponsible } = require('../databases/queries_responsibles');
const { logger, loggerCSV } = require('../logger');
const { userType } = require('../helpers/constants');
const crypto = require('crypto');

const getAllResponsibles = async (req, res = response) => {

    let function_enter_time = new Date();
    logger.info(`==> getAllResponsibles.`)
    try {
        getAllDBResponsibles()
            .then(result => {
                logger.info(`<== getAllResponsibles`);
                loggerCSV.info(`getAllResponsibles, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de responsables obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getAllResponsibles => getAllDBResponsibles error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllDBResponsibles error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de responsables.'
        });
    }
}


module.exports = {
    getAllResponsibles
}
