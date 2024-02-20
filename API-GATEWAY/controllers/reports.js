const { response } = require('express');
const { logger, loggerCSV } = require('../logger');
const { generarJWT } = require('../helpers/jwt');
const { fetchConToken, fetchSinToken } = require('../helpers/fetch');
const { getUserRol } = require('../helpers/validators');
const { UserRol } = require('../helpers/constants');

const getHourDetailByTechnician = async (req, res = response) => {
    const { label: username } = req;
    const { fechaIni, fechaFin, idUsuario, idEmpresa, proyecto } = req.body;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}`;

    logger.info(`==> getHourDetailByTechnician - username:${username} fechaIni:${fechaIni} fechaFin:${fechaFin} idUsuario:${idUsuario} idEmpresa:${idEmpresa} proyecto:${proyecto}`);

    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getHourDetailByTechnician";

    try {
        logger.info(`getHourDetailByTechnician `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { fechaIni, fechaFin, idUsuario, idEmpresa, proyecto }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== getHourDetailByTechnician - username:${username}`);
                loggerCSV.info(`getHourDetailByTechnician,${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Reporte obtenido correctamente.'
                });
            } else {
                logger.error(`getHourDetailByTechnician : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion getHourDetailByTechnician`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`getHourDetailByTechnician : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const getSummarizeHoursByTechnician = async (req, res = response) => {
    const { label: username } = req;
    const { fechaIni, fechaFin, idUsuario, idEmpresa } = req.body;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}`;

    logger.info(`==> getSummarizeHoursByTechnician - username:${username} fechaIni:${fechaIni} fechaFin:${fechaFin} idUsuario:${idUsuario} idEmpresa:${idEmpresa}`);

    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getSummarizeHoursByTechnician";

    try {
        logger.info(`getSummarizeHoursByTechnician `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { fechaIni, fechaFin, idUsuario, idEmpresa }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== getSummarizeHoursByTechnician - username:${username}`);
                loggerCSV.info(`getSummarizeHoursByTechnician,${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Reporte obtenido correctamente.'
                });
            } else {
                logger.error(`getSummarizeHoursByTechnician : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion getSummarizeHoursByTechnician`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`getSummarizeHoursByTechnician : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }

}
module.exports = {
    getSummarizeHoursByTechnician,
    getHourDetailByTechnician
}