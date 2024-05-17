const pooldata = require('./poolpg')

const getAllDBBrands = () => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from marcas order by id asc;', [], (error, results) => {
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

const createDBBrand = (id, nombre) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_brand_create($1, $2)', [id, nombre], (error, results) => {
            if (error) {

                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_brand_create);
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

        pooldata.getPool.query('select * from tickets.f_ticketera_brand_delete($1)', [id], (error, results) => {
            if (error) {
                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_brand_delete);
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
        pooldata.getPool.query('select * from tickets.f_ticketera_brand_update($1,$2)', [id, nombre], (error, results) => {
            if (error) {
                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_brand_update);
                } catch (error) {
                    reject(error.message);
                }
            }
        })
    });


    return return_promise;
}

const getDBBrandsByCompany = (username, company) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_get_brands_by_company($1, $2);', [username, company], (error, results) => {
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

const getDBBrandsByContract = (username, contract) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_get_brands_by_contract($1, $2);', [username, contract], (error, results) => {
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
    getAllDBBrands,
    createDBBrand,
    deleteDBBrand,
    updateDBBrand,
    getDBBrandsByCompany,
    getDBBrandsByContract
}

