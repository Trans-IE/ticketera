const { response } = require('express');
const { createDBResponsible, createDBAutoEvaluation, createDBHours, createDBNote, createDBPriority, createDBState } = require('../databases/queries_ticket_actions');
const { logger, loggerCSV } = require('../logger');
const { userType } = require('../helpers/constants');
const crypto = require('crypto');

const setResponsible = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { ticket_id, usuario_id, responsable_id } = req.body;

    logger.info(`setResponsible ticket_id:${ticket_id} usuario_id:${usuario_id} responsable_id:${responsable_id} `)

    try {

        createDBResponsible(ticket_id, usuario_id, responsable_id)
            .then(result => {
                res.status(200).json({
                    ok: true,
                    value: { responsible: result },
                    msg: `Ticket acción responsable creada correctamente con id: ${result}`
                });

            })
            .catch(dataError => {
                logger.error(`setResponsible => createDBResponsible : params=> ticket_id:${ticket_id} usuario_id:${usuario_id} responsable_id:${responsable_id} error=> ${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear la acción responsable del ticket. `
                });
            });

    } catch (error) {
        logger.error(`setResponsible => createDBResponsible : params=> ticket_id:${ticket_id} usuario_id:${usuario_id} responsable_id:${responsable_id} error=> ${error}`);
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

    const { ticket_id, usuario_id, prioridad } = req.body;

    logger.info(`setResponsible ticket_id:${ticket_id} usuario_id:${usuario_id} prioridad:${prioridad} `)

    try {

        createDBPriority(ticket_id, usuario_id, prioridad)
            .then(result => {
                res.status(200).json({
                    ok: true,
                    value: { priority: result },
                    msg: `Ticket acción prioridad creada correctamente`
                });

            })
            .catch(dataError => {
                logger.error(`setPriority => createDBPriority : params=> ticket_id:${ticket_id} usuario_id:${usuario_id} prioridad:${prioridad} error=> ${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear la acción prioridad del ticket. `
                });
            });

    } catch (error) {
        logger.error(`setPriority => createDBPriority : params=> ticket_id:${ticket_id} usuario_id:${usuario_id} prioridad:${prioridad} error=> ${error}`);
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

    const { ticket_id, usuario_id, estado } = req.body;

    logger.info(`setState ticket_id:${ticket_id} usuario_id:${usuario_id} estado:${estado} `)

    try {
        createDBState(ticket_id, usuario_id, estado)
            .then(result => {
                res.status(200).json({
                    ok: true,
                    value: { state: result },
                    msg: `Ticket acción esto creada correctamente con id: ${result}`
                });

            })
            .catch(dataError => {
                logger.error(`setState => createDBState : params=> ticket_id:${ticket_id} usuario_id:${usuario_id} estado:${estado} error=> ${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear la acción estado del ticket. `
                });
            });

    } catch (error) {
        logger.error(`setState => createDBState : params=> ticket_id:${ticket_id} usuario_id:${usuario_id} estado:${estado} error=> ${error}`);
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

    const { ticket_id, usuario_id, horas } = req.body;

    logger.info(`setHours ticket_id:${ticket_id} usuario_id:${usuario_id} horas:${horas} `)

    try {
        createDBHours(ticket_id, usuario_id, horas)
            .then(result => {
                res.status(200).json({
                    ok: true,
                    value: { hours: result },
                    msg: `Ticket acción hora creada correctamente con id: ${result}`
                });

            })
            .catch(dataError => {
                logger.error(`setHours => createDBHours : params=> ticket_id:${ticket_id} usuario_id:${usuario_id} horas:${horas} error=> ${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear la acción horas del ticket. `
                });
            });

    } catch (error) {
        logger.error(`setHours => createDBHours : params=> ticket_id:${ticket_id} usuario_id:${usuario_id} horas:${horas} error=> ${error}`);
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

    const { ticket_id, usuario_id, notas } = req.body;

    logger.info(`setNote ticket_id:${ticket_id} usuario_id:${usuario_id} notas:${notas} `)

    try {
        createDBNote(ticket_id, usuario_id, notas)
            .then(result => {
                res.status(200).json({
                    ok: true,
                    value: { note: result },
                    msg: `Ticket acción nota creada correctamente con id: ${result}`
                });

            })
            .catch(dataError => {
                logger.error(`setNota => createDBNote : params=> ticket_id:${ticket_id} usuario_id:${usuario_id} notas:${notas} error=> ${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear la acción nota del ticket. `
                });
            });

    } catch (error) {
        logger.error(`setNote => createDBNote : params=> ticket_id:${ticket_id} usuario_id:${usuario_id} horas:${notas} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const setAutoEvaluation = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { ticket_id, usuario_id, auto_evaluacion } = req.body;

    logger.info(`setAutoEvaluation ticket_id:${ticket_id} usuario_id:${usuario_id} auto_evaluacion:${auto_evaluacion} `)

    try {
        createDBAutoEvaluation(ticket_id, usuario_id, auto_evaluacion)
            .then(result => {
                res.status(200).json({
                    ok: true,
                    value: { autoEvaluation: result },
                    msg: `Ticket acción auto-evaluación creada correctamente con id: ${result}`
                });

            })
            .catch(dataError => {
                logger.error(`setNota => createDBAutoEvaluation : params=> ticket_id:${ticket_id} usuario_id:${usuario_id} auto_evaluacion:${auto_evaluacion} error=> ${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear la acción auto-evaluación del ticket. `
                });
            });

    } catch (error) {
        logger.error(`setAutoEvaluation => createDBAutoEvaluation : params=> ticket_id:${ticket_id} usuario_id:${usuario_id} auto_evaluacion:${auto_evaluacion} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

module.exports = {
    setPriority,
    setResponsible,
    setState,
    setHours,
    setNote,
    setAutoEvaluation
}
