const { response } = require('express');
const { createDBTicketTrans, updateDBTicketTrans, createDBTicketClient, deleteDBTicket, getAllDBTicketsByFilter, getAllDBFailTypes, getAllDBTicketTypes, changeAssingDBTicket, changeStateDBTicket, getAllDBAreas, getAllDBResponsiblesByArea } = require('../databases/queries_tickets');
const { getDBCompanyByUser } = require('../databases/queries_companies');
const { createDBFilePath } = require('../databases/queries_ticket_actions');
const { getDBUserIdByUser, getDBTypeUserByUser } = require('../databases/queries_users');
const { getDBContractsIdByCompany } = require('../databases/queries_contracts');

const { logger, loggerCSV } = require('../logger');
const { PAYLOAD_TYPES, TICKETS_ROOMS_PREFIX } = require('../helpers/constants');
const { userType, ticketStatus } = require('../helpers/constants');
const crypto = require('crypto');
const { getCleanName, loadFileServer, readBinaryFile } = require('../helpers/fileHelper');
const { off } = require('process');
const { createNewTicketNotification } = require('../helpers/notificationServiceHelper');

const createTicketTrans = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { username, empresaId, contratoId, productoId, tipoFalla, title, description, nroSerie, nodo, esProyecto, padreId, preventaId, vendedorId, tkEnPartner, responsableId, areaId, array_user_id_notif } = req.body;

    logger.info(`createTicketTrans username:${username} empresaId:${empresaId} contratoId:${contratoId} productoId:${productoId} tipoFalla:${tipoFalla} title:${title} description:${description} nroSerie:${nroSerie} nodo:${nodo} esProyecto:${esProyecto} padreId:${padreId} preventaId:${preventaId} vendedorId:${vendedorId} tkEnPartner:${tkEnPartner} responsableId:${responsableId} areaId:${areaId} array_user_id_notif:${array_user_id_notif}`);

    const userId = await getDBUserIdByUser(username);
    const typeId = await getDBTypeUserByUser(username);

    try {
        createDBTicketTrans(userId, empresaId, contratoId, productoId, tipoFalla, title, description, nroSerie, nodo, esProyecto, padreId, preventaId, vendedorId, tkEnPartner, areaId, array_user_id_notif)
            .then(ticketId => {
                if (responsableId) {
                    //TODO: Validar que la asignación y el cambio de estado del ticket solo lo pueda hacer un usuario TRANS a un usuario TRANS!
                    if (typeId != userType.client) {
                        changeAssingDBTicket(userId, ticketId, responsableId)
                            .then(result_changeAssing => {
                                changeStateDBTicket(userId, ticketId, ticketStatus.Pendiente_de_trans)
                                    .then(result_state => {
                                        res.status(200).json({
                                            ok: true,
                                            value: { id: result_state },
                                            msg: `Ticket creado correctamente.`
                                        });
                                    }).catch(dataError => {
                                        logger.error(`createTicketTrans => changeStateDBTicket : params=> userId:${userId} ticketId:${ticketId} responsableId:${responsableId} error=> ${dataError}`);
                                        res.status(501).json({
                                            ok: false,
                                            error: dataError,
                                            msg: `No se pudo crear la acción createTicket del ticket. `
                                        });
                                    });
                            }).catch(dataError => {
                                logger.error(`createTicketTrans => changeAssingDBTicket : params=> userId:${userId} ticketId:${ticketId} responsableId:${responsableId} error=> ${dataError}`);
                                res.status(501).json({
                                    ok: false,
                                    error: dataError,
                                    msg: `No se pudo crear la acción createTicket del ticket. `
                                });
                            });
                    } else {
                        res.status(200).json({
                            ok: true,
                            value: { id: ticketId },
                            msg: `Ticket creado correctamente.`
                        });
                    }
                } else {
                    res.status(200).json({
                        ok: true,
                        value: { id: ticketId },
                        msg: `Ticket creado correctamente.`
                    });
                }
            })
            .catch(dataError => {
                logger.error(`createTicketTrans => createDBTicketTrans : params=> username:${username} userId:${userId} empresaId:${empresaId} contratoId:${contratoId} productoId:${productoId} tipoFalla:${tipoFalla} title:${title} description:${description} nroSerie:${nroSerie} nodo:${nodo} esProyecto:${esProyecto} padreId:${padreId} preventaId:${preventaId} vendedorId:${vendedorId} tkEnPartner:${tkEnPartner} responsableId:${responsableId} array_user_id_notif:${array_user_id_notif} error=> ${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear la acción createTicket del ticket. `
                });
            });

    } catch (error) {
        logger.error(`createTicketTrans params=> username:${username} userId:${userId} empresaId:${empresaId} contratoId:${contratoId} productoId:${productoId} tipoFalla:${tipoFalla} title:${title} description:${description} nroSerie:${nroSerie} nodo:${nodo} esProyecto:${esProyecto} padreId:${padreId} preventaId:${preventaId} vendedorId:${vendedorId} tkEnPartner:${tkEnPartner} responsableId:${responsableId} array_user_id_notif:${array_user_id_notif} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateTicketTrans = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { username, empresaId, tipoFalla, cliente, partner, rma, bug, comment, nroSerie, nodo, titulo, causaRaiz, preventa, vendedor, producto, esProjecto, proyecton, array_user_id_notif } = req.body;
    logger.info(`UpdateTicketTrans username:${username} empresaId:${empresaId} tipoFalla:${tipoFalla} cliente:${cliente} partner:${partner} rma:${rma} bug:${bug} comment:${comment} nroSerie:${nroSerie} nodo:${nodo} titulo:${titulo} causaRaiz:${causaRaiz} preventa:${preventa} vendedor:${vendedor} producto:${producto} esProyecto:${esProjecto} proyecton:${proyecton} array_user_id_notif:${array_user_id_notif}`);

    const userId = await getDBUserIdByUser(username);

    try {
        logger.info(`updateTicketTrans userId:${userId}`);

        updateDBTicketTrans(userId, empresaId, tipoFalla, cliente, partner, rma, bug, comment, nroSerie, nodo, titulo, causaRaiz, preventa, vendedor, producto, esProjecto, proyecton, array_user_id_notif)
            .then(result => {
                logger.info(`<== updateTicketTrans`);

                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: `El ticket fue actualizado correctamente.`
                });

            })
            .catch(dataError => {
                logger.error(`updateTicketTrans  => updateDBTicketTrans : params=> updateTicketTrans username:${username} userId:${userId} empresaId:${empresaId} tipoFalla:${tipoFalla} cliente:${cliente} partner:${partner} rma:${rma} bug:${bug} comment:${comment} nroSerie:${nroSerie} nodo:${nodo} titulo:${titulo} causaRaiz:${causaRaiz} preventa:${preventa} vendedor:${vendedor} producto:${producto} esProyecto:${esproject} proyecton:${proyecton} array_user_id_notif:${array_user_id_notif} Error:${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo actualizar el ticket `
                });
            });

    } catch (error) {
        logger.error(`updateTicketTrans : params=> updateTicket username:${username} userId:${userId} empresaId:${empresaId} tipoFalla:${tipoFalla} cliente:${cliente} partner:${partner} rma:${rma} bug:${bug} comment:${comment} nroSerie:${nroSerie} nodo:${nodo} titulo:${titulo} causaRaiz:${causaRaiz} preventa:${preventa} vendedor:${vendedor} producto:${producto} esProyecto:${esproject} proyecton:${proyecton} array_user_id_notif:${array_user_id_notif} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Hable con el administrador'
        });
    }
}

