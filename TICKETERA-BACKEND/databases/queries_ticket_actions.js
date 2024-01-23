const pooldata = require('./poolpg')

const createDBResponsible = (ticket_id, usuario_id, responsable_id) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from public.f_ticketera_ticket_action_create_responsible($1, $2, $3)', [ticket_id, usuario_id, responsable_id], (error, results) => {
            if (error) {

                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_ticket_action_create_responsible);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

const createDBNote = (ticket_id, usuario_id, notas) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from public.f_ticketera_ticket_action_create_note($1, $2, $3)', [ticket_id, usuario_id, notas], (error, results) => {
            if (error) {

                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_ticket_action_create_note);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

const createDBAutoEvaluation = (ticket_id, usuario_id, auto_evaluacion) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from public.f_ticketera_ticket_action_create_autoevaluation($1, $2, $3)', [ticket_id, usuario_id, auto_evaluacion], (error, results) => {
            if (error) {

                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_ticket_action_create_autoevaluation);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

const createDBPriority = (ticket_id, usuario_id, prioridad) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from public.f_ticketera_ticket_action_create_priority($1, $2, $3)', [ticket_id, usuario_id, prioridad], (error, results) => {
            if (error) {

                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_ticket_action_create_priority);
                } catch (error) {
                    reject(error.message);
                }
            }
        })
    });

    return return_promise;
}

const createDBHours = (ticket_id, usuario_id, horas, fecha_accion_hs) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from public.f_ticketera_ticket_action_create_hours($1, $2, $3, $4)', [ticket_id, usuario_id, horas, fecha_accion_hs], (error, results) => {
            if (error) {

                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_ticket_action_create_hours);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

const createDBFilePath = (ticket_id, usuario_id, archivo) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from public.f_ticketera_ticket_action_create_filePath($1, $2, $3)', [ticket_id, usuario_id, archivo], (error, results) => {
            if (error) {

                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_ticket_action_create_filePath);
                } catch (error) {
                    reject(error.message);
                }
            }
        })
    });

    return return_promise;
}

const createDBState = (ticket_id, usuario_id, estado) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from public.f_ticketera_ticket_action_create_state($1, $2, $3)', [ticket_id, usuario_id, estado], (error, results) => {
            if (error) {

                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_ticket_action_create_state);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

const getDBTicketActionByTicketId = (ticket_id) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from public.f_ticketera_ticket_action_get_by_ticketId($1)', [ticket_id], (error, results) => {
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

const createDBHiddenNote = (ticket_id, usuario_id, nota) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from public.f_ticketera_ticket_action_create_hidden_note($1, $2, $3)', [ticket_id, usuario_id, nota], (error, results) => {
            if (error) {

                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_ticket_action_create_hidden_note);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

module.exports = {
    createDBResponsible,
    createDBNote,
    createDBAutoEvaluation,
    createDBHours,
    createDBPriority,
    createDBState,
    createDBFilePath,
    createDBHiddenNote,
    getDBTicketActionByTicketId
}