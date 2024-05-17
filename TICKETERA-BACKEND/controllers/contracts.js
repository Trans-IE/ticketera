const { response } = require('express');
const { getAllDBContractsLocal, getAllDBContractsExternal, createDBContract, updateDBContract, deleteDBContract, getDBContractsByCompanyLocal, getDBContractsByCompanyExternal } = require('../databases/queries_contracts');
const { logger, loggerCSV } = require('../logger');
const { userType } = require('../helpers/constants');
const crypto = require('crypto');

const getAllContractsLocal = async (req, res = response) => {

    let function_enter_time = new Date();
    logger.info(`==> getAllContractsLocal.`)
    try {

        getAllDBContractsLocal()
            .then(result => {
                logger.info(`<== getAllContractsLocal`);
                loggerCSV.info(`getAllContractsLocal, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de contratos obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getAllContracts => getAllDBContractsLocal error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllContracts error=> ${error}`);
        res.status(500).json({
            ok: false,
            value: [],
            msg: 'Error obteniendo listado de contratos.'
        });
    }
}

const getAllContractsExternal = async (req, res = response) => {
    const { username } = req.body;
    let function_enter_time = new Date();
    logger.info(`==> getAllContractsExternal.`)
    try {

        getAllDBContractsExternal(username)
            .then(result => {
                logger.info(`<== getAllContractsExternal`);
                loggerCSV.info(`getAllContractsExternal, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de contratos obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getAllContractsExternal => getAllDBContractsExternal error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllContractsExternal error=> ${error}`);
        res.status(500).json({
            ok: false,
            value: [],
            msg: 'Error obteniendo listado de contratos.'
        });
    }
}

const getContractsByCompanyLocal = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token.
    const { empresa_id } = req.body;
    let function_enter_time = new Date();
    logger.info(`getContractsByCompany. empresa_id:${empresa_id}`)
    try {
        getDBContractsByCompanyLocal(empresa_id)
            .then(result => {
                logger.info(`<== getDBContractsByCompany`);
                loggerCSV.info(`getDBContractsByCompany, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de contratos obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getDBContractsByCompany => getDBContractsByCompany : params=> empresa_id=> ${empresa_id} error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getDBContractsByCompany : params=> empresa_id=> ${empresa_id} error=> ${error}`);
        res.status(500).json({
            ok: false,
            value: [],
            msg: 'Error obteniendo listado de contratos.'
        });
    }
}

const getContractsByCompanyExternal = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token.
    const { username, empresa_id } = req.body;

    let function_enter_time = new Date();
    logger.info(`getContractsByCompanyExternal. username:${username} empresa_id:${empresa_id}`)
    try {
        getDBContractsByCompanyExternal(username, empresa_id)
            .then(result => {
                logger.info(`<== getContractsByCompanyExternal`);
                loggerCSV.info(`getContractsByCompanyExternal, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de contratos obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getContractsByCompanyExternal => getDBContractsByCompanyExternal : params=> username=>${username} empresa_id=> ${empresa_id} error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getContractsByCompanyExternal : params=>username=>${username} empresa_id=> ${empresa_id} error=> ${error}`);
        res.status(500).json({
            ok: false,
            value: [],
            msg: 'Error obteniendo listado de contratos.'
        });
    }
}

const updateContract = async (req, res = response) => {

    const id = req.params.id;

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { empresa_id, ejecutivo_id, sla_horas_respuesta, sla_horas_provisorio, sla_horas_definitivo, tipo, horas_paquete, notas, habilitado, soporte_onsite, reemplazo_partes, fecha_inicio, fecha_fin } = req.body;
    logger.info(`updateContract id:${id} empresa_id:${empresa_id} ejecutivo_id:${ejecutivo_id} sla_horas_respuesta:${sla_horas_respuesta} sla_horas_provisorio:${sla_horas_provisorio} sla_horas_provisorio:${sla_horas_definitivo} tipo:${tipo} horas_paquete:${horas_paquete} notas:${notas} habilitado:${habilitado} soporte_onsite:${soporte_onsite} reemplazo_partes:${reemplazo_partes} sla_horas_provisorio:${fecha_inicio} fecha_fin:${fecha_fin}`)

    try {
        updateDBContract(id, empresa_id, ejecutivo_id, sla_horas_respuesta, sla_horas_provisorio, sla_horas_definitivo, tipo, horas_paquete, notas, habilitado, soporte_onsite, reemplazo_partes, fecha_inicio, fecha_fin)
            .then(result => {
                console.log(`result: ${result}`);
                if (result === 1) {
                    res.status(200).json({
                        ok: true,
                        value: result,
                        msg: `El contrato '${id}' fue actualizado correctamente.`
                    });
                }
                else {
                    return res.status(401).json({
                        ok: false,
                        msg: `El contrato no pudo ser actualizada en el sistema.-`
                    });
                }

            })
            .catch(dataError => {
                logger.error(`updateContract  => updateDBContract : params=> id=${id}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo actualizar el contrato '${id}' `
                });
            });

    } catch (error) {
        logger.error(`updateContract : params=> id=${id} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Hable con el administrador'
        });
    }
}

const createContract = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { empresa_id, ejecutivo_id, sla_horas_respuesta, sla_horas_provisorio, sla_horas_definitivo, tipo, horas_paquete, notas, habilitado, soporte_onsite, reemplazo_partes, fecha_inicio, fecha_fin } = req.body;

    logger.info(`createContract empresa_id:${empresa_id} ejecutivo_id:${ejecutivo_id} sla_horas_respuesta:${sla_horas_respuesta} sla_horas_provisorio:${sla_horas_provisorio} sla_horas_provisorio:${sla_horas_definitivo} tipo:${tipo} horas_paquete:${horas_paquete} notas:${notas} habilitado:${habilitado} soporte_onsite:${soporte_onsite} reemplazo_partes:${reemplazo_partes} sla_horas_provisorio:${fecha_inicio} fecha_fin:${fecha_fin}`)

    try {

        createDBContract(empresa_id, ejecutivo_id, sla_horas_respuesta, sla_horas_provisorio, sla_horas_definitivo, tipo, horas_paquete, notas, habilitado, soporte_onsite, reemplazo_partes, fecha_inicio, fecha_fin)
            .then(result => {
                res.status(200).json({
                    ok: true,
                    value: { contract: result },
                    msg: `Contrato ${id} creado correctamente`
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

const deleteContract = async (req, res = response) => {

    const id = req.params.id;

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token
    logger.info(`deleteContract id:${id}`)

    try {
        // AL ELIMINAR PUEDE QUE SEA NECESARIO CHEQUEAR PRIVILEGIOS DE USUARIO
        // DEBE VALIDAR SI EXISTE EL ELEMENTO

        deleteDBContract(id)
            .then(result => {
                if (result === 1) {
                    res.status(200).json({
                        ok: true,
                        value: result,
                        msg: `El contrato id: ${id} fue eliminado correctamente`
                    });
                }
                else {
                    //Ocurrio un error no manejado en sql.
                    return res.status(401).json({
                        ok: false,
                        msg: 'El contrato no pudo ser eliminado del sistema.'
                    });
                }
            })
            .catch(dataError => {
                logger.error(`deleteContract => deleteContract: params=> id=${id} error=> ${dataError}`);
                // DESDE CAPA databases recibira un objeto error { code, message, stack }
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
    getAllContractsLocal,
    getAllContractsExternal,
    createContract,
    updateContract,
    deleteContract,
    getContractsByCompanyLocal,
    getContractsByCompanyExternal
}
