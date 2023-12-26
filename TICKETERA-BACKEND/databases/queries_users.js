const pooldata = require('./poolpg')

const getDBUserByLogin = (username, password, check_password) => {
    const return_promise = new Promise((resolve, reject) => {
        pooldata.getPool.query('select * from public.f_login($1,$2,$3)', [username, password, check_password], (error, results) => {
            if (error) {
                let errorData = new Object();
                errorData.code = error.code;
                errorData.message = error.message;
                errorData.stack = error.stack;

                reject(errorData);

            }
            else {
                try {
                    if (results.rows && results.rows[0]) {
                        resolve(results.rows[0]);
                    } else {
                        resolve(null);
                    }
                } catch (error) {
                    let errorData = new Object();
                    errorData.code = error.code;
                    errorData.message = error.message;
                    errorData.stack = error.stack;

                    reject(errorData);
                }
            }
        })
    });
    return return_promise;
}

const createDBUser = (usuario, password, apellido, nombre, telefono, mail, codigo) => {
    const return_promise = new Promise((resolve, reject) => {
        
        pooldata.getPool.query('select * from public.f_usuarios_create($1,$2,$3,$4,$5,$6,$7)', [usuario, password, apellido, nombre, telefono, mail, codigo], (error, results) => {
            if (error) {

                reject(error.message);
            } else {
                try {
                    resolve(results.rows[0].f_usuarios_create);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

const getDBUserRolByUsername = (label) => {
    const return_promise = new Promise((resolve, reject) => {
        pooldata.getPool.query('select * from public.f_ticketera_user_get_rol_by_username($1)', [label], (error, results) => {
            if (error) {
                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0]['o_rol']);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}


module.exports = {
    getDBUserByLogin, 
    createDBUser,
    getDBUserRolByUsername
}
