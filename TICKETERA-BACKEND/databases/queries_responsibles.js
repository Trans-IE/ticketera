const pooldata = require('./poolpg')

const getAllDBResponsibles = (username, rol) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query("SELECT * FROM obtener_usuarios($1, $2);", [rol, username], (error, results) => {
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
    getAllDBResponsibles

}

