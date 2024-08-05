const { response } = require('express');
const { createDBResponsible, createDBAutoEvaluation, createDBHours, createDBNote, createDBPriority, createDBState, getDBTicketActionByTicketId, createDBHiddenNote, getAllDBUsers, getAllDBUsersByCompany, getDBTicketDetail, createDBHoursByList, createDBProjectedHours, getDBTicketHours, getDBTicketProjectedHours, getDBTicketTotalHours, createDBArea, getAllDBFilesPaths } = require('../databases/queries_ticket_actions');
const { getDBUserIdByUser, getDBTypeUserByUser } = require('../databases/queries_users');
const { getDBCompanyByUser } = require('../databases/queries_companies');
const { logger, loggerCSV } = require('../logger');
const { userType, PAYLOAD_TYPES, TICKETS_ROOMS_PREFIX } = require('../helpers/constants');
const { formatHours, formatDate, pad } = require('../helpers/isDate');
const crypto = require('crypto');
const { createNewTicketNotification } = require('../helpers/notificationServiceHelper');

const setArea = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { empresa_id, nombre } = req.body;

    logger.info(`setArea empresa_id:${empresa_id} nombre:${nombre}`)

    try {

        createDBArea(empresa_id, nombre)
            .then(result => {

                res.status(200).json({
                    ok: true,
                    value: { result },
                    msg: `El area fue creada correctamente`
                });

            })
            .catch(dataError => {
                logger.error(`setArea => createDBArea : params=> empresa_id:${empresa_id} nombre:${nombre} error=> ${dataError}`);
                res.status(401).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear el área de la empresa. `
                });
            });

    } catch (error) {
        logger.error(`setArea => createDBArea : params=> empresa_id:${empresa_id} nombre:${nombre} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const setResponsible = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { ticket_id, responsable_id, username } = req.body;

    logger.info(`setResponsible ticket_id:${ticket_id} responsable_id:${responsable_id} username:${username}`)

    try {

        createDBResponsible(ticket_id, responsable_id, username)
            .then(result => {

                createNewTicketNotification(PAYLOAD_TYPES.TICKET_RESPONSIBLE_ADD, { ticket_id, result, room: `${TICKETS_ROOMS_PREFIX.EMPRESA}${ticket_id}` })
                createNewTicketNotification(PAYLOAD_TYPES.TICKET_RESPONSIBLE_ADD, { ticket_id, result, room: `${TICKETS_ROOMS_PREFIX.CLIENTE}${ticket_id}` })

                res.status(200).json({
                    ok: true,
                    value: { responsible: result },
                    msg: `Ticket acción responsable creada correctamente con id: ${result}`
                });

            })
            .catch(dataError => {
                logger.error(`setResponsible => createDBResponsible : params=> ticket_id:${ticket_id} responsable_id:${responsable_id} username:${username} error=> ${dataError}`);
                res.status(401).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear la acción responsable del ticket. `
                });
            });

    } catch (error) {
        logger.error(`setResponsible => createDBResponsible : params=> ticket_id:${ticket_id} responsable_id:${responsable_id} username:${username} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const setPriority = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { ticket_id, prioridad, username } = req.body;

    logger.info(`setPriority ticket_id:${ticket_id} prioridad:${prioridad} username:${username}`)

    try {

        createDBPriority(ticket_id, prioridad, username)
            .then(result => {
                createNewTicketNotification(PAYLOAD_TYPES.TICKET_PRIORITY_ADD, { ticket_id, result, room: `${TICKETS_ROOMS_PREFIX.EMPRESA}${ticket_id}` })
                createNewTicketNotification(PAYLOAD_TYPES.TICKET_PRIORITY_ADD, { ticket_id, result, room: `${TICKETS_ROOMS_PREFIX.CLIENTE}${ticket_id}` })

                res.status(200).json({
                    ok: true,
                    value: { priority: result },
                    msg: `Ticket acción prioridad creada correctamente`
                });

            })
            .catch(dataError => {
                logger.error(`setPriority => createDBPriority : params=> ticket_id:${ticket_id} prioridad:${prioridad} username:${username} error=> ${dataError}`);
                res.status(401).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear la acción prioridad del ticket. `
                });
            });

    } catch (error) {
        logger.error(`setPriority => createDBPriority : params=> ticket_id:${ticket_id} prioridad:${prioridad} username:${username} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const setState = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { ticket_id, estado, username } = req.body;

    logger.info(`setState ticket_id:${ticket_id} estado:${estado} username:${username}`)

    try {
        createDBState(ticket_id, estado, username)
            .then(result => {

                createNewTicketNotification(PAYLOAD_TYPES.TICKET_STATE_ADD, { ticket_id, result, room: `${TICKETS_ROOMS_PREFIX.EMPRESA}${ticket_id}` })
                createNewTicketNotification(PAYLOAD_TYPES.TICKET_STATE_ADD, { ticket_id, result, room: `${TICKETS_ROOMS_PREFIX.CLIENTE}${ticket_id}` })

                res.status(200).json({
                    ok: true,
                    value: { state: result },
                    msg: `Ticket acción estado creado correctamente con id: ${result}`
                });

            })
            .catch(dataError => {
                logger.error(`setState => createDBState : params=> ticket_id:${ticket_id} estado:${estado} username:${username} error=> ${dataError}`);
                res.status(401).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear la acción estado del ticket. `
                });
            });

    } catch (error) {
        logger.error(`setState => createDBState : params=> ticket_id:${ticket_id} estado:${estado} username:${username} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const setHours = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { ticket_id, horas, fecha_accion_hs, username } = req.body;

    logger.info(`setHours ticket_id:${ticket_id} horas:${horas} fecha_accion_hs:${fecha_accion_hs} username:${username} `)

    try {
        createDBHours(ticket_id, horas, fecha_accion_hs, username)
            .then(result => {

                createNewTicketNotification(PAYLOAD_TYPES.TICKET_HOURS_ADD, { ticket_id, result, room: `${TICKETS_ROOMS_PREFIX.EMPRESA}${ticket_id}` })

                res.status(200).json({
                    ok: true,
                    value: { hours: result },
                    msg: `Ticket acción hora creada correctamente con id: ${result}`
                });

            })
            .catch(dataError => {
                logger.error(`setHours => createDBHours : params=> ticket_id:${ticket_id} horas:${horas} username:${username} error=> ${dataError}`);
                res.status(401).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear la acción horas del ticket. `
                });
            });

    } catch (error) {
        logger.error(`setHours => createDBHours : params=> ticket_id:${ticket_id} horas:${horas} username:${username} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const setProjectedHours = async (req, res = response) => {
    const { ticket_id, fecha_inicio, fecha_fin, comentario, isUpdate, username } = req.body;
    let userId;

    try {
        userId = await getDBUserIdByUser(username);

        const start = new Date(fecha_inicio);
        const end = new Date(fecha_fin);

        const dayOfWeek = start.getDay();

        const segments = [
            { start: 0, end: 6, percentage: dayOfWeek === 0 ? 100 : 100 }, // 00:00 - 06:00
            { start: 6, end: 9, percentage: dayOfWeek === 0 ? 100 : (dayOfWeek === 6 ? 50 : 50) }, // 06:00 - 09:00
            { start: 9, end: 18, percentage: dayOfWeek === 0 ? 100 : (dayOfWeek === 6 ? 100 : null), dbFunction: 'createDBHours' },
            { start: 18, end: 22, percentage: dayOfWeek === 0 ? 100 : 50 }, // 18:00 - 22:00
            { start: 22, end: 24, percentage: 100 }, // 22:00 - 00:00
        ];

        let actions = [];

        segments.forEach(segment => {
            const segmentStart = new Date(start);
            const segmentEnd = new Date(start);
            segmentStart.setHours(segment.start, 0, 0, 0);
            segmentEnd.setHours(segment.end, 0, 0, 0);

            if (start < segmentEnd && end > segmentStart) {
                const effectiveStart = start > segmentStart ? start : segmentStart;
                const effectiveEnd = end < segmentEnd ? end : segmentEnd;

                const formattedStart = formatDate(effectiveStart);
                const formattedEnd = formatDate(effectiveEnd);

                if (segment.percentage === null) {
                    // Horas comunes
                    const commonHours = (effectiveEnd - effectiveStart) / (1000 * 60 * 60);
                    const hoursString = formatHours(commonHours);
                    const action = createDBHours(ticket_id, hoursString, formattedStart, username);
                    actions.push(action);

                    action.then(result => {
                        createNewTicketNotification(PAYLOAD_TYPES.TICKET_HOURS_ADD, { ticket_id, result, room: `${TICKETS_ROOMS_PREFIX.EMPRESA}${ticket_id}` });
                    });
                } else {
                    // Horas proyectadas or common hours based on dbFunction
                    if (segment.dbFunction === 'createDBHours') {
                        const commonHours = (effectiveEnd - effectiveStart) / (1000 * 60 * 60);
                        const hoursString = formatHours(commonHours);
                        const action = createDBHours(ticket_id, hoursString, formattedStart, username);
                        actions.push(action);

                        action.then(result => {
                            createNewTicketNotification(PAYLOAD_TYPES.TICKET_HOURS_ADD, { ticket_id, result, room: `${TICKETS_ROOMS_PREFIX.EMPRESA}${ticket_id}` });
                        });
                    } else {
                        const action = createDBProjectedHours(userId, ticket_id, formattedStart, formattedEnd, segment.percentage, comentario, isUpdate);
                        actions.push(action);

                        action.then(result => {
                            createNewTicketNotification(PAYLOAD_TYPES.TICKET_PROJECTED_HOURS_ADD, { ticket_id, result, room: `${TICKETS_ROOMS_PREFIX.EMPRESA}${ticket_id}` });
                        });
                    }
                }
            }
        });

        await Promise.all(actions);

        res.status(200).json({
            ok: true,
            value: {},
            msg: `Horas comunes y proyectadas creadas correctamente.`
        });
    } catch (error) {
        logger.error(`setProjectedHours => error : params=> ticket_id:${ticket_id}, username:${username}, error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
};

const setHoursByList = async (req, res = response) => {
    const { listHours, username } = req.body;

    logger.info(`setHoursByList listHours:${JSON.stringify(listHours)}`);

    try {
        // Array para almacenar los resultados de la creación de horas
        const results = [];

        // Iterar sobre cada objeto en la lista de horas
        for (const { ticket_id, horas, fecha_accion_hs } of listHours) {
            try {
                // Llamar a la función para crear la hora en la base de datos
                const result = await createDBHoursByList(ticket_id, horas, fecha_accion_hs, username);

                createNewTicketNotification(PAYLOAD_TYPES.TICKET_HOURS_ADD, { ticket_id, result, room: `${TICKETS_ROOMS_PREFIX.EMPRESA}${ticket_id}` })

                results.push(result); // Agregar el resultado al array de resultados
            } catch (error) {
                logger.error(`setHoursByList => createDBHours : error => ${error}`);
                res.status(500).json({
                    ok: false,
                    error: error,
                    msg: 'Por favor hable con el administrador'
                });
            }
        }

        res.status(200).json({
            ok: true,
            value: { results },
            msg: `Se crearon las horas de acción para los tickets correctamente.`
        });
    } catch (error) {
        logger.error(`setHoursByList => createDBHours : error => ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const setNote = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { ticket_id, notas, username } = req.body;

    let function_enter_time = new Date();
    logger.info(`setNote ticket_id:${ticket_id} notas:${notas} username:${username} `)

    try {

        const result = await createDBNote(ticket_id, notas, username);

        logger.info(`<== createDBNote`);
        loggerCSV.info(`createDBNote, ${(new Date() - function_enter_time) / 1000}`)

        //CReación de una nueva notificación
        //La variable ticket_id en este caso pasa como clave valor pero podría ser ticket_id:"cualquier objeto" y por subsiguiente result que puede ser cualquier objeto        
        createNewTicketNotification(PAYLOAD_TYPES.TICKET_HIDDEN_NOTE_ADD, { ticket_id, result, room: `${TICKETS_ROOMS_PREFIX.EMPRESA}${ticket_id}` })
        createNewTicketNotification(PAYLOAD_TYPES.TICKET_HIDDEN_NOTE_ADD, { ticket_id, result, room: `${TICKETS_ROOMS_PREFIX.CLIENTE}${ticket_id}` })

        res.status(200).json({
            ok: true,
            value: result,
            msg: 'Nota insertada correctamente.'
        });

    } catch (error) {
        logger.error(`setNota => createDBNote : params=> ticket_id:${ticket_id} username:${username} notas:${notas} username:${username} error=> ${error}`);
        res.status(401).json({
            ok: false,
            error: error,
            msg: `No se pudo crear la acción nota del ticket. `
        });
    }
}

const setAutoEvaluation = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { ticket_id, auto_evaluacion, username } = req.body;

    logger.info(`setAutoEvaluation ticket_id:${ticket_id} auto_evaluacion:${auto_evaluacion} username:${username}`)

    try {
        createDBAutoEvaluation(ticket_id, auto_evaluacion, username)
            .then(result => {
                res.status(200).json({
                    ok: true,
                    value: { autoEvaluation: result },
                    msg: `Ticket acción auto-evaluación creada correctamente con id: ${result}`
                });
            })
            .catch(dataError => {
                logger.error(`setAutoEvaluation => createDBAutoEvaluation : params=> ticket_id:${ticket_id} auto_evaluacion:${auto_evaluacion} username:${username} error=> ${dataError}`);
                res.status(401).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear la acción auto-evaluación del ticket. `
                });
            });

    } catch (error) {
        logger.error(`setAutoEvaluation => createDBAutoEvaluation : params=> ticket_id:${ticket_id} auto_evaluacion:${auto_evaluacion} username:${username} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getTicketActionByTicketId = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token.
    const { ticket_id, username } = req.body;

    const empresaId = await getDBCompanyByUser(username);
    const tipoUsuario = await getDBTypeUserByUser(username);
    //const rol = await getDBUserRolByUsername(username);

    let empresaIdAux;

    if (tipoUsuario == userType.client) {
        empresaIdAux = await getDBCompanyByUser(username);

    } else {
        empresaIdAux = empresaId;
    }

    let function_enter_time = new Date();
    logger.info(`getTicketActionByTicketId. ticket_id:${ticket_id} empresaIdAux:${empresaIdAux} tipoUsuario:${tipoUsuario} username:${username}`)
    try {
        getDBTicketActionByTicketId(ticket_id, empresaIdAux, tipoUsuario)
            .then(result => {
                logger.info(`<== getTicketActionByTicketId`);
                loggerCSV.info(`getTicketActionByTicketId, ${(new Date() - function_enter_time) / 1000}`)

                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de acciones obtenido correctamente.'
                });

            })
            .catch(error => {
                logger.error(`getTicketActionByTicketId => getDBTicketActionByTicketId : params=> ticket_id=> ${ticket_id} error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getDBTicketActionByTicketId : params=> ticket_id=> ${ticket_id} error=> ${error}`);
        res.status(500).json({
            ok: false,
            value: [],
            msg: 'Error obteniendo listado de acciones.'
        });
    }
}

const setHiddenNote = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { ticket_id, nota, username } = req.body;

    logger.info(`setHiddenNote ticket_id:${ticket_id} nota:${nota} username:${username}`)

    try {
        createDBHiddenNote(ticket_id, nota, username)
            .then(result => {

                //TODO: Validar seguridad sobre este evento
                createNewTicketNotification(PAYLOAD_TYPES.TICKET_HIDDEN_NOTE_ADD, { ticket_id, result, room: `${TICKETS_ROOMS_PREFIX.EMPRESA}${ticket_id}` })

                res.status(200).json({
                    ok: true,
                    value: { result },
                    msg: `Ticket acción nota oculta creada correctamente`
                });

            })
            .catch(dataError => {
                logger.error(`setHiddenNote => createDBAutoEvaluation : params=> ticket_id:${ticket_id} nota:${nota} username:${username} error=> ${dataError}`);
                res.status(401).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear la acción nota oculta del ticket. `
                });
            });

    } catch (error) {
        logger.error(`setAutoEvaluation => createDBAutoEvaluation : params=> ticket_id:${ticket_id} nota:${nota} username:${username} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getAllUsers = async (req, res = response) => {
    const { username, rol } = req.body;

    let function_enter_time = new Date();
    logger.info(`==> getAllUsers.`)
    try {
        getAllDBUsers(username, rol)
            .then(result => {
                logger.info(`<== getAllUsers`);
                loggerCSV.info(`getAllUsers, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de usuarios obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getAllUsers => getAllDBUsers error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllUsers error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de usuarios.'
        });
    }
}

const getAllUsersByCompany = async (req, res = response) => {
    let { username, empresaId, includemyself } = req.body;

    let empresaIdAux;

    const tipoUsuario = await getDBTypeUserByUser(username);

    if (tipoUsuario == 2) {
        empresaIdAux = await getDBCompanyByUser(username);
        includemyself = 0;
    } else {
        empresaIdAux = empresaId;
    }

    let function_enter_time = new Date();
    logger.info(`==> getAllUsersByCompany.`)
    try {
        getAllDBUsersByCompany(username, tipoUsuario, empresaId, includemyself)
            .then(result => {
                logger.info(`<== getAllUsersByCompany`);
                loggerCSV.info(`getAllUsersByCompany, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de usuarios obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getAllUsersByCompany => getAllDBUsersByCompany error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllUsers error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de usuarios.'
        });
    }
}

const getTicketDetail = async (req, res = response) => {
    const { username, ticket_id } = req.body;

    let function_enter_time = new Date();
    logger.info(`==> getTicketDetail.`)
    try {

        const userId = await getDBUserIdByUser(username);

        getDBTicketDetail(ticket_id, userId)
            .then(result => {
                logger.info(`<== getTicketDetail`);
                loggerCSV.info(`getTicketDetail, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de detalles del ticket obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getTicketDetail => getDBTicketDetail error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getTicketDetail error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de detalles del ticket.'
        });
    }
}
const getTotalHours = async (req, res = response) => {
    const { ticket_id } = req.body;

    let function_enter_time = new Date();
    logger.info(`==> getTotalHours.`)
    try {

        getDBTicketTotalHours(ticket_id)
            .then(result => {
                logger.info(`<== getTotalHours`);
                loggerCSV.info(`getTotalHours, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de horas totales del ticket obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getTotalHours => getDBTicketHours error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getTotalHours error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de horas del ticket.'
        });
    }
}

const getHours = async (req, res = response) => {
    const { ticket_id } = req.body;

    let function_enter_time = new Date();
    logger.info(`==> getHours.`)
    try {

        getDBTicketHours(ticket_id)
            .then(result => {
                logger.info(`<== getHours`);
                loggerCSV.info(`getHours, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de horas del ticket obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getHours => getDBTicketHours error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getHours error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de horas del ticket.'
        });
    }
}

const getProjectedHours = async (req, res = response) => {
    const { ticket_id } = req.body;

    let function_enter_time = new Date();
    logger.info(`==> getProjectedHours.`)
    try {

        getDBTicketProjectedHours(ticket_id)
            .then(result => {
                logger.info(`<== getProjectedHours`);
                loggerCSV.info(`getProjectedHours, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de horas proyectadas del ticket obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getProjectedHours => getDBTicketProjectedHours error=> ${error}`);
            })

    } catch (error) {
        logger.error(`function_enter_time error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de horas del ticket.'
        });
    }
}

const getAllFilesPaths = async (req, res = response) => {
    const { ticket_id, username, offset, limit } = req.body;

    let function_enter_time = new Date();
    logger.info(`==> getAllFilesPaths.`)
    try {
        getAllDBFilesPaths(ticket_id, username, offset, limit)
            .then(result => {
                logger.info(`<== getAllFilesPaths`);
                loggerCSV.info(`getAllFilesPaths, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de rutas de archivos obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getAllFilesPaths => getAllDBFilesPaths error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllFilesPaths error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de rutas de archivos.'
        });
    }
}

module.exports = {
    setPriority,
    setResponsible,
    setState,
    setHours,
    setNote,
    setAutoEvaluation,
    getTicketActionByTicketId,
    getAllUsers,
    getAllUsersByCompany,
    setHiddenNote,
    getTicketDetail,
    setHoursByList,
    setProjectedHours,
    getHours,
    getProjectedHours,
    getTotalHours,
    setArea,
    getAllFilesPaths
}
