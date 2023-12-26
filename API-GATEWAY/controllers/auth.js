const { response } = require('express');
const { logger, loggerCSV } = require('../logger');
const { generarJWT } = require('../helpers/jwt');
const { fetchSinToken } = require('../helpers/fetch');

const loginUser = async (req, res = response) => {
    const { username, password } = req.body;
    let function_enter_time = new Date();
    logger.info(`==> loginUser - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/getUserByLogin";
    try {
        
        const resp = await fetchSinToken(url, { username, password,check_password:true }, 'POST');
        logger.info(`==> loginUser body :${resp}`);
        const body = await resp.json();
        if (body.ok) {
            if (!body.value) {
                return res.status(400).json({
                    ok: false,
                    msg: body.msg
                });
            }
            //let label = body.value.username;
            //const token = await generarJWT(label, body.value.id_user);

            const {user} = body.value;
            const token = await generarJWT(user.usuario);

            logger.info(`<== loginUser - username:${username}`);
            loggerCSV.info(`loginUser,${(new Date() - function_enter_time) / 1000}`)
            res.status(200).json({
                ok: true,
                value: { user, token },
                msg: 'Usuario logueado correctamente.'
            });
        } else {
            logger.error(`loginUser : ${body.msg}`);
            res.status(500).json({
                ok: false,
                value: body.value,
                msg: body.msg
            });
        }
        
        //Respuesta hardcodeada para un login (Sergio)
/* 
        const body = {
            value: 
                {
                "id": 1,
                "tipo": 1,
                "estado": 2,
                "usuario": "spalacio",
                "apellido": "Sergio",
                "nombres": "Palacio",
                "telefono": "",
                "mail": "spalacio@trans.com.ar",
                "empresa_id": 3,
                "roles": [1,2]
            }
        };

        const user = body.value;
        const token = await generarJWT(user.usuario);

        res.status(200).json({
            ok: true,
            value: { user, token }, //Objeto usuario con user
            msg: 'Usuario logueado correctamente.'
        });
 */

    } catch (error) {
        logger.error(`loginUser : ${error.message}`);
        res.status(500).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const revalidarToken = async (req, res = response) => {
    let function_enter_time = new Date();
    const { label } = req;
    logger.info(`==> revalidarToken - label:${label}`);
    try {
        let url = process.env.HOST_TICKETERA_BACKEND + "/getUserByLogin";
        const resp = await fetchSinToken(url, { username: label, password: ' ', check_password: false }, 'POST');
        const body = await resp.json();
        if (body.ok) {
            if (!body.value) {
                return res.status(400).json({
                    ok: false,
                    msg: 'usuario inválido'
                });
            }
            const token = await generarJWT(label)
            logger.info(`<== revalidarToken - label:${label}`);
            loggerCSV.info(`revalidarToken,${(new Date() - function_enter_time) / 1000}`);
            const { user } = body.value;
            res.status(200).json({
                ok: true,
                value: { user , token },
                msg: 'Token revalidado correctamente.'
            });

        } else {
            logger.error(`revalidarToken : ${body.msg}`);
            res.status(500).json({
                ok: false,
                value: body.value,
                msg: body.msg
            });
        }

    } catch (error) {
        logger.error(`revalidarToken : ${error.message}`);
        res.status(502).json({
            ok: false,
            error: error,
            msg: 'Por favor hable con el administrador'
        });
    }

}

module.exports = {
    loginUser,
    revalidarToken
}
