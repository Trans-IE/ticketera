const pooldata = require('./poolpg')

const createDBResponsible = (ticket_id, responsable_id, username) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_ticket_action_create_responsible($1, $2, $3)', [ticket_id, responsable_id, username], (error, results) => {
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

const createDBNote = (ticket_id, notas, username) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_ticket_action_create_note($1, $2, $3)', [ticket_id, notas, username], (error, results) => {
            let objreturn = new Object();

            if (error) {
                objreturn.result = -1;
                objreturn.error_message = error.message;
                objreturn.rows = [];

                resolve(objreturn);
            }
            else {
                try {
                    objreturn.result = 1;
                    objreturn.error_message = "";
                    objreturn.rows = results.rows[0].f_ticketera_ticket_action_create_note;

                    resolve(objreturn);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

const createDBAutoEvaluation = (ticket_id, auto_evaluacion, username) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_ticket_action_create_autoevaluation($1, $2, $3)', [ticket_id, auto_evaluacion, username], (error, results) => {
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

const createDBPriority = (ticket_id, prioridad, username) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_ticket_action_create_priority($1, $2, $3)', [ticket_id, prioridad, username], (error, results) => {
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

const createDBHours = (ticket_id, horas, fecha_accion_hs, username) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_ticket_action_create_hours($1, $2, $3, $4)', [ticket_id, horas, fecha_accion_hs, username], (error, results) => {
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

const createDBHoursByList = (ticket_id, horas, fecha_accion_hs, username) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_ticket_action_create_hours($1, $2, $3, $4)', [ticket_id, horas, fecha_accion_hs, username], (error, results) => {
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

const createDBExtraHours = (ticket_id, fecha_inicio, fecha_fin, porcentaje, detalle, estado, user_id, id) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from public.f_ticket_horas_extras($1, $2, $3, $4, $5, $6, $7, $8)', [ticket_id, fecha_inicio, fecha_fin, porcentaje, detalle, estado, user_id, id], (error, results) => {
            if (error) {

                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticket_horas_extras);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

const createDBFilePath = (ticket_id, archivo, username) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_ticket_action_create_filePath($1, $2, $3)', [ticket_id, archivo, username], (error, results) => {
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

const createDBState = (ticket_id, estado, username) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_ticket_action_create_state($1, $2, $3)', [ticket_id, estado, username], (error, results) => {
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

const getDBTicketActionByTicketId = (ticket_id, username) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_ticket_action_get_by_ticketId($1, $2)', [ticket_id, username], (error, results) => {

            let objreturn = new Object();

            if (error) {
                objreturn.result = -1;
                objreturn.error_message = error.message;
                objreturn.rows = [];

                resolve(objreturn);
            }
            else {
                try {
                    objreturn.result = 1;
                    objreturn.error_message = "";
                    objreturn.rows = results.rows;

                    resolve(objreturn);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

const createDBHiddenNote = (ticket_id, nota, username) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_ticket_action_create_hidden_note($1, $2, $3)', [ticket_id, nota, username], (error, results) => {
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

const getAllDBUsers = (username, rol) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query("SELECT * FROM tickets.f_ticketera_get_users($1, $2);", [rol, username], (error, results) => {
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

const getAllDBUsersByCompany = (username, tipoUsuario, empresaId, includemyself) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query("SELECT * FROM tickets.f_ticketera_get_users_by_company($1, $2, $3, $4);", [username, tipoUsuario, empresaId, includemyself], (error, results) => {
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

const getDBTicketDetail = (ticket_id, userId) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query("SELECT * FROM tickets.f_get_ticket($1, $2);", [ticket_id, userId], (error, results) => {
            if (error) {
                reject(error.message);
            }
            else {
                try {
                    console.log(ticket_id, userId);
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
    createDBResponsible,
    createDBNote,
    createDBAutoEvaluation,
    createDBHours,
    createDBPriority,
    createDBState,
    createDBFilePath,
    createDBHiddenNote,
    getDBTicketActionByTicketId,
    createDBExtraHours,
    getAllDBUsers,
    getAllDBUsersByCompany,
    getDBTicketDetail,
    createDBHoursByList
}