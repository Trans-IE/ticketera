const pooldata = require('./poolpg')

const getAllDBContracts = (offset, limit) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from contratos where habilitado = true;', [offset, limit], (error, results) => {
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

const createDBContract = (empresa_id, ejecutivo_id, sla_horas_respuesta, sla_horas_provisorio, sla_horas_definitivo, tipo, horas_paquete, notas, habilitado, soporte_onsite, reemplazo_partes, fecha_inicio, fecha_fin) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from public.f_contratos_create($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)', [id, empresa_id, ejecutivo_id, sla_horas_respuesta, sla_horas_provisorio, sla_horas_definitivo, tipo, horas_paquete, notas, habilitado, soporte_onsite, reemplazo_partes, fecha_inicio, fecha_fin], (error, results) => {
            if (error) {

                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_contratos_create);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

const deleteDBContract = (id) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from public.f_contract_delete($1)', [id], (error, results) => {
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

const updateDBContract = (ejecutivo_id, sla_horas_respuesta, sla_horas_provisorio, sla_horas_definitivo, tipo, horas_paquete, soporte_onsite, reemplazo_partes, fecha_inicio, fecha_fin, notas) => {
    const return_promise = new Promise((resolve, reject) => {
        pooldata.getPool.query('select * from public.f_ticketera_contract_update($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)', [ejecutivo_id, sla_horas_respuesta, sla_horas_provisorio, sla_horas_definitivo, tipo, horas_paquete, soporte_onsite, reemplazo_partes, fecha_inicio, fecha_fin, notas], (error, results) => {
            if (error) {
                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_contract_update);
                } catch (error) {
                    reject(error.message);
                }
            }
        })
    });


    return return_promise;
}

module.exports = {
    getAllDBContracts,
    createDBContract,
    deleteDBContract,
    updateDBContract
}

