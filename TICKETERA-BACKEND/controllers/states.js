const { response } = require('express');
const { getAllDBStates, createDBState } = require('../databases/queries_states');
const { logger, loggerCSV } = require('../logger');
const { userType } = require('../helpers/constants');
const crypto = require('crypto');

const getAllStates = async (req, res = response) => {

    let function_enter_time = new Date();
    logger.info(`==> getAllStates.`)
    try {
        getAllDBStates()
            .then(result => {
                logger.info(`<== getAllStates`);
                loggerCSV.info(`getAllStates, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de estados obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getAllStates => getAllDBStates error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllDBStates error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de estados.'
        });
    }
}

module.exports = {
    getAllStates
}
