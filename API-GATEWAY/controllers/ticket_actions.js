const { response } = require('express');
const { logger, loggerCSV } = require('../logger');
const { generarJWT } = require('../helpers/jwt');
const { fetchConToken, fetchSinToken } = require('../helpers/fetch');
const { getUserRol } = require('../helpers/validators');
const { UserRol } = require('../helpers/constants');

const setState = async (req, res = response) => {
    const { label: username } = req;
    const { ticket_id, usuario_id, estado } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM}`;
    logger.info(`==> setState - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/setState";

    try {
        logger.info(`setState ticket_id:${ticket_id} usuario_id:${usuario_id} estado:${estado}  `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { ticket_id, usuario_id, estado }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== setState - username:${username}`);
                loggerCSV.info(`setState,${(new Date() - function_enter_time) / 1000}`)
                const { state } = body.value;
                res.status(200).json({
                    ok: true,
                    value: { state },
                    msg: 'Estado creado correctamente.'
                });
            } else {
                logger.error(`setState : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion setState`)
            res.status(500).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`setState : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const setPriority = async (req, res = response) => {
    const { label: username } = req;
    const { ticket_id, usuario_id, prioridad } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM}`;
    logger.info(`==> setPriority - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/setPriority";

    try {
        logger.info(`setPriority ticket_id:${ticket_id} usuario_id:${usuario_id} prioridad:${prioridad} `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { ticket_id, usuario_id, prioridad }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== setPriority - username:${username}`);
                loggerCSV.info(`setPriority,${(new Date() - function_enter_time) / 1000}`)
                const { priority } = body.value;
                res.status(200).json({
                    ok: true,
                    value: { priority },
                    msg: 'Prioridad creada correctamente.'
                });
            } else {
                logger.error(`setPriority : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion setPriority`)
            res.status(500).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`setPriority : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const setResponsible = async (req, res = response) => {
    const { label: username } = req;
    const { ticket_id, usuario_id, responsable_id } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM}`;
    logger.info(`==> setResponsible - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/setResponsible";

    try {
        logger.info(`setResponsible ticket_id:${ticket_id} usuario_id:${usuario_id} responsable_id:${responsable_id} `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { ticket_id, usuario_id, responsable_id }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== setResponsible - username:${username}`);
                loggerCSV.info(`setResponsible,${(new Date() - function_enter_time) / 1000}`)
                const { responsible } = body.value;
                res.status(200).json({
                    ok: true,
                    value: { responsible },
                    msg: 'Prioridad creada correctamente.'
                });
            } else {
                logger.error(`setResponsible : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion setPriority`)
            res.status(500).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`setResponsible : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const setAutoEvaluation = async (req, res = response) => {
    const { label: username } = req;
    const { ticket_id, usuario_id, auto_evaluacion } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM}`;
    logger.info(`==> setAutoEvaluation - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/setAutoEvaluation";

    try {
        logger.info(`setAutoEvaluation ticket_id:${ticket_id} usuario_id:${usuario_id} auto_evaluacion:${auto_evaluacion} `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { ticket_id, usuario_id, auto_evaluacion }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== setAutoEvaluation - username:${username}`);
                loggerCSV.info(`setAutoEvaluation,${(new Date() - function_enter_time) / 1000}`)
                const { autoEvaluation } = body.value;
                res.status(200).json({
                    ok: true,
                    value: { autoEvaluation },
                    msg: 'Autoevaluación creada correctamente.'
                });
            } else {
                logger.error(`setAutoEvaluation : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion setAutoEvaluation`)
            res.status(500).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`setAutoEvaluation : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const setNote = async (req, res = response) => {
    const { label: username } = req;
    const { ticket_id, usuario_id, notas } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM}`;
    logger.info(`==> setNota - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/setNote";

    try {
        logger.info(`setNota ticket_id:${ticket_id} usuario_id:${usuario_id} nota:${notas} `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { ticket_id, usuario_id, notas }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== setNota - username:${username}`);
                loggerCSV.info(`setNota,${(new Date() - function_enter_time) / 1000}`)
                const { note } = body.value;
                res.status(200).json({
                    ok: true,
                    value: { note },
                    msg: 'Nota creada correctamente.'
                });
            } else {
                logger.error(`setNota : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion setNota`)
            res.status(500).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`setNota : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const setHours = async (req, res = response) => {
    const { label: username } = req;
    const { ticket_id, usuario_id, horas } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM}`;
    logger.info(`==> setHours - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/setHours";

    try {
        logger.info(`setHours ticket_id:${ticket_id} usuario_id:${usuario_id} horas:${horas} `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { ticket_id, usuario_id, horas }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== setHours - username:${username}`);
                loggerCSV.info(`setHours,${(new Date() - function_enter_time) / 1000}`)
                const { hours } = body.value;
                res.status(200).json({
                    ok: true,
                    value: { hours },
                    msg: 'Hora creada correctamente.'
                });
            } else {
                logger.error(`setHours : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion setHours`)
            res.status(500).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`setHours : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

module.exports = {
    setState,
    setPriority,
    setResponsible,
    setAutoEvaluation,
    setNote,
    setHours
}