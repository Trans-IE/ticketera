const { response } = require('express');
const { getDBProjectsByCompany, getDBProjectTreeByTicketID } = require('../databases/queries_projects');
const { getDBUserIdByUser, getDBTypeUserByUser } = require('../databases/queries_users');
const { getDBCompanyByUser } = require('../databases/queries_companies');
const { logger, loggerCSV } = require('../logger');
const { userType } = require('../helpers/constants');
const crypto = require('crypto');

const getProjectsByCompany = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token.
    const { username, company } = req.body;

    let function_enter_time = new Date();
    logger.info(`getProjectsByCompany. username:${username}  company:${company}`)
    try {
        getDBProjectsByCompany(username, company)
            .then(result => {
                logger.info(`<== getProjectsByCompany`);
                loggerCSV.info(`getProjectsByCompany, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de proyectos obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getProjectsByCompany => getDBProjectsByCompany error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getProjectsByCompany : params=> company=> ${company} error=> ${error}`);
        res.status(500).json({
            ok: false,
            value: [],
            msg: 'Error obteniendo listado de proyectos.'
        });
    }
}
const getProjectTreeByTicketID = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token.
    const { ticket_id } = req.body;

    let function_enter_time = new Date();
    logger.info(`getProjectTreeByTicketID . ticketid:${ticket_id} `)
    try {

        getDBProjectTreeByTicketID(ticket_id)
            .then(result => {
                logger.info(`<== getProjectTreeByTicketID`);
                loggerCSV.info(`getProjectTreeByTicketID, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de arbol de proyectos obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getProjectTreeByTicketID => getDBProjectTreeByTicketID error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getProjectTreeByTicketID : params=> company=> ${company} error=> ${error}`);
        res.status(500).json({
            ok: false,
            value: [],
            msg: 'Error obteniendo arbol de tickets relacionados.'
        });
    }
}

module.exports = {
    getProjectsByCompany,
    getProjectTreeByTicketID
}
