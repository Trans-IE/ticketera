const { response } = require('express');
const { getAllDBPrioritys, createDBPriority } = require('../databases/queries_prioritys');
const { logger, loggerCSV } = require('../logger');
const { userType } = require('../helpers/constants');
const crypto = require('crypto');

const getAllPrioritys = async (req, res = response) => {

    let function_enter_time = new Date();
    logger.info(`==> getAllPrioritys.`)
    try {
        getAllDBPrioritys()
            .then(result => {
                logger.info(`<== getAllPrioritys`);
                loggerCSV.info(`getAllPrioritys, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de prioridades obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getAllPrioritys => getAllDBPrioritys error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllDBPrioritys error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de prioridades.'
        });
    }
}

module.exports = {
    getAllPrioritys
}