const createTicketClient = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { username, empresaId, contratoId, productoId, tipoFalla, title, description, nroSerie, nodo, array_user_id_notif } = req.body;

    logger.info(`createTicketClient username:${username} contratoId:${contratoId} productoId:${productoId} tipoFalla:${tipoFalla} title:${title} description:${description} nroSerie:${nroSerie} nodo:${nodo} array_user_id_notif:${array_user_id_notif}`);

    const empresaIdByUser = await getDBCompanyByUser(username);
    const userId = await getDBUserIdByUser(username);
    const contracts = await getDBContractsIdByCompany(empresaId);

    console.log('empresaIdByUser: ' + empresaIdByUser);
    console.log('userId: ' + userId);
    console.table(contracts);

    try {
        logger.info(`createTicketClient userId:${userId} empresaIdByUser:${empresaIdByUser}`);

        if (empresaId == empresaIdByUser) {
            if (contracts.some(contrato => contrato.id === contratoId)) {
                createDBTicketClient(userId, empresaId, contratoId, productoId, tipoFalla, title, description, nroSerie, nodo, array_user_id_notif)
                    .then(result => {
                        res.status(200).json({
                            ok: true,
                            value: { id: result },
                            msg: `Ticket creado correctamente.`
                        });
                    })
                    .catch(dataError => {
                        logger.error(`createDBTicketClient => createDBTicketClient : params=> userId:${userId} empresaId:${empresaId} contratoId:${contratoId} productoId:${productoId} tipoFalla:${tipoFalla} title:${title} description:${description} nroSerie:${nroSerie} nodo:${nodo} array_user_id_notif:${array_user_id_notif} error=> ${dataError}`);
                        res.status(501).json({
                            ok: false,
                            error: dataError,
                            msg: `No se pudo crear la acción createTicket del ticket.`
                        });
                    });
            } else {
                res.status(401).json({
                    ok: true,
                    value: { id: -1 },
                    msg: `No coinciden los contratos con su empresa.`
                });
            }
        } else {
            res.status(401).json({
                ok: true,
                value: { id: -2 },
                msg: `No puede crear un ticket de otra empresa que no sea propia.`
            });
        }

    } catch (error) {
        logger.error(`createTicketClient => createDBTicketClient : params=> userId:${userId} empresaId:${empresaId} contratoId:${contratoId} productoId:${productoId} tipoFalla:${tipoFalla} title:${title} description:${description} nroSerie:${nroSerie} nodo:${nodo} array_user_id_notif:${array_user_id_notif} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const deleteTicket = async (req, res = response) => {

    const id = req.params.id;

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token
    logger.info(`deleteTicket id:${id}`)

    try {
        // AL ELIMINAR PUEDE QUE SEA NECESARIO CHEQUEAR PRIVILEGIOS DE USUARIO
        // DEBE VALIDAR SI EXISTE EL ELEMENTO

        deleteDBTicket(id)
            .then(result => {
                if (result === 1) {
                    res.status(200).json({
                        ok: true,
                        value: result,
                        msg: `El ticket: ${id} fue eliminado correctamente`
                    });
                }
                else {
                    //Ocurrio un error no manejado en sql.
                    return res.status(401).json({
                        ok: false,
                        msg: 'El ticket no pudo ser eliminado del sistema.'
                    });
                }
            })
            .catch(dataError => {
                logger.error(`deleteTicket => deleteDBTicket: params=> id=${id} error=> ${dataError}`);
                // DESDE CAPA databases recibira un objeto error { code, message, stack }
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo eliminar el ticket '${id}' `
                });

            });
    } catch (error) {
        logger.error(`deleteTicket: params=> id=${id} error=> ${error}`);
        res.status(502).json({
            ok: false,
            error: error,
            msg: `No se pudo eliminar el ticket '${id}' `
        });
    }
}

