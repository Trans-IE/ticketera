const pooldata = require('./poolpg')

const getAllDBCompanies = (offset, limit) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from empresas where habilitado = true order by nombre asc;', [offset, limit], (error, results) => {
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

const createDBCompany = (nombre, direccion, telefono, mail, codigo) => {
    const return_promise = new Promise((resolve, reject) => {
        
        pooldata.getPool.query('select * from public.f_empresas_create($1,$2,$3,$4,$5)', [nombre, direccion, telefono, mail, codigo], (error, results) => {
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

        pooldata.getPool.query('select * from public.f_empresas_delete($1)', [id], (error, results) => {
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
        pooldata.getPool.query('select * from public.f_empresas_update($1,$2,$3,$4,$5,$6)', [id, nombre, direccion, telefono, mail, habilitado], (error, results) => {
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

module.exports = {
    getAllDBCompanies,
    createDBCompany,

    deleteDBCompany,
    updateDBCompany

}

