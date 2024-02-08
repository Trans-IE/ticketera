const { response } = require('express');
const { getAllDBCompaniesLocal, getAllDBCompaniesExternal, createDBCompany, updateDBCompany, deleteDBCompany } = require('../databases/queries_companies');
const { logger, loggerCSV } = require('../logger');
const { userType } = require('../helpers/constants');
const crypto = require('crypto');

const getAllCompaniesLocal = async (req, res = response) => {

    let function_enter_time = new Date();
    logger.info(`==> getAllCompaniesLocal.`)
    try {
        getAllDBCompaniesLocal()
            .then(result => {
                logger.info(`<== getAllCompaniesLocal`);
                loggerCSV.info(`getAllCompaniesLocal, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de compañias obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getAllCompaniesLocal => getAllCompaniesLocal error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllCompaniesLocal error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de compañías.'
        });
    }
}

const getAllCompaniesExternal = async (req, res = response) => {
    const { username } = req.body;

    let function_enter_time = new Date();
    logger.info(`==> getAllCompaniesExternal.`)
    try {
        getAllDBCompaniesExternal(username)
            .then(result => {
                logger.info(`<== getAllCompaniesExternal`);
                loggerCSV.info(`getAllCompanieExternals, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Listado de compañias obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getAllCompaniesExternal => getAllCompaniesExternal error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getAllCompanies error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo listado de compañías.'
        });
    }
}

// CREATE COMPANY
const createCompany = async (req, res = response) => {

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token
    const { label } = req;

    const { nombre, direccion, telefono, mail } = req.body;

    logger.info(`createCompany nombre:${nombre} direccion:${direccion} telefono:${telefono} mail:${mail} `)

    const codigoMD5Company = nombre => crypto.createHash('md5').update(nombre).digest("hex");

    try {

        createDBCompany(nombre, direccion, telefono, mail, codigoMD5Company(nombre))
            .then(id_company_new => {

                // let id_company_new = result.rows[0].f_createDBCompany;

                if (id_company_new > 0) {
                    // http status 201: elemento agregado correctamente
                    // retorno objeto nuevo creado 
                    let company = new Object();
                    company.id = id_company_new;
                    company.nombre = nombre;
                    company.direccion = direccion;
                    company.telefono = telefono;
                    company.mail = mail;
                    company.codigo = codigoMD5Company;
                    //let jsoncompany = JSON.stringify(company);

                    res.status(200).json({
                        ok: true,
                        value: { company },
                        msg: `empresa ${nombre} creado correctamente con id: ${id_company_new}`
                    });
                    // 401: OPERACION NO AUTORIZADA POR DISTINTMOS MOTIVOS.
                } else if (id_company_new == -1) {
                    return res.status(200).json({
                        ok: false,
                        msg: 'El nombre de empresa ya fue ingresado anteriormente al sistema.'
                    });
                } else if (id_company_new == -2) {
                    return res.status(200).json({
                        ok: false,
                        msg: 'El e-mail de empresa ya fue ingresado anteriormente al sistema.'
                    });
                } else if (id_company_new == -3) {
                    return res.status(200).json({
                        ok: false,
                        msg: 'El codigo de empresa ya fue ingresado anteriormente al sistema.'
                    });
                } else {
                    // ocurrio otro error no manejado en capa base de datos (sql).
                    return res.status(200).json({
                        ok: false,
                        msg: `El empresa no pudo ser ingresado al sistema. ID ${id_company_new}`
                    });
                }
            })
            .catch(dataError => {
                // nombre, direccion, telefono, mail, codigoMD5Company
                logger.error(`createCompany => createDBCompany : params=> nombre=${nombre} direccion=${direccion} telefono=${telefono} mail=${mail} error=> ${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear el empresa. `
                });
            });

    } catch (error) {
        logger.error(`createCompany => createDBCompany : params=> nombre=${nombre} direccion=${direccion} telefono=${telefono} mail=${mail} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateCompany = async (req, res = response) => {

    const id = req.params.id;

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token

    const { nombre, direccion, telefono, mail, habilitado } = req.body;
    logger.info(`updateCompany. id:${id}  nombre:${nombre} direccion:${direccion} telefono:${telefono} mail:${mail} habilitado:${habilitado}  `)
    try {

        updateDBCompany(id, nombre, direccion, telefono, mail, habilitado)
            .then(id_result => {

                // let id_result = result.rows[0].f_r2_skill_update; 

                if (id_result > 0) {
                    // http status 200: elemento actualizado correctamente
                    // retorno objeto actualizado
                    let objEmpresa = new Object();
                    objEmpresa.id = id;
                    objEmpresa.nombre = nombre;
                    objEmpresa.direccion = direccion;
                    objEmpresa.telefono = telefono;
                    objEmpresa.mail = mail;
                    objEmpresa.habilitado = habilitado;

                    res.status(200).json({
                        ok: true,
                        item: objEmpresa,
                        msg: `Empresa '${nombre}' fue actualizado correctamente.`
                    });
                }
                else if (id_result == -1) {
                    // el vdn NO EXISTE: retorno msg "vdn no pudo ser encontrado". retorno HTTP 404 recurso no encontrado.
                    return res.status(404).json({
                        ok: false,
                        msg: `La Empresa id ${id} no pudo ser encontrada en el sistema.`
                    });
                }
                else {
                    // ocurrio otro error no manejado en sql.
                    return res.status(401).json({
                        ok: false,
                        msg: 'La Empresa no pudo ser actualizada en el sistema.-'
                    });
                }

            })
            .catch(dataError => {
                logger.error(`updateCompany => updateDBCompany : params=> id=${id} nombre=${nombre} direccion=${direccion} telefono=${telefono} mail=${mail} habilitado=${habilitado} error=> ${dataError}`);
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo actualizar la empresa '${nombre}' `
                });
            });

    } catch (error) {
        logger.error(`updateCompany : params=> id=${id} nombre=${nombre} direccion=${direccion} telefono=${telefono} mail=${mail} habilitado=${habilitado} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Hable con el administrador'
        });
    }

}

const deleteCompany = async (req, res = response) => {

    const id = req.params.id;

    // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes 
    // alli identifica estos datos desencriptando el hash x-token
    logger.info(`deleteCompany id:${id}`)

    try {
        // AL ELIMINAR PUEDE QUE SEA NECESARIO CHEQUEAR PRIVILEGIOS DE USUARIO
        // DEBE VALIDAR SI EXISTE EL ELEMENTO

        deleteDBCompany(id)
            .then(id_result => {

                // LA FUNCION FINALIZO SU EJECUCION 
                // let id_result = result.rows[0].f_r2_vdn_delete;

                if (id_result > 0) {
                    // http status 200: elemento actualizado correctamente
                    // retorno objeto actualizado
                    let objempresa = new Object();
                    objempresa.deleted_id = id;

                    res.status(200).json({
                        ok: true,
                        item: objempresa,
                        msg: `Empresa id: ${id} fue eliminado correctamente`
                    });
                }
                else if (id == -1) {
                    // la empresa NO EXISTE: retorno msg "empresa no pudo ser encontrado". retorno HTTP 404 recurso no encontrado.
                    return res.status(404).json({
                        ok: false,
                        msg: `Empresa id: ${id} no pudo ser encontrado en el sistema.`
                    });
                }
                else {
                    // ocurrio otro error no manejado en sql.
                    return res.status(401).json({
                        ok: false,
                        msg: 'La Empresa no pudo ser eliminado del sistema.'
                    });
                }
            })
            .catch(dataError => {
                logger.error(`deleteCompany => deleteDBCompany: params=> id=${id} error=> ${dataError}`);
                // DESDE CAPA databases recibira un objeto error { code, message, stack }
                res.status(501).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo eliminar la empresa '${id}' `
                });

            });
    } catch (error) {
        logger.error(`deleteCompany: params=> id=${id} error=> ${error}`);
        res.status(502).json({
            ok: false,
            error: error,
            msg: `No se pudo eliminar la empresa '${id}' `
        });
    }
}

module.exports = {
    getAllCompaniesLocal,
    getAllCompaniesExternal,
    createCompany,
    updateCompany,
    deleteCompany
}
