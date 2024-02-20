const pooldata = require('./poolpg')

const getAllDBSummarizeHoursByTechnician = (fechaIni, fechaFin, idUsuario, idEmpresa) => {
    const return_promise = new Promise((resolve, reject) => {
        //2024-02-15,2024-02-15,-1,-1
        pooldata.getPool.query('select responsable, fecha, horas_normales, horas_proyectadas, horas_total, nombre_empresa from f_reporte_tecnicos_resumido_x_dias($1, $2, $3, $4);', [fechaIni, fechaFin, idUsuario, idEmpresa], (error, results) => {
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

const getAllDBHourDetailByTechnician = (fechaIni, fechaFin, idUsuario, idEmpresa, proyecto) => {
    const return_promise = new Promise((resolve, reject) => {
        pooldata.getPool.query('select responsable, fecha, horas_normales, horas_proyectadas, horas_total, nombre_empresa, ticket_id, proyecto from f_reporte_tecnicos_x_dias_v1($1, $2, $3, $4, $5);', [fechaIni, fechaFin, idUsuario, idEmpresa, proyecto], (error, results) => {
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
    getAllDBSummarizeHoursByTechnician,
    getAllDBHourDetailByTechnician
}

