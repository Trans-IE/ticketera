const pooldata = require('./poolpg')

const getAllDBContractsLocal = () => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from contratos where habilitado = true;', [], (error, results) => {
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

const getAllDBContractsExternal = (username) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from contratos where empresa_id = (select empresa_id from usuarios where usuario = $1 limit 1);', [username], (error, results) => {
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

const getDBContractsByCompanyLocal = (empresa_id) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_get_contracts_by_company_local($1);', [empresa_id], (error, results) => {
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

const getDBContractsByCompanyExternal = (username, empresa_id) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_get_contracts_by_company_external($1, $2);', [username, empresa_id], (error, results) => {
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

        pooldata.getPool.query('select * from tickets.f_contratos_create($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)', [empresa_id, ejecutivo_id, sla_horas_respuesta, sla_horas_provisorio, sla_horas_definitivo, tipo, horas_paquete, notas, habilitado, soporte_onsite, reemplazo_partes, fecha_inicio, fecha_fin], (error, results) => {
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

        pooldata.getPool.query('select * from tickets.f_ticketera_contract_delete($1)', [id], (error, results) => {
            if (error) {
                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_contract_delete);
                } catch (error) {
                    reject(error.message);
                }
            }
        })
    });

    return return_promise;
}

const updateDBContract = (id, empresa_id, ejecutivo_id, sla_horas_respuesta, sla_horas_provisorio, sla_horas_definitivo, tipo, horas_paquete, notas, habilitado, soporte_onsite, reemplazo_partes, fecha_inicio, fecha_fin) => {
    const return_promise = new Promise((resolve, reject) => {
        pooldata.getPool.query('select * from tickets.f_ticketera_contract_update($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)', [id, empresa_id, ejecutivo_id, sla_horas_respuesta, sla_horas_provisorio, sla_horas_definitivo, tipo, horas_paquete, notas, habilitado, soporte_onsite, reemplazo_partes, fecha_inicio, fecha_fin], (error, results) => {
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

const getDBContractsIdByCompany = (id) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select id from contratos where empresa_id = $1;', [id], (error, results) => {
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
    getAllDBContractsLocal,
    getAllDBContractsExternal,
    getDBContractsByCompanyLocal,
    getDBContractsByCompanyExternal,
    getDBContractsIdByCompany,
    createDBContract,
    deleteDBContract,
    updateDBContract
}

