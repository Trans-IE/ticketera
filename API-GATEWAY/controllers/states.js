const { response } = require('express');
const { logger, loggerCSV } = require('../logger');
const { generarJWT } = require('../helpers/jwt');
const { fetchConToken, fetchSinToken } = require('../helpers/fetch');
const { getUserRol } = require('../helpers/validators');
const { UserRol } = require('../helpers/constants');

const getAllStatesByTicketId = async (req, res = response) => {
    const { label: username } = req;
    const { ticket_id } = req.body;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC},${UserRol.ClienteADM},${UserRol.ClienteUSR}`;
    logger.info(`==> getAllStatesByTicketId - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getAllStatesByTicketId";

    try {
        logger.info(`getAllStatesByTicketId `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { username, ticket_id }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== getAllStatesByTicketId - username:${username}`);
                loggerCSV.info(`getAllStatesByTicketId,${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Estados obtenidas correctamente.'
                });
            } else {
                logger.error(`getAllStatesByTicketId : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion getAllStatesByTicketId`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`getAllStatesByTicketId : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getAllStates = async (req, res = response) => {
    const { label: username } = req;
    const { ticket_id } = req.body;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC},${UserRol.ClienteADM},${UserRol.ClienteUSR}`;
    logger.info(`==> getAllStates - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getAllStates";

    try {
        logger.info(`getAllStates `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { username }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== getAllStates - username:${username}`);
                loggerCSV.info(`getAllStates,${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Estados obtenidas correctamente.'
                });
            } else {
                logger.error(`getAllStates : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion getAllStates`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`getAllStatesByTicketId : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}
module.exports = {
    getAllStatesByTicketId,
    getAllStates
}