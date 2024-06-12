const { response } = require('express');
const { logger, loggerCSV } = require('../logger');
const { generarJWT } = require('../helpers/jwt');
const { fetchConToken, fetchSinToken } = require('../helpers/fetch');
const { getUserRol } = require('../helpers/validators');
const { UserRol } = require('../helpers/constants');

const setState = async (req, res = response) => {
    const { label: username } = req;
    const { ticket_id, estado } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}`;
    logger.info(`==> setState - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/setState";

    try {
        logger.info(`setState ticket_id:${ticket_id} username:${username} estado:${estado}  `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { ticket_id, estado, username }, 'POST');
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
            res.status(401).json({
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
    const { ticket_id, prioridad } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}`;
    logger.info(`==> setPriority - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/setPriority";

    try {
        logger.info(`setPriority ticket_id:${ticket_id} prioridad:${prioridad} `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { ticket_id, prioridad, username }, 'POST');
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
            res.status(401).json({
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
    const { ticket_id, responsable_id } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}`;
    logger.info(`==> setResponsible - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/setResponsible";

    try {
        logger.info(`setResponsible ticket_id:${ticket_id} responsable_id:${responsable_id} username:${username}`)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { ticket_id, responsable_id, username }, 'POST');
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
                    msg: 'Responsable asignado correctamente.'
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
            res.status(401).json({
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
    const { ticket_id, auto_evaluacion } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}`;
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/setAutoEvaluation";

    try {
        logger.info(`setAutoEvaluation ticket_id:${ticket_id} auto_evaluacion:${auto_evaluacion} username:${username}`)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { ticket_id, auto_evaluacion, username }, 'POST');
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
            res.status(401).json({
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
    const { ticket_id, notas } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC},${UserRol.ClienteADM},${UserRol.ClienteUSR}`;
    logger.info(`==> setNota - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/setNote";

    try {
        logger.info(`setNota ticket_id:${ticket_id} nota:${notas} username:${username}`)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { ticket_id, notas, username }, 'POST');
            console.log(resp);
            const body = await resp.json();
            logger.info(`<== setNota - username:${username}`);
            loggerCSV.info(`setNota,${(new Date() - function_enter_time) / 1000}`)
            res.status(200).json({ ...body })
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion setNota`)
            res.status(401).json({
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

const setProjectedHours = async (req, res = response) => {
    const { label: username } = req;
    const { ticket_id, fecha_inicio, fecha_fin, comentario, isUpdate } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}`;
    logger.info(`==> setProjectedHours - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/setProjectedHours";

    try {
        logger.info(`setProjectedHours ticket_id:${ticket_id} fecha_inicio:${fecha_inicio} fecha_fin:${fecha_fin} comentario:${comentario} isUpdate:${isUpdate} username:${username}`)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { ticket_id, fecha_inicio, fecha_fin, comentario, isUpdate, username }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== setProjectedHours - username:${username}`);
                loggerCSV.info(`setProjectedHours,${(new Date() - function_enter_time) / 1000}`)
                const { result } = body.value;
                res.status(200).json({
                    ok: true,
                    value: { result },
                    msg: 'Hora proyectada creada correctamente.'
                });
            } else {
                logger.error(`setProjectedHours : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion setProjectedHours`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`setProjectedHours : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const setHours = async (req, res = response) => {
    const { label: username } = req;
    const { ticket_id, horas, fecha_accion_hs } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}`;
    logger.info(`==> setHours - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/setHours";

    try {
        logger.info(`setHours ticket_id:${ticket_id} horas:${horas} fecha_accion_hs:${fecha_accion_hs} username:${username}`)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { ticket_id, horas, fecha_accion_hs, username }, 'POST');
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
            res.status(401).json({
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

const setHoursByList = async (req, res = response) => {
    const { label: username } = req;
    const { listHours } = req.body; // Modificado para acceder a listHours en lugar de extraer ticket_id, horas y fecha_accion_hs directamente
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}`;
    logger.info(`==> setHoursByList - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/setHoursByList";

    try {
        logger.info(`setHoursByList listHours:${JSON.stringify(listHours)} username:${username}`) // Modificado para loggear la lista de horas trabajadas

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { listHours, username }, 'POST'); // Modificado para enviar listHours en lugar de ticket_id, horas y fecha_accion_hs
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== setHoursByList - username:${username}`);
                loggerCSV.info(`setHoursByList,${(new Date() - function_enter_time) / 1000}`)
                const { results } = body.value;
                res.status(200).json({
                    ok: true,
                    value: { results },
                    msg: 'Hora creada correctamente.'
                });
            } else {
                logger.error(`setHoursByList : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion setHoursByList`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`setHoursByList : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getTicketActionByTicketId = async (req, res = response) => {
    const { label: username } = req;
    const { ticket_id } = req.body;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC},${UserRol.ClienteADM},${UserRol.ClienteUSR}`;
    logger.info(`==> getTicketActionByTicketId - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getTicketActionByTicketId";

    try {
        logger.info(`getTicketActionByTicketId ticket_id:${ticket_id} username:${username}`)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { ticket_id, username }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== getTicketActionByTicketId - username:${username}`);
                loggerCSV.info(`getTicketActionByTicketId,${(new Date() - function_enter_time) / 1000}`)

                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Listado de ticket acciones obtenido correctamente.'
                });
            } else {
                logger.error(`getTicketActionByTicketId : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion getTicketActionByTicketId`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`getTicketActionByTicketId : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const setHiddenNote = async (req, res = response) => {
    const { label: username } = req;
    const { ticket_id, nota } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}`;
    logger.info(`==> setHiddenNote - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/setHiddenNote";

    try {
        logger.info(`setHiddenNote ticket_id:${ticket_id} nota:${nota} username:${username}`)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { ticket_id, nota, username }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }
                logger.info(`<== setHiddenNote - username:${username}`);
                loggerCSV.info(`setHiddenNote,${(new Date() - function_enter_time) / 1000}`)
                const { result } = body.value;
                res.status(200).json({
                    ok: true,
                    value: { result },
                    msg: 'Nota oculta creada correctamente.'
                });
            } else {
                logger.error(`setHiddenNote : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion setHiddenNote`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`setHiddenNote : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getAllUsers = async (req, res = response) => {
    const { label: username } = req;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC},${UserRol.ClienteADM},${UserRol.ClienteUSR}`;
    logger.info(`==> getAllUsers - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getAllUsers";

    try {
        logger.info(`getAllUsers `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { username, rol }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== getAllUsers - username:${username}`);
                loggerCSV.info(`getAllUsers,${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Responsables obtenidas correctamente.'
                });
            } else {
                logger.error(`getAllUsers : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion getAllUsers`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`getAllUsers : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getAllUsersByCompany = async (req, res = response) => {
    const { label: username } = req;
    const { empresaId, includemyself } = req.body;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC},${UserRol.ClienteADM},${UserRol.ClienteUSR}`;
    logger.info(`==> getAllUsersByCompany - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getAllUsersByCompany";

    try {
        logger.info(`getAllUsersByCompany `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { username, empresaId, includemyself }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== getAllUsersByCompany - username:${username}`);
                loggerCSV.info(`getAllUsersByCompany,${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Responsables obtenidas correctamente.'
                });
            } else {
                logger.error(`getAllUsersByCompany : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion getAllUsersByCompany`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`getAllUsersByCompany : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getTicketDetail = async (req, res = response) => {
    const { label: username } = req;
    const { ticket_id } = req.body;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC},${UserRol.ClienteADM},${UserRol.ClienteUSR}`;
    logger.info(`==> getTicketDetail - username:${username} ticket_id:${ticket_id}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getTicketDetail";

    try {
        logger.info(`getTicketDetail `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { username, ticket_id }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== getTicketDetail - username:${username} ticket_id:${ticket_id}`);
                loggerCSV.info(`getTicketDetail,${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Detalles del ticket obtenidas correctamente.'
                });
            } else {
                logger.error(`getTicketDetail : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion getTicketDetail`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`getTicketDetail : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getHours = async (req, res = response) => {
    const { label: username } = req;
    const { ticket_id } = req.body;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC},${UserRol.ClienteADM},${UserRol.ClienteUSR}`;
    logger.info(`==> getHours - username:${username} ticket_id:${ticket_id}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getHours";

    try {
        logger.info(`getHours `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { ticket_id }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== getHours - username:${username} ticket_id:${ticket_id}`);
                loggerCSV.info(`getHours,${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Detalles de horas del ticket obtenidas correctamente.'
                });
            } else {
                logger.error(`getHours : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion getHours`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`getHours : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getTotalHours = async (req, res = response) => {
    const { label: username } = req;
    const { ticket_id } = req.body;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC},${UserRol.ClienteADM},${UserRol.ClienteUSR}`;
    logger.info(`==> getTotalHours - username:${username} ticket_id:${ticket_id}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getTotalHours";

    try {
        logger.info(`getTotalHours `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { ticket_id }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== getTotalHours - username:${username} ticket_id:${ticket_id}`);
                loggerCSV.info(`getTotalHours,${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Detalles de horas totales del ticket obtenidas correctamente.'
                });
            } else {
                logger.error(`getTotalHours : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion getHours`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`getTotalHours : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getProjectedHours = async (req, res = response) => {
    const { label: username } = req;
    const { ticket_id } = req.body;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC},${UserRol.ClienteADM},${UserRol.ClienteUSR}`;
    logger.info(`==> getProjectedHours - username:${username} ticket_id:${ticket_id}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getProjectedHours";

    try {
        logger.info(`getProjectedHours `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { username, ticket_id }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== getProjectedHours - username:${username} ticket_id:${ticket_id}`);
                loggerCSV.info(`getProjectedHours,${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Detalles de horas proyectadas dek ticket obtenidas correctamente.'
                });
            } else {
                logger.error(`getProjectedHours : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion getHours`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`getProjectedHours : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

module.exports = {
    getAllUsers,
    getTicketActionByTicketId,
    getTicketDetail,
    setState,
    setPriority,
    setResponsible,
    setAutoEvaluation,
    setNote,
    setHours,
    setHiddenNote,
    getAllUsersByCompany,
    setHoursByList,
    setProjectedHours,
    getHours,
    getProjectedHours,
    getTotalHours
}