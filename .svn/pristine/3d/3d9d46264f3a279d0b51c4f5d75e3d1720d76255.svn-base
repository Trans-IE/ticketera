const { response } = require('express');
const { logger, loggerCSV } = require('../logger');
const { generarJWT } = require('../helpers/jwt');
const { fetchConToken, fetchSinToken } = require('../helpers/fetch');

const createCompany = async (req, res = response) => {
    const { label:username } = req;
    const { nombre, direccion, telefono, mail } = req.body;
    let function_enter_time = new Date();
    logger.info(`==> createCompany - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/createCompany";
    try {
        
        logger.info(`createCompany nombre:${nombre} direccion:${direccion} telefono:${telefono} mail:${mail} `)
        const resp = await fetchSinToken(url, { nombre, direccion, telefono, mail }, 'POST');
       // logger.info(`==> createCompany body :${resp}`);
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
                value: {company},
                msg: 'Empresa creado correctamente.'
            });
        } else {
            logger.error(`createCompany : ${body.msg}`);
            res.status(200).json({
                ok: false,
            //  value: body.value,
                msg: body.msg
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
    const { label:username } = req;
    const id = req.params.id;
    const { nombre, direccion, telefono, mail } = req.body;
    let function_enter_time = new Date();
    logger.info(`==> updateCompany - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + `/entities/updateCompany/${id}`;
    try {
        
        logger.info(`updateCompany nombre:${nombre} direccion:${direccion} telefono:${telefono} mail:${mail} `)
        const resp = await fetchSinToken(url, { nombre, direccion, telefono, mail }, 'POST');
       // logger.info(`==> updateCompany body :${resp}`);
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
                value: {company},
                msg: 'Empresa creado correctamente.'
            });
        } else {
            logger.error(`updateCompany : ${body.msg}`);
            res.status(200).json({
                ok: false,
            //  value: body.value,
                msg: body.msg
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

    const { label:username } = req;
    const id = req.params.id;
    
    let function_enter_time = new Date();
    logger.info(`==> deleteCompany - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + `/entities/deleteCompany/${id}`;

    try {

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
    createCompany, 
    updateCompany,
    deleteCompany
}
