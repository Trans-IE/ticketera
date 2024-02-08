const { response } = require('express');
const { logger, loggerCSV } = require('../logger');
const { generarJWT } = require('../helpers/jwt');
const { fetchConToken, fetchSinToken } = require('../helpers/fetch');
const { getUserRol } = require('../helpers/validators');
const { UserRol } = require('../helpers/constants');

const getAllTicketsByFilter = async (req, res = response) => {
    const { label: username } = req;

    const { pCadenaSearch, offset, estadoId, prioridadId, tipoId, tipoTicket, orderBy, orderByType } = req.body;

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
            const resp = await fetchSinToken(url, { pCadenaSearch, username, offset, estadoId, prioridadId, tipoId, tipoTicket, orderBy, orderByType }, 'POST');
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
            res.status(500).json({
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
    const { empresaId, contratoId, productoId, tipoFalla, title, description, nroSerie, nodo, esProyecto, padreId, preventaId, vendedorId, tkEnPartner, array_user_id_notif } = req.body;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.ClienteADM},${UserRol.ClienteUSR},${UserRol.LocalTAC}`;
    logger.info(`==> createTicket - username:${username}`);
    let url = "";

    try {
        logger.info(`createTicket username:${username} empresaId:${empresaId} contratoId:${contratoId} productoId:${productoId} tipoFalla:${tipoFalla} title:${title} description:${description} nroSerie:${nroSerie} nodo:${nodo} esProyecto:${esProyecto} padreId:${padreId} preventaId:${preventaId} vendedorId:${vendedorId} tkEnPartner:${tkEnPartner} array_user_id_notif:${array_user_id_notif}`);

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            if (setRolUser.has(UserRol.LocalSM) || setRolUser.has(UserRol.LocalEJ) || setRolUser.has(UserRol.LocalTEC)) {
                url = process.env.HOST_TICKETERA_BACKEND + "/entities/createTicketTrans";
            } else {
                url = process.env.HOST_TICKETERA_BACKEND + "/entities/createTicketClient";
            }

            const resp = await fetchSinToken(url, { username, empresaId, contratoId, productoId, tipoFalla, title, description, nroSerie, nodo, esProyecto, padreId, preventaId, vendedorId, tkEnPartner, array_user_id_notif }, 'POST');
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
            res.status(500).json({
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
            res.status(500).json({
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
            res.status(500).json({
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

module.exports = {
    getAllTicketsByFilter,
    updateTicket,
    createTicket,
    deleteTicket
}