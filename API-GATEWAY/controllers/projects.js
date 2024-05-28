const { response } = require('express');
const { logger, loggerCSV } = require('../logger');
const { generarJWT } = require('../helpers/jwt');
const { fetchConToken, fetchSinToken } = require('../helpers/fetch');
const { getUserRol } = require('../helpers/validators');
const { UserRol } = require('../helpers/constants');

const getProjectByCompany = async (req, res = response) => {
    const { label: username } = req;
    const { company } = req.body;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC},${UserRol.ClienteADM},${UserRol.ClienteUSR}`;
    logger.info(`==> getProjectByCompany - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getProjectByCompany";

    try {
        logger.info(`getProjectByCompany company:${company}`)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { username, company }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== getProjectByCompany - username:${username}`);
                loggerCSV.info(`getProjectByCompany,${(new Date() - function_enter_time) / 1000}`)

                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Listado de proyectos obtenido correctamente.'
                });
            } else {
                logger.error(`getProjectByCompany : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion getProjectByCompany`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`getProjectByCompany : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getProjectTreeByTicketID = async (req, res = response) => {
    const { label: username } = req;
    const { ticket_id } = req.body;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC},${UserRol.ClienteADM},${UserRol.ClienteUSR}`;
    logger.info(`==> getProjectTreeByTicketID - username:${username} - ticket_id:${ticket_id}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getProjectTreeByTicketID";

    try {
        logger.info(`getProjectTreeByTicketID ticket_id:${ticket_id}`)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { username, ticket_id }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`getProjectTreeByTicketID ticket_id:${ticket_id}`)
                loggerCSV.info(`getProjectTreeByTicketID,${(new Date() - function_enter_time) / 1000}`)

                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Listado de arbol de proyecto obtenido correctamente.'
                });
            } else {
                logger.error(`getProjectTreeByTicketID : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion getProjectTreeByTicketID`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`getProjectTreeByTicketID : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

module.exports = {
    getProjectByCompany,
    getProjectTreeByTicketID
}