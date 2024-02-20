const { response } = require('express');
const { logger, loggerCSV } = require('../logger');
const { generarJWT } = require('../helpers/jwt');
const { fetchConToken, fetchSinToken } = require('../helpers/fetch');
const { getUserRol } = require('../helpers/validators');
const { UserRol } = require('../helpers/constants');

const getAllContracts = async (req, res = response) => {
    const { label: username } = req;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}},${UserRol.ClienteADM},${UserRol.ClienteUSR}`;
    logger.info(`==> getAllContracts - username:${username}`);

    try {
        logger.info(`==> getAllContracts`)
        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            if (setRolUser.has(UserRol.LocalSM) || setRolUser.has(UserRol.LocalEJ) || setRolUser.has(UserRol.LocalTEC)) {
                url = process.env.HOST_TICKETERA_BACKEND + "/entities/getAllContractsLocal";
            } else {
                url = process.env.HOST_TICKETERA_BACKEND + "/entities/getAllContractsExternal";
            }
            const resp = await fetchSinToken(url, { username }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== getAllContracts - username:${username}`);
                loggerCSV.info(`getAllContracts,${(new Date() - function_enter_time) / 1000}`)

                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Contrato obtenido correctamente.'
                });
            } else {
                logger.error(`getAllContracts : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion getAllContracts`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`getAllContracts : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getContractsByCompany = async (req, res = response) => {
    const { label: username } = req;
    const { empresa_id } = req.body;

    let function_enter_time = new Date();
    let url = "";

    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.ClienteADM},${UserRol.ClienteUSR},${UserRol.LocalTAC}`;
    logger.info(`==> getContractsByCompany - username:${username} empresa_id:${empresa_id}`);

    try {
        logger.info(`getContractsByCompany  username:${username} empresa_id:${empresa_id}`)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            if (setRolUser.has(UserRol.LocalSM) || setRolUser.has(UserRol.LocalEJ) || setRolUser.has(UserRol.LocalTEC)) {
                url = process.env.HOST_TICKETERA_BACKEND + "/entities/getContractsByCompanyLocal";
            } else {
                url = process.env.HOST_TICKETERA_BACKEND + "/entities/getContractsByCompanyExternal";
            }

            const resp = await fetchSinToken(url, { username, empresa_id }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                logger.info(`<== getContractsByCompany - username:${username}`);
                loggerCSV.info(`getContractsByCompany,${(new Date() - function_enter_time) / 1000}`)

                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Producto obtenido correctamente.'
                });
            } else {
                logger.error(`getContractsByCompany- : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion getContractsByCompany`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`getContractsByCompany : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const createContract = async (req, res = response) => {
    const { label: username } = req;
    const { empresa_id, ejecutivo_id, sla_horas_respuesta, sla_horas_provisorio, sla_horas_definitivo, tipo, horas_paquete, notas, habilitado, soporte_onsite, reemplazo_partes, fecha_inicio, fecha_fin } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}`;
    logger.info(`==> createContract - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/createContract";

    try {
        logger.info(`createContract empresa_id:${empresa_id} ejecutivo_id:${ejecutivo_id} sla_horas_respuesta:${sla_horas_respuesta} sla_horas_provisorio:${sla_horas_provisorio}  sla_horas_definitivo:${sla_horas_definitivo}  tipo:${tipo}  horas_paquete:${horas_paquete}  notas:${notas}  habilitado:${habilitado}  soporte_onsite:${soporte_onsite}  reemplazo_partes:${reemplazo_partes}  fecha_inicio:${fecha_inicio}  fecha_fin:${fecha_fin}`)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { empresa_id, ejecutivo_id, sla_horas_respuesta, sla_horas_provisorio, sla_horas_definitivo, tipo, horas_paquete, notas, habilitado, soporte_onsite, reemplazo_partes, fecha_inicio, fecha_fin }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== createContract - username:${username}`);
                loggerCSV.info(`createContract,${(new Date() - function_enter_time) / 1000}`)
                const { Contract } = body.value;
                res.status(200).json({
                    ok: true,
                    value: { Contract },
                    msg: 'Contrato creado correctamente.'
                });
            } else {
                logger.error(`createContract : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion createContract`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`createContract : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateContract = async (req, res = response) => {
    const { label: username } = req;
    const id = req.params.id;
    const { empresa_id, ejecutivo_id, sla_horas_respuesta, sla_horas_provisorio, sla_horas_definitivo, tipo, horas_paquete, notas, habilitado, soporte_onsite, reemplazo_partes, fecha_inicio, fecha_fin } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}`;
    logger.info(`updateContract empresa_id:${empresa_id} ejecutivo_id:${ejecutivo_id} sla_horas_respuesta:${sla_horas_respuesta} sla_horas_provisorio:${sla_horas_provisorio}  sla_horas_definitivo:${sla_horas_definitivo}  tipo:${tipo}  horas_paquete:${horas_paquete}  notas:${notas}  habilitado:${habilitado}  soporte_onsite:${soporte_onsite}  reemplazo_partes:${reemplazo_partes}  fecha_inicio:${fecha_inicio}  fecha_fin:${fecha_fin}`)
    let url = process.env.HOST_TICKETERA_BACKEND + `/entities/updateContract/${id}`;

    try {

        logger.info(`updateContract id:${id} empresa_id:${empresa_id} ejecutivo_id:${ejecutivo_id} sla_horas_respuesta:${sla_horas_respuesta} sla_horas_provisorio:${sla_horas_provisorio}  sla_horas_definitivo:${sla_horas_definitivo}  tipo:${tipo}  horas_paquete:${horas_paquete}  notas:${notas}  habilitado:${habilitado}  soporte_onsite:${soporte_onsite}  reemplazo_partes:${reemplazo_partes}  fecha_inicio:${fecha_inicio}  fecha_fin:${fecha_fin}`)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { id, empresa_id, ejecutivo_id, sla_horas_respuesta, sla_horas_provisorio, sla_horas_definitivo, tipo, horas_paquete, notas, habilitado, soporte_onsite, reemplazo_partes, fecha_inicio, fecha_fin }, 'PUT');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== updateContract - username:${username}`);
                loggerCSV.info(`updateContract,${(new Date() - function_enter_time) / 1000}`)

                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Contrato actualizado correctamente.'
                });
            } else {
                logger.error(`updateContract : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    //  value: body.value,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion updateContract`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }
    } catch (error) {
        logger.error(`updateContract : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const deleteContract = async (req, res = response) => {

    const { label: username } = req;
    const id = req.params.id;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}`;
    logger.info(`==> deleteContract - username:${username}`);

    let url = process.env.HOST_TICKETERA_BACKEND + `/entities/deleteContract/${id}`;

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

                logger.info(`<== deleteContract - id:${id}`);
                loggerCSV.info(`deleteContract,${(new Date() - function_enter_time) / 1000}`)

                res.status(200).json({
                    ok: true,
                    value: body.value,
                    msg: 'Contrato eliminado correctamente.'
                });
            } else {
                logger.error(`deleteContract : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion deleteContract`)
            res.status(401).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }
    } catch (error) {
        logger.error(`deleteContract : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

module.exports = {
    createContract,
    updateContract,
    deleteContract,
    getAllContracts,
    getContractsByCompany
}