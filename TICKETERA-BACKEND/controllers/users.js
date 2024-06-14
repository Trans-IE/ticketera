const { response } = require('express');
const { getDBUserByLogin, createDBUser, getDBUserRolByUsername, getDBTypeUserByUser } = require('../databases/queries_users');
const { logger, loggerCSV } = require('../logger');
const { authenticateUser, authenticateUserAzure, authenticateUserAuth0 } = require('../helpers/apiAuthHelper');
const { userType } = require('../helpers/constants');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const getUserByLogin = async (req, res = response) => {
    let function_enter_time = new Date();
    const { username, password, check_password } = req.body;
    logger.info(`==> getUserByLogin - username: ${username} check_password: ${check_password} AUTHENTICATION_MODE: ${process.env.AUTHENTICATION_MODE}`);
    try {

        let formattedUsername = username.indexOf('@') > -1 ? username.substr(0, username.indexOf('@')) : username;

        let user = await getDBUserByLogin(formattedUsername, '', false);

        // TIPO 1: TRAMS TIPO 2: CLIENTE
        if (user.tipo == userType.client || `${process.env.AUTHENTICATION_MODE}` === '2') {
            // convertir password libre en bcrypt
            const validPassword = bcrypt.compareSync(password, user.password);

            // bcrypt no puede ser validado en base de datos 
            // user = await getDBUserByLogin(formattedUsername, password, true );
            logger.info(`<== getUserByLogin`);
            loggerCSV.info(`getUserByLogin,${(new Date() - function_enter_time) / 1000}`)
            if (validPassword) {

                delete user['password'];
                delete user['passwordnew'];
                res.status(200).json({
                    ok: true,
                    value: { user },
                    msg: 'Exito en la llamada'
                });
            } else {
                // probar pass con md5 
                // volver a checkear el login sino devolver lo de abajo 
                const md5Password = password => crypto.createHash('md5').update(password).digest("hex");

                const isValidMD5 = (md5Password(password) == user.passwordnew);

                delete user['password'];
                delete user['passwordnew'];

                if (isValidMD5) {
                    res.status(200).json({
                        ok: true,
                        value: { user },
                        msg: 'Exito en la llamada'
                    });
                } else {
                    res.status(401).json({
                        ok: true,
                        value: { user },
                        msg: 'Credenciales invalidas'
                    });
                }
            }
        } else {

            if (user) {
                if (!check_password) {
                    logger.info(`<== getUserByLogin`);
                    loggerCSV.info(`getUserByLogin,${(new Date() - function_enter_time) / 1000}`)
                    delete user['password'];
                    delete user['passwordnew'];
                    res.status(200).json({
                        ok: true,
                        value: { user },
                        msg: 'Exito en la llamada'
                    });
                } else {
                    switch (`${process.env.AUTHENTICATION_MODE}`) {
                        // AD + LOCAL
                        case '1':
                            if (user.is_ad === 1) {
                                authenticateUser(username, password).then(ok => {
                                    if (ok === true) {
                                        logger.info(`<== getUserByLogin`);
                                        loggerCSV.info(`getUserByLogin,${(new Date() - function_enter_time) / 1000}`)
                                        delete user['password'];
                                        delete user['passwordnew'];
                                        res.status(200).json({
                                            ok: true,
                                            value: { user },
                                            msg: 'Exito en la llamada'
                                        });
                                    } else {
                                        res.status(500).json({
                                            ok: false,
                                            value: { user: null },
                                            msg: 'Error por autenticacion externa.'
                                        });
                                    }
                                }
                                ).catch(error => {
                                    logger.error(`authenticateUser : ${error}`);
                                    res.status(500).json({
                                        ok: false,
                                        value: { user: null },
                                        msg: 'Error. Por favor hable con un administrador'
                                    });
                                })
                            } else {
                                // VALIDO LOCAL
                                // valido password almacenada al usuario con bcrypt
                                const validPassword = bcrypt.compareSync(password, user.password);

                                if (validPassword) {
                                    logger.info(`<== getUserByLogin`);
                                    loggerCSV.info(`getUserByLogin,${(new Date() - function_enter_time) / 1000}`)
                                    delete user['password'];
                                    delete user['passwordnew'];
                                    res.status(200).json({
                                        ok: true,
                                        value: { user },
                                        msg: 'Exito en la llamada'
                                    });
                                } else {

                                    delete user['password'];
                                    delete user['passwordnew'];
                                    res.status(500).json({
                                        ok: false,
                                        value: { user },
                                        msg: 'Credenciales invalidas'
                                    });

                                }
                            }
                            break;
                        case '0':
                            authenticateUserAzure(username, password).then(ok => {
                                if (ok === true) {
                                    logger.info(`<== getUserByLogin`);
                                    loggerCSV.info(`getUserByLogin,${(new Date() - function_enter_time) / 1000}`)
                                    delete user['password'];
                                    delete user['passwordnew'];
                                    res.status(200).json({
                                        ok: true,
                                        value: { user },
                                        msg: 'Exito en la llamada'
                                    });
                                } else {
                                    res.status(500).json({
                                        ok: false,
                                        value: { user: null },
                                        msg: 'Error por autenticacion externa.'
                                    });
                                }
                            }).catch(error => {
                                logger.error(`authenticateUser : ${error}`);
                                res.status(500).json({
                                    ok: false,
                                    value: { user: null },
                                    msg: 'Error. Por favor hable con un administrador'
                                });
                            })
                            break;
                        case '3':
                            authenticateUserAuth0(username, password).then(ok => {
                                if (ok === true) {
                                    logger.info(`<== getUserByLogin`);
                                    loggerCSV.info(`getUserByLogin,${(new Date() - function_enter_time) / 1000}`)
                                    delete user['password'];
                                    delete user['passwordnew'];
                                    res.status(200).json({
                                        ok: true,
                                        value: { user },
                                        msg: 'Exito en la llamada'
                                    });
                                } else {
                                    res.status(500).json({
                                        ok: false,
                                        value: { user: null },
                                        msg: 'Error por autenticacion externa.'
                                    });
                                }
                            }).catch(error => {
                                logger.error(`authenticateUser : ${error}`);
                                res.status(500).json({
                                    ok: false,
                                    value: { user: null },
                                    msg: 'Error. Por favor hable con un administrador'
                                });
                            })
                            break;
                        default:
                            logger.error(`getUserByLogin : no existe modo de autenticacion`);
                            res.status(500).json({
                                ok: false,
                                value: { user: null },
                                msg: 'Error. Por favor hable con un administrador'
                            });
                            break;
                    }
                }
            } else {
                logger.error(`No existe usuario : ${formattedUsername}`);
                res.status(500).json({
                    ok: false,
                    value: { user: null },
                    msg: 'Credenciales invalidas'
                });
            }

        }

    } catch (error) {
        logger.error(`getAgentByLogin : ${JSON.stringify(error)}`);
        res.status(500).json({
            ok: false,
            value: { user: null },
            msg: 'Error. Por favor hable con un administrador'
        });
    }
}

