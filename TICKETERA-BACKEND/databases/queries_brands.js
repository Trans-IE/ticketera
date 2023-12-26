const pooldata = require('./poolpg')

const getAllDBBrands = (offset, limit) => {
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

const createDBBrand = (nombre) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from public.f_empresas_create($1)', [nombre], (error, results) => {
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

const deleteDBBrand = (id) => {
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

const updateDBBrand = (id, nombre) => {
    const return_promise = new Promise((resolve, reject) => {
        pooldata.getPool.query('select * from public.f_empresas_update($1,$2)', [id, nombre], (error, results) => {
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
    getAllDBBrands,
    createDBBrand,
    deleteDBBrand,
    updateDBBrand

}