const getAllTicketsByFilter = async (req, res = response) => {

    const { username, titulo, causaRaiz, ticketPartner, empresaId, productoId, responsableId, numeroId, prioridad, estado, tipoFalla, dateFrom, dateTo, tipoTicket, offset, orderBy, orderByType, limit } = req.body;
    let function_enter_time = new Date();
    let empresaIdAux;

    logger.info(`==> getAllTicketsByFilter.`)

    try {
        const usuarioId = await getDBUserIdByUser(username);
        const tipoUsuario = await getDBTypeUserByUser(username);

        //Si no es un tipo de usuario Trans forzar id de la empresa que viene por username del x-token de la consulta en el api-gateway
        if (tipoUsuario == 2) {
            empresaIdAux = await getDBCompanyByUser(username);
        } else {
            empresaIdAux = empresaId;
        }

        logger.info(`getAllTicketsByFilter username:${username} titulo:${titulo} causaRaiz:${causaRaiz} ticketPartner:${ticketPartner} empresaId:${empresaId} productoId:${productoId} responsableId:${responsableId} numeroId:${numeroId} prioridad:${prioridad} estado:${estado} tipoFalla:${tipoFalla} dateFrom:${dateFrom} dateTo:${dateTo} tipoTicket:${tipoTicket} offset:${offset} orderBy:${orderBy} orderByType:${orderByType} limit:${limit}`);

        getAllDBTicketsByFilter(titulo, causaRaiz, ticketPartner, empresaIdAux, productoId, responsableId, numeroId, prioridad, estado, tipoFalla, dateFrom, dateTo, tipoUsuario, usuarioId, tipoTicket, offset, orderBy, orderByType, limit)
            .then(result => {
                logger.info(`<== getAllTicketsByFilter`);
                loggerCSV.info(`getAllTicketsByFilter, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de tickets obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getAllTicketsByFilter => getAllDBTicketsByFilter error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllTicketsByFilter error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de tickets.'
        });
    }
}

const getFailTypes = async (req, res = response) => {

    let function_enter_time = new Date();
    logger.info(`==> getFailTypes.`)
    try {
        getAllDBFailTypes()
            .then(result => {
                logger.info(`<== getFailTypes`);
                loggerCSV.info(`getFailTypes, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de fallas obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getAllFailTypes => getAllDBFailTypes error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllDBFailTypes error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de fallas.'
        });
    }
}

const getTicketTypes = async (req, res = response) => {

    let function_enter_time = new Date();
    logger.info(`==> getTicketTypes.`)
    try {
        getAllDBTicketTypes()
            .then(result => {
                logger.info(`<== getTicketTypes`);
                loggerCSV.info(`getTicketTypes, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de tipos obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getTicketTypes => getAllDBTicketTypes error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllDBTicketTypes error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de tipos.'
        });
    }
}

const getAreas = async (req, res = response) => {

    let function_enter_time = new Date();
    logger.info(`==> getAreas.`)
    try {
        getAllDBAreas()
            .then(result => {
                logger.info(`<== getAreas`);
                loggerCSV.info(`getAreas, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de areas obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getAreas => getAllDBAreas error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllDBAreas error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de areas.'
        });
    }
}

const getResponsiblesByArea = async (req, res = response) => {
    const { area_id } = req.body;

    let function_enter_time = new Date();
    logger.info(`==> getResponsibleByArea.`)
    try {
        getAllDBResponsiblesByArea(area_id)
            .then(result => {
                logger.info(`<== getResponsibleByArea`);
                loggerCSV.info(`getResponsibleByArea, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de responsables por area obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getResponsibleByArea => getAllDBAreas error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllDBAreas error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de responsables por area.'
        });
    }
}

const uploadFile = async (req, res = response) => {
    let { ticket_id, username } = req.body;

    let multFiles = req.files["files"];

    logger.info(`==> uploadFile - ticket_id:${ticket_id} username:${username} multFiles:${multFiles}`);

    for (const file of multFiles) {
        try {
            const path = await loadFileServer(file, ticket_id);
            const result = await createDBFilePath(ticket_id, path, username);

            createNewTicketNotification(PAYLOAD_TYPES.TICKET_UPLOAD_FILE, { ticket_id, result, room: `${TICKETS_ROOMS_PREFIX.EMPRESA}${ticket_id}` })
            createNewTicketNotification(PAYLOAD_TYPES.TICKET_UPLOAD_FILE, { ticket_id, result, room: `${TICKETS_ROOMS_PREFIX.CLIENTE}${ticket_id}` })

            console.log(path);
        } catch (error) {
            logger.error(`uploadFile: ${error}`);
        }
    }

    logger.info(
        `<== uploadFile - ticket_id:${ticket_id} username:${username}`
    );

    res.status(200).json({
        ok: true,
        value: {},
        msg: ''
    });
};

const getFile = async (req, res = response) => {
    const { relativePath, idTicket, username } = req.body;
    logger.info(`==> getFile - relativePath: ${relativePath} idTicket: ${idTicket} username: ${username}`);
    try {
        const binaryData = readBinaryFile(relativePath)
        logger.info(`<== getFile - idTicket:${idTicket}`);
        res.status(200).json({
            ok: true,
            value: binaryData,
            msg: 'Archivo obtenido con exito'
        });
    } catch (error) {
        logger.error(`getFile. Error enviando archivo: ${error}`);
        res.status(500).json({
            ok: false,
            msg: 'Error enviando archivo',
        });
    }
};

module.exports = {
    getAllTicketsByFilter,
    updateTicketTrans,
    createTicketTrans,
    createTicketClient,
    deleteTicket,
    getFailTypes,
    getTicketTypes,
    uploadFile,
    getAreas,
    getResponsiblesByArea,
    getFile
}