// createCuser es EXCLUSIVO PARA CLIENTES
const createUser = async (req, res = response) => {
    let function_enter_time = new Date();
    // $userName, $password, $surname, $name, $tel, $mail, $code
    const { usuario, password, apellido, nombre, telefono, mail, codigo } = req.body;
    logger.info(`==> createUser - usuario: ${usuario} `);

    try {

        const timestamp = Date.now();
        const timestamp_in_seconds = Math.floor(timestamp / 1000);

        // definir si se le agrega el factor para calculo de password.
        let factor = (usuario.length + nombre.length + apellido.length + timestamp_in_seconds);
        let hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(factor));

        createDBUser(usuario, hashedPassword, apellido, nombre, telefono, mail, codigo)
            .then(id_user_new => {

                // let id_user_new = result.rows[0].f_createDBCompany;

                if (id_user_new > 0) {
                    // http status 201: elemento agregado correctamente
                    // retorno objeto nuevo creado 
                    let user = new Object();
                    user.id = id_user_new;
                    user.usuario = usuario;
                    user.apellido = apellido;
                    user.nombre = nombre;
                    user.telefono = telefono;
                    user.mail = mail;
                    user.codigo = codigo;
                    //let jsonuser = JSON.stringify(user);

                    res.status(201).json({
                        ok: true,
                        value: { user },
                        msg: `usuario ${usuario} creado correctamente con id: ${id_user_new}`
                    });
                    // 401: OPERACION NO AUTORIZADA POR DISTINTMOS MOTIVOS.
                } else if (id_user_new == -1) {
                    return res.status(200).json({
                        ok: false,
                        msg: 'El nombre de usuario (username) ya fue ingresado anteriormente al sistema.'
                    });
                } else if (id_user_new == -2) {
                    return res.status(200).json({
                        ok: false,
                        msg: 'El e-mail del usuario ya fue ingresado anteriormente al sistema.'
                    });
                } else if (id_user_new == -3) {
                    return res.status(200).json({
                        ok: false,
                        msg: 'El codigo de empresa inexistente.'
                    });
                } else {
                    // ocurrio otro error no manejado en capa base de datos (sql).
                    return res.status(200).json({
                        ok: false,
                        msg: `El usuario no pudo ser ingresado al sistema. ID ${id_user_new}`
                    });
                }

            })
            .catch(dataError => {
                // nombre, direccion, telefono, mail, codigoMD5user
                logger.error(`createuser => createDBuser : params=> nombre=${nombre} direccion=${direccion} telefono=${telefono} mail=${mail} error=> ${dataError}`);
                res.status(401).json({
                    ok: false,
                    error: dataError,
                    msg: `No se pudo crear el empresa. `
                });
            });

    } catch (error) {
        logger.error(`createuser => createDBuser : params=> nombre=${nombre} direccion=${direccion} telefono=${telefono} mail=${mail} error=> ${error}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const getUserRol = async (req, res = response) => {
    let function_enter_time = new Date();
    const { label } = req.body;
    logger.info(`==> getUserRol - ${label}`);
    try {
        getDBUserRolByUsername(label)
            .then(result => {
                logger.info(`<== getUserRol`);
                loggerCSV.info(`getUserRol,${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Exito en la llamada'
                });
            })
            .catch(error => {
                logger.error(`getDBUserRolByUsername : ${error}`);
                res.status(401).json({
                    ok: false,
                    value: false,
                    msg: 'Error. Por favor hable con un administrador'
                });
            })

    } catch (error) {
        logger.error(`getUserRolByUsername : ${error.toString()}`);
        res.status(500).json({
            ok: false,
            value: false,
            msg: 'Error. Por favor hable con un administrador'
        });
    }
}

const getTypeByUser = async (req, res = response) => {
    const { username } = req.body;

    let function_enter_time = new Date();
    logger.info(`==> getTypeByUser.`)
    try {
        getDBTypeUserByUser(username)
            .then(result => {
                logger.info(`<== getTypeByUser`);
                loggerCSV.info(`getTypeByUser, ${(new Date() - function_enter_time) / 1000}`)
                res.status(200).json({
                    ok: true,
                    value: result,
                    msg: 'Tipo de usuario obtenido correctamente.'
                });
            })
            .catch(error => {
                logger.error(`getTypeByUser => getDBTypeUserByUser error=> ${error}`);
            })

    } catch (error) {
        logger.error(`getTypeByUser error=> ${error}`);
        res.status(500).json({
            ok: false,
            items: [],
            msg: 'Error obteniendo tipo de usuario.'
        });
    }
}



module.exports = {
    getUserByLogin,
    createUser,
    getUserRol,
    getTypeByUser

}