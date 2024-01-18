const pooldata = require('./poolpg')

const getAllDBResponsibles = () => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query("SELECT id, apellido || ', ' || nombres AS nombre_completo FROM public.usuarios WHERE habilitado = true;", [], (error, results) => {
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

