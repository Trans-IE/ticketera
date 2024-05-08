const pooldata = require('./poolpg')

//Obtener todos los productos
const getDBProjectsByCompany = (username, company) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_get_projects_by_company($1, $2)', [username, company], (error, results) => {
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
    getDBProjectsByCompany
}

