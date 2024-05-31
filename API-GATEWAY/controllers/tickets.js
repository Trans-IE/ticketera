const { response } = require('express');
const { logger, loggerCSV } = require('../logger');
const { generarJWT } = require('../helpers/jwt');
const { fetchConToken, fetchSinToken, fetchSinTokenForm } = require('../helpers/fetch');
const { getUserRol } = require('../helpers/validators');
const { UserRol } = require('../helpers/constants');
const fs = require('node:fs');

const getAllTicketsByFilter = async (req, res = response) => {

    const { titulo, causaRaiz, ticketPartner, empresaId, productoId, responsableId, numeroId, prioridad, estado, tipoFalla, dateFrom, dateTo, tipoTicket, offset, orderBy, orderByType, limit } = req.body;

    const { label: username } = req;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC},${UserRol.ClienteADM},${UserRol.ClienteUSR}`;
    logger.info(`==> getAllTicketsByFilter - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getAllTicketsByFilter";

    try {
        logger.info(`getAllTicketsByFilter `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { username, titulo, causaRaiz, ticketPartner, empresaId, productoId, responsableId, numeroId, prioridad, estado, tipoFalla, dateFrom, dateTo, tipoTicket, offset, orderBy, orderByType, limit }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== getAllTicketsByFilter - username:${username}`);
                loggerCSV.info(`getAllTicketsByFilter,${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Tickets obtenidos correctamente.'
                });
            } else {
                logger.error(`getAllTicketsByFilter : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion getAllTicketsByFilter`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`getAllTicketsByFilter : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const createTicket = async (req, res = response) => {

    const { label: username } = req;
    const { empresaId, contratoId, productoId, tipoFalla, title, description, nroSerie, nodo, esProyecto, padreId, preventaId, vendedorId, tkEnPartner, responsableId, array_user_id_notif } = req.body;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.ClienteADM},${UserRol.ClienteUSR},${UserRol.LocalTAC}`;
    logger.info(`==> createTicket - username:${username}`);
    let url = "";

    try {
        logger.info(`createTicket username:${username} empresaId:${empresaId} contratoId:${contratoId} productoId:${productoId} tipoFalla:${tipoFalla} title:${title} description:${description} nroSerie:${nroSerie} nodo:${nodo} esProyecto:${esProyecto} padreId:${padreId} preventaId:${preventaId} vendedorId:${vendedorId} tkEnPartner:${tkEnPartner} responsableId:${responsableId} array_user_id_notif:${array_user_id_notif}`);

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        //TODO: Los roles que se filtran deben ser explícitos ya que si no es Trans sí o sí siempre entraría por Cliente.
        if (resultado) {
            if (setRolUser.has(UserRol.LocalSM) || setRolUser.has(UserRol.LocalEJ) || setRolUser.has(UserRol.LocalTEC)) {
                url = process.env.HOST_TICKETERA_BACKEND + "/entities/createTicketTrans";
            } else if (setRolUser.has(UserRol.ClienteADM) || setRolUser.has(UserRol.ClienteUSR)) {
                url = process.env.HOST_TICKETERA_BACKEND + "/entities/createTicketClient";
            }

            const resp = await fetchSinToken(url, { username, empresaId, contratoId, productoId, tipoFalla, title, description, nroSerie, nodo, esProyecto, padreId, preventaId, vendedorId, tkEnPartner, responsableId, array_user_id_notif }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== createTicket - username:${username}`);
                loggerCSV.info(`createTicket,${(new Date() - function_enter_time) / 1000}`)
                const { id } = body.value;

                if (id == -1) {
                    res.status(401).json({
                        ok: true,
                        value: { id },
                        msg: 'No coinciden los contratos con su empresa.'
                    });
                } else if (id == -2) {
                    res.status(401).json({
                        ok: true,
                        value: { id },
                        msg: 'No puede crear un ticket de otra empresa que no sea propia.'
                    });
                } else {
                    res.status(200).json({
                        ok: true,
                        value: { id },
                        msg: 'Ticket creado correctamente.'
                    });
                }

            } else {
                logger.error(`createTicket : ${body.msg}`);
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
        logger.error(`createTicket : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateTicket = async (req, res = response) => {
    const { label: username } = req;
    //const id = req.params.id;
    const { userId, empresaId, tipoFalla, cliente, partner, rma, bug, comment, nroSerie, nodo, titulo, causaRaiz, preventa, vendedor, producto, esProjecto, proyecton, array_user_id_notif } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}`;
    logger.info(`UpdateTicket username:${username} empresaId:${empresaId} tipoFalla:${tipoFalla} cliente:${cliente} partner:${partner} rma:${rma} bug:${bug} comment:${comment} nroSerie:${nroSerie} nodo:${nodo} titulo:${titulo} causaRaiz:${causaRaiz} preventa:${preventa} vendedor:${vendedor} producto:${producto} esProyecto:${esProjecto} proyecton:${proyecton} array_user_id_notif:${array_user_id_notif}`);
    let url = process.env.HOST_TICKETERA_BACKEND + `/entities/updateTicketTrans`;

    try {

        logger.info(`UpdateTicket ==> username:${username} empresaId:${empresaId} tipoFalla:${tipoFalla} cliente:${cliente} partner:${partner} rma:${rma} bug:${bug} comment:${comment} nroSerie:${nroSerie} nodo:${nodo} titulo:${titulo} causaRaiz:${causaRaiz} preventa:${preventa} vendedor:${vendedor} producto:${producto} esProyecto:${esProjecto} proyecton:${proyecton} array_user_id_notif:${array_user_id_notif}`);

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { username, empresaId, tipoFalla, cliente, partner, rma, bug, comment, nroSerie, nodo, titulo, causaRaiz, preventa, vendedor, producto, esProjecto, proyecton, array_user_id_notif }, 'PUT');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== UpdateTicket - username:${username}`);
                loggerCSV.info(`UpdateTicket,${(new Date() - function_enter_time) / 1000}`)

                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Ticket actualizado correctamente.'
                });
            } else {
                logger.error(`UpdateTicket : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    //  value: body.value,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion UpdateTicket`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }
    } catch (error) {
        logger.error(`UpdateTicket : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const deleteTicket = async (req, res = response) => {

    const { label: username } = req;
    const id = req.params.id;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}`;
    logger.info(`==> deleteTicket - username:${username}`);

    let url = process.env.HOST_TICKETERA_BACKEND + `/entities/deleteTicket/${id}`;

    try {
        const rol = await getUserRol(username)
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { id }, 'DELETE');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== deleteTicket - id:${id}`);
                loggerCSV.info(`deleteTicket,${(new Date() - function_enter_time) / 1000}`)

                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Ticket eliminado correctamente.'
                });
            } else {
                logger.error(`deleteTicket : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion deleteProduct`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }
    } catch (error) {
        logger.error(`deleteTicket : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getFailTypes = async (req, res = response) => {
    const { label: username } = req;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC},${UserRol.ClienteADM},${UserRol.ClienteUSR}`;
    logger.info(`==> getFailTypes - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getFailTypes";

    try {
        logger.info(`getFailTypes `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { username }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== getFailTypes - username:${username}`);
                loggerCSV.info(`getFailTypes,${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Listado de fallas obtenidas correctamente.'
                });
            } else {
                logger.error(`getFailTypes : ${body.msg}`);
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
        logger.error(`getFailTypes : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getTicketTypes = async (req, res = response) => {
    const { label: username } = req;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC},${UserRol.ClienteADM},${UserRol.ClienteUSR}`;
    logger.info(`==> getTicketTypes - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getTicketTypes";

    try {
        logger.info(`getTicketTypes `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { username }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== getTicketTypes - username:${username}`);
                loggerCSV.info(`getTicketTypes,${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Listado de tipos obtenidas correctamente.'
                });
            } else {
                logger.error(`getTicketTypes : ${body.msg}`);
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
        logger.error(`getTicketTypes : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const uploadFile = async (req, res = response) => {
    let function_enter_time = new Date();
    let { ticket_id } = req.body;
    const { label: username } = req;

    let multFiles = req.files["files"];
    logger.info(
        `==> uploadFile - id_interaction:${ticket_id} username:${username}`
    );
    const form = new FormData();

    multFiles.forEach((element) => {
        let filePath = `uploads/${element.originalname}`;
        let data = fs.readFileSync(filePath);
        const blobEnBuffer = Buffer.from(data);
        const blob = new Blob([blobEnBuffer]);
        form.append("files", blob, element.originalname);
    });

    form.append("ticket_id", ticket_id);
    form.append("username", username);

    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC},${UserRol.ClienteADM},${UserRol.ClienteUSR}`;
    logger.info(`==> uploadFile - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/uploadFile";

    try {
        logger.info(`uploadFile `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinTokenForm(url, form);
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== uploadFile - ticket_id:${ticket_id}`);
                loggerCSV.info(
                    `uploadFile,${(new Date() - function_enter_time) / 1000}`
                );
                res.status(200).json({
                    ok: body.ok,
                    value: body.value,
                    msg: body.msg,
                });
            } else {
                logger.error(
                    `Could not set file. Body false`
                );
                res.status(500).json({
                    ok: false,
                    value: body.value,
                    msg: body.msg,
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion uploadFile`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`uploadFile : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
};

module.exports = {
    getAllTicketsByFilter,
    updateTicket,
    createTicket,
    deleteTicket,
    getFailTypes,
    getTicketTypes,
    uploadFile
}