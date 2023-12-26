const { response } = require('express');
const { getAllDBContracts, createDBContract, updateDBContract, deleteDBContract } = require('../databases/queries_contracts');
const { logger, loggerCSV } = require('../logger');
const { userType } = require('../helpers/constants');
const crypto = require('crypto');

const getAllContracts = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token.
    const { label } = req;
    const { offset, limit } = req.body;

    let function_enter_time = new Date();
    logger.info(`getAllContracts. username:${label}  offset:${offset} limit:${limit}`)
    try {

        getAllDBContracts(offset, limit)
            .then(result => {
                logger.info(`<== getAllContracts`);
                loggerCSV.info(`getAllContracts, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    items: result.rows,
                    msg: 'Listado de contratos obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getAllContracts => getAllDBCompanies : params=> username=${label} offset=${offset} limit=${limit} error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllContracts : params=> username=${label} offset=${offset} limit=${limit} error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de contratos.'
        });
    }
}

// CREATE COMPANY
const createContract = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token
    const { label } = req;
    const { id, empresa_id, ejecutivo_id, sla_horas_respuesta, sla_horas_provisorio, sla_horas_definitivo, tipo, horas_paquete, notas, habilitado, soporte_onsite, reemplazo_partes, fecha_inicio, fecha_fin } = req.body;

    logger.info(`createContracts id:${id} empresa_id:${empresa_id} ejecutivo_id:${ejecutivo_id} sla_horas_respuesta:${sla_horas_respuesta} sla_horas_provisorio:${sla_horas_provisorio} sla_horas_provisorio:${sla_horas_definitivo} tipo:${tipo} horas_paquete:${horas_paquete} notas:${notas} habilitado:${habilitado} soporte_onsite:${soporte_onsite} reemplazo_partes:${reemplazo_partes} sla_horas_provisorio:${fecha_inicio} fecha_fin:${fecha_fin}`
    )

    try {

        createDBContract(id, empresa_id, ejecutivo_id, sla_horas_respuesta, sla_horas_provisorio, sla_horas_definitivo, tipo, horas_paquete, notas, habilitado, soporte_onsite, reemplazo_partes, fecha_inicio, fecha_fin)
            .then(result => {
                res.status(201).json({
                    ok: true,
                    value: { contract: result },
                    msg: `Contrato ${nombre} creado correctamente con id: ${contract}`
                });
            })
            .catch(dataError => {
                logger.error(`createContract => createDBContract : params=> id:${id} empresa_id:${empresa_id} ejecutivo_id:${ejecutivo_id} sla_horas_respuesta:${sla_horas_respuesta} sla_horas_provisorio:${sla_horas_provisorio} sla_horas_provisorio:${sla_horas_definitivo} tipo:${tipo} horas_paquete:${horas_paquete} notas:${notas} habilitado:${habilitado} soporte_onsite:${soporte_onsite} reemplazo_partes:${reemplazo_partes} sla_horas_provisorio:${fecha_inicio} fecha_fin:${fecha_fin} error=> ${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear el contrato. `
                });
            });

    } catch (error) {
        logger.error(`createContract => createDBContract : params=> id:${id} empresa_id:${empresa_id} ejecutivo_id:${ejecutivo_id} sla_horas_respuesta:${sla_horas_respuesta} sla_horas_provisorio:${sla_horas_provisorio} sla_horas_provisorio:${sla_horas_definitivo} tipo:${tipo} horas_paquete:${horas_paquete} notas:${notas} habilitado:${habilitado} soporte_onsite:${soporte_onsite} reemplazo_partes:${reemplazo_partes} sla_horas_provisorio:${fecha_inicio} fecha_fin:${fecha_fin} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateContract = async (req, res = response) => {
    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token
    const { label } = req;
    const { id, empresa_id, ejecutivo_id, sla_horas_respuesta, sla_horas_provisorio, sla_horas_definitivo, tipo, horas_paquete, notas, habilitado, soporte_onsite, reemplazo_partes, fecha_inicio, fecha_fin } = req.body;
    logger.info(`updateContract. id:${id} empresa_id:${empresa_id} ejecutivo_id:${ejecutivo_id} sla_horas_respuesta:${sla_horas_respuesta} sla_horas_provisorio:${sla_horas_provisorio} sla_horas_provisorio:${sla_horas_definitivo} tipo:${tipo} horas_paquete:${horas_paquete} notas:${notas} habilitado:${habilitado} soporte_onsite:${soporte_onsite} reemplazo_partes:${reemplazo_partes} sla_horas_provisorio:${fecha_inicio} fecha_fin:${fecha_fin}  `)
    try {

        updateDBCompany(id, empresa_id, ejecutivo_id, sla_horas_respuesta, sla_horas_provisorio, sla_horas_definitivo, tipo, horas_paquete, notas, habilitado, soporte_onsite, reemplazo_partes, fecha_inicio, fecha_fin)
            .then(result => {
                res.status(200).json({
                    ok: true,
                    item: result,
                    msg: `Contrato '${nombre}' fue actualizado correctamente.`
                });
            })
            .catch(dataError => {
                logger.error(`updateContract => updateDBContract : params=> id:${id} empresa_id:${empresa_id} ejecutivo_id:${ejecutivo_id} sla_horas_respuesta:${sla_horas_respuesta} sla_horas_provisorio:${sla_horas_provisorio} sla_horas_provisorio:${sla_horas_definitivo} tipo:${tipo} horas_paquete:${horas_paquete} notas:${notas} habilitado:${habilitado} soporte_onsite:${soporte_onsite} reemplazo_partes:${reemplazo_partes} sla_horas_provisorio:${fecha_inicio} fecha_fin:${fecha_fin} error=> ${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo actualizar el contrato '${id}'`
                });
            });

    } catch (error) {
        logger.error(`updateContract : params=> id:${id} empresa_id:${empresa_id} ejecutivo_id:${ejecutivo_id} sla_horas_respuesta:${sla_horas_respuesta} sla_horas_provisorio:${sla_horas_provisorio} sla_horas_provisorio:${sla_horas_definitivo} tipo:${tipo} horas_paquete:${horas_paquete} notas:${notas} habilitado:${habilitado} soporte_onsite:${soporte_onsite} reemplazo_partes:${reemplazo_partes} sla_horas_provisorio:${fecha_inicio} fecha_fin:${fecha_fin} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Hable con el administrador'
        });
    }

}

const deleteContract = async (req, res = response) => {

    const { id } = req.body;

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token
    logger.info(`deleteContract id:${id}`)

    try {
        deleteDBContract(id)
            .then(result => {
                res.status(200).json({
                    ok: true,
                    item: result,
                    msg: `Contrato id: ${id} fue eliminado correctamente`
                });
            })
            .catch(dataError => {
                logger.error(`deleteCcontract => deleteDBContract: params=> id=${id} error=> ${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo eliminar el contrato '${id}' `
                });

            });
    } catch (error) {
        logger.error(`deleteContract: params=> id=${id} error=> ${error}`);
        res.status(502).json({
            ok: false,
            error: error,
            msg: `No se pudo eliminar el contrato '${id}' `
        });
    }
}

module.exports = {
    getAllContracts,
    createContract,
    updateContract,
    deleteContract
}
