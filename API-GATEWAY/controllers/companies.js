const { response } = require('express');
const { logger, loggerCSV } = require('../logger');
const { generarJWT } = require('../helpers/jwt');
const { fetchConToken, fetchSinToken } = require('../helpers/fetch');
const { getUserRol } = require('../helpers/validators');
const { UserRol } = require('../helpers/constants');


const getAllCompanies = async (req, res = response) => {
    const { label: username } = req;
    //const { id } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM}`;
    logger.info(`==> getAllCompanies - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getAllCompanies";

    try {
        logger.info(`getAllCompanies`)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, {}, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== getAllCompanies - username:${username}`);
                loggerCSV.info(`getAllCompanies,${(new Date() - function_enter_time) / 1000}`)
                const { product } = body.value;
                res.status(200).json({
                    ok: true,
                    value: product,
                    msg: 'Listado de compañías obtenido correctamente.'
                });
            } else {
                logger.error(`getAllCompanies : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion loginRouter`)
            res.status(500).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`getAllCompanies : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const createCompany = async (req, res = response) => {
    const { label: username } = req;
    const { nombre, direccion, telefono, mail } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM}`;
    logger.info(`==> createCompany - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/createCompany";

    try {
        logger.info(`createCompany nombre:${nombre} direccion:${direccion} telefono:${telefono} mail:${mail} `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { nombre, direccion, telefono, mail }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== createCompany - username:${username}`);
                loggerCSV.info(`createCompany,${(new Date() - function_enter_time) / 1000}`)
                const { company } = body.value;
                res.status(200).json({
                    ok: true,
                    value: { company },
                    msg: 'Empresa creado correctamente.'
                });
            } else {
                logger.error(`createCompany : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion loginRouter`)
            res.status(500).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }

    } catch (error) {
        logger.error(`createCompany : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const updateCompany = async (req, res = response) => {
    const { label: username } = req;
    const id = req.params.id;
    const { nombre, direccion, telefono, mail, habilitado } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM}`;
    logger.info(`==> updateCompany - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + `/entities/updateCompany/${id}`;

    try {

        logger.info(`updateCompany id:${id} nombre:${nombre} direccion:${direccion} telefono:${telefono} mail:${mail} habilitado:${habilitado}`)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { id, nombre, direccion, telefono, mail, habilitado }, 'PUT');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== updateCompany - username:${username}`);
                loggerCSV.info(`updateCompany,${(new Date() - function_enter_time) / 1000}`)
                const { company } = body.value;
                res.status(200).json({
                    ok: true,
                    value: { company },
                    msg: 'Empresa actualizada correctamente.'
                });
            } else {
                logger.error(`updateCompany : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    //  value: body.value,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion loginRouter`)
            res.status(500).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }
    } catch (error) {
        logger.error(`updateCompany : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const deleteCompany = async (req, res = response) => {

    const { label: username } = req;
    const id = req.params.id;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM}`;
    logger.info(`==> deleteCompany - username:${username}`);

    let url = process.env.HOST_TICKETERA_BACKEND + `/entities/deleteCompany/${id}`;

    try {
        const rol = await getUserRol(username)
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { id }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== deleteCompany - id:${id}`);
                loggerCSV.info(`updateCompany,${(new Date() - function_enter_time) / 1000}`)
                const { company } = body.value;
                res.status(200).json({
                    ok: true,
                    value: { company },
                    msg: 'Empresa actualizada correctamente.'
                });
            } else {
                logger.error(`deleteCompany : ${body.msg}`);
                res.status(200).json({
                    ok: false,
                    msg: body.msg
                });
            }
        } else {
            logger.error(`getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion loginRouter`)
            res.status(500).json({
                ok: false,
                msg: 'No se poseen permisos suficientes para realizar la acción'
            });
        }
    } catch (error) {
        logger.error(`deleteCompany : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }

}

module.exports = {
    getAllCompanies,
    createCompany,
    updateCompany,
    deleteCompany
}
