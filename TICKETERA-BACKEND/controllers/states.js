const { response } = require('express');
const { getAllDBStatesByTicketId, getAllDBStates } = require('../databases/queries_states');
const { logger, loggerCSV } = require('../logger');
const { userType } = require('../helpers/constants');
const crypto = require('crypto');

const getAllStatesByTicketId = async (req, res = response) => {
    const { ticket_id } = req.body;

    let function_enter_time = new Date();
    logger.info(`==> getAllStatesByTicketId.`)
    try {
        getAllDBStatesByTicketId(ticket_id)
            .then(result => {
                logger.info(`<== getAllStatesByTicketId`);
                loggerCSV.info(`getAllStatesByTicketId, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de estados obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getAllStatesByTicketId => getAllDBStatesByTicketId error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllStatesByTicketId error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de estados.'
        });
    }
}

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
        logger.error(`getAllStates error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de estados.'
        });
    }
}

module.exports = {
    getAllStatesByTicketId,
    getAllStates
}
