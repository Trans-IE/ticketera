const { response } = require('express');
const { logger, loggerCSV } = require('../logger');
const { generarJWT } = require('../helpers/jwt');
const { fetchConToken, fetchSinToken } = require('../helpers/fetch');
const { getUserRol } = require('../helpers/validators');
const { UserRol } = require('../helpers/constants');

const getProduct = async (req, res = response) => {
    const { label: username } = req;
    const { id } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM}`;
    logger.info(`==> getProduct - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getProduct";

    try {
        logger.info(`getProduct id:${id} `)

        const rol = await getUserRol(username);
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

                logger.info(`<== getProduct - username:${username}`);
                loggerCSV.info(`getProduct,${(new Date() - function_enter_time) / 1000}`)
                const { product } = body.value;
                res.status(200).json({
                    ok: true,
                    value: product,
                    msg: 'Producto obtenido correctamente.'
                });
            } else {
                logger.error(`getProduct : ${body.msg}`);
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
        logger.error(`getProduct : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const createProduct = async (req, res = response) => {
    const { label: username } = req;
    const { nombre, modelo, habilitado, marca_id } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM}`;
    logger.info(`==> createProduct - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/createProduct";

    try {
        logger.info(`createProduct nombre:${nombre} modelo:${modelo} habilitado:${habilitado} marca_id:${marca_id} `)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { nombre, modelo, habilitado, marca_id }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== createProduct - username:${username}`);
                loggerCSV.info(`createProduct,${(new Date() - function_enter_time) / 1000}`)
                const { products } = body.value;
                res.status(200).json({
                    ok: true,
                    value: { products },
                    msg: 'Producto creado correctamente.'
                });
            } else {
                logger.error(`createProduct : ${body.msg}`);
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
        logger.error(`createProduct : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const updateProduct = async (req, res = response) => {
    const { label: username } = req;
    const { id, nombre, modelo, habilitado, marca_id } = req.body;
    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM}`;
    logger.info(`==> updateProduct - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + `/entities/updateProduct`;

    try {

        logger.info(`updateProduct id:${id} nombre:${nombre} modelo:${modelo} habilitado:${habilitado} marca_id:${marca_id}`)

        const rol = await getUserRol(username);
        let arrRolExclusive = rolExclusive.split(',').map(Number);
        let setRolUser = new Set(rol.split(',').map(Number));
        let resultado = arrRolExclusive.some(numero => setRolUser.has(numero));

        if (resultado) {
            const resp = await fetchSinToken(url, { id, nombre, modelo, habilitado, marca_id }, 'POST');
            console.log(resp);
            const body = await resp.json();
            if (body.ok) {
                if (!body.value) {
                    return res.status(400).json({
                        ok: false,
                        msg: body.msg
                    });
                }

                logger.info(`<== updateProduct - username:${username}`);
                loggerCSV.info(`updateProduct,${(new Date() - function_enter_time) / 1000}`)
                const { Products } = body.value;
                res.status(200).json({
                    ok: true,
                    value: { Products },
                    msg: 'Empresa actualizada correctamente.'
                });
            } else {
                logger.error(`updateProduct : ${body.msg}`);
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
        logger.error(`updateProduct : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const deleteProduct = async (req, res = response) => {

    const { label: username } = req;
    const { id } = req.body;

    let function_enter_time = new Date();
    const rolExclusive = `${UserRol.LocalSM}`;
    logger.info(`==> deleteProducts - username:${username}`);

    let url = process.env.HOST_TICKETERA_BACKEND + `/entities/deleteProduct`;

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

                logger.info(`<== deleteProduct - id:${id}`);
                loggerCSV.info(`updateProduct,${(new Date() - function_enter_time) / 1000}`)
                const { products } = body.value;
                res.status(200).json({
                    ok: true,
                    value: { products },
                    msg: 'Empresa actualizada correctamente.'
                });
            } else {
                logger.error(`deleteProduct : ${body.msg}`);
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
        logger.error(`deleteProduct : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }

}

module.exports = {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
