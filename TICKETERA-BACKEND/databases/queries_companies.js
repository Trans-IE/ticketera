const pooldata = require('./poolpg')



const getDBCompanyByUser = (username) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select empresa_id from usuarios where usuario = $1;', [username], (error, results) => {
            if (error) {
                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0]['empresa_id']);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

const getAllDBCompaniesLocal = () => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from empresas where habilitado = true order by nombre asc;', [], (error, results) => {
            if (error) {
                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

const getAllDBCompaniesExternal = (username) => {
    const return_promise = new Promise((resolve, reject) => {
        const query = 'SELECT * FROM empresas WHERE id = (SELECT empresa_id FROM usuarios WHERE usuario = $1 LIMIT 1);';
        const params = [username];

        console.log('Query:', query);
        console.log('Parameters:', params);

        pooldata.getPool.query(query, params, (error, results) => {
            if (error) {
                reject(error.message);
            } else {
                try {
                    resolve(results.rows);
                } catch (error) {
                    reject(error.message);
                }
            }
        });
    });

    return return_promise;
}

const createDBCompany = (nombre, direccion, telefono, mail, codigo) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_empresas_create($1,$2,$3,$4,$5)', [nombre, direccion, telefono, mail, codigo], (error, results) => {
            if (error) {

                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_empresas_create);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

const deleteDBCompany = (id) => {
    const return_promise = new Promise((resolve, reject) => {
        tickets
        pooldata.getPool.query('select * from tickets.f_ticketera_empresas_delete($1)', [id], (error, results) => {
            if (error) {
                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0]['ok']);
                } catch (error) {
                    reject(error.message);
                }
            }
        })
    });

    return return_promise;
}

const updateDBCompany = (id, nombre, direccion, telefono, mail, habilitado) => {
    const return_promise = new Promise((resolve, reject) => {
        pooldata.getPool.query('select * from tickets.f_ticketera_empresas_update($1,$2,$3,$4,$5,$6)', [id, nombre, direccion, telefono, mail, habilitado], (error, results) => {
            if (error) {
                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_empresas_update);
                } catch (error) {
                    reject(error.message);
                }
            }
        })
    });


    return return_promise;
}


module.exports = {
    getAllDBCompaniesLocal,
    getAllDBCompaniesExternal,
    getDBCompanyByUser,
    createDBCompany,
    deleteDBCompany,
    updateDBCompany
}

