const pooldata = require('./poolpg')

//Obtener todos los productos
const getDBProductByBrand = (marca_id) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from productos where marca_id = ($1)', [marca_id], (error, results) => {
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

//Obtener todos los productos
const getDBProductByBrandAndContract = (marca_id, contract) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_get_product_by_brand_and_contract($1, $2)', [marca_id, contract], (error, results) => {
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


//Obtener todos los productos
const getAllDBProducts = () => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('SELECT * from productos order by id asc;', [], (error, results) => {
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

const getDBProduct = (id) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('SELECT * FROM tickets.f_ticketera_product_get_product_by_id($1);', [id], (error, results) => {
            if (error) {
                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0]);
                } catch (error) {
                    reject(error.message);
                }
            }
        })
    });

    return return_promise;
}

const createDBProduct = (nombre, modelo, habilitado, marca_id) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_product_create($1,$2,$3,$4)', [nombre, modelo, habilitado, marca_id], (error, results) => {
            if (error) {

                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_product_create);
                } catch (error) {
                    reject(error.message);
                }
            }
        })
    });

    return return_promise;
}

const deleteDBProduct = (id) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_product_delete($1)', [id], (error, results) => {
            if (error) {
                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_product_delete);
                } catch (error) {
                    reject(error.message);
                }
            }
        })
    });

    return return_promise;
}

const updateDBProduct = (id, nombre, modelo, habilitado, marca_id) => {
    const return_promise = new Promise((resolve, reject) => {
        pooldata.getPool.query('select * from tickets.f_ticketera_product_update($1,$2,$3,$4,$5)', [id, nombre, modelo, habilitado, marca_id], (error, results) => {
            if (error) {
                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_product_update);
                } catch (error) {
                    reject(error.message);
                }
            }
        })
    });

    return return_promise;
}

module.exports = {
    getDBProduct,
    getAllDBProducts,
    createDBProduct,
    deleteDBProduct,
    updateDBProduct,
    getDBProductByBrand,
    getDBProductByBrandAndContract
}

