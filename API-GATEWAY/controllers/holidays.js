const { response } = require('express');
const { logger, loggerCSV } = require('../logger');
const { generarJWT } = require('../helpers/jwt');
const { fetchConToken, fetchSinToken } = require('../helpers/fetch');
const { getUserRol } = require('../helpers/validators');
const { UserRol } = require('../helpers/constants');

const createHoliday = async (req, res = response) => {
    const { label: username } = req;
    const { fecha, descripcion } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}`;
    logger.info(`==> createHoliday - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/createHoliday";

    try {
        logger.info(`createHoliday fecha:${fecha} descripcion:${descripcion}`)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { fecha, descripcion }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== createHoliday - username:${username}`);
                loggerCSV.info(`createHoliday,${(new Date() - function_enter_time) / 1000}`)
                const { holiday } = body.value;
                res.status(200).json({
                    ok: true,
                    value: { holiday },
                    msg: 'Feriado creado correctamente.'
                });
            } else {
                logger.error(`createHoliday : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion createHoliday`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`createHoliday : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const deleteHoliday = async (req, res = response) => {
    const { label: username } = req;
    const fecha = req.params.fecha;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}`;
    logger.info(`==> deleteHoliday - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + `/entities/deleteHoliday/${fecha}`;

    try {
        logger.info(`deleteHoliday `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { fecha }, 'DELETE');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== deleteHoliday - username:${username}`);
                loggerCSV.info(`deleteHoliday,${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Se eliminó el feriado correctamente.'
                });
            } else {
                logger.error(`deleteHoliday : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion deleteHoliday`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`deleteHoliday : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }

}
module.exports = {
    createHoliday,
    deleteHoliday
}