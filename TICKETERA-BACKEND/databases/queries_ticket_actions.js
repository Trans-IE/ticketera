const pooldata = require('./poolpg')

const createDBResponsible = (ticket_id, responsable_id, username) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_ticket_action_create_responsible($1, $2, $3)', [ticket_id, responsable_id, username], (error, results) => {
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

const createDBNote = (ticket_id, notas, usernam4) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_ticket_action_create_note($1, $2, $3)', [ticket_id, notas, usernam4], (error, results) => {
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
                    resolve(results.rows[0]);
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
                    resolve(results.rows[0]);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

const createDBProjectedHours = (userId, ticket_id, effectiveStart, effectiveEnd, percentage, comentario, isUpdate) => {
    const return_promise = new Promise((resolve, reject) => {
        // Log the parameters before making the database call

        pooldata.getPool.query('select * from tickets.f_ticketera_action_create_projected_hours($1, $2, $3, $4, $5, $6, $7)', [userId, ticket_id, effectiveStart, effectiveEnd, percentage, comentario, isUpdate], (error, results) => {
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

const createDBHoursByList = (ticket_id, horas, fecha_accion_hs, username) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_ticket_action_create_hours($1, $2, $3, $4)', [ticket_id, horas, fecha_accion_hs, username], (error, results) => {
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

const createDBFilePath = (ticket_id, archivo, username) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_ticket_action_create_filePath($1, $2, $3)', [ticket_id, archivo, username], (error, results) => {
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

const createDBState = (ticket_id, estado, username) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_ticket_action_create_state($1, $2, $3)', [ticket_id, estado, username], (error, results) => {
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

const getDBTicketActionByTicketId = (ticket_id, empresaIdAux, tipoUsuario) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_ticket_action_get_by_ticketId($1, $2, $3)', [ticket_id, empresaIdAux, tipoUsuario], (error, results) => {

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

const createDBHiddenNote = (ticket_id, nota, username) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_ticket_action_create_hidden_note($1, $2, $3)', [ticket_id, nota, username], (error, results) => {
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
                    resolve(results.rows);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

const getDBTicketTotalHours = (ticket_id) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query("SELECT * FROM tickets.f_ticketera_get_ticket_total_hours($1);", [ticket_id], (error, results) => {
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

const getDBTicketHours = (ticket_id) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query("SELECT * FROM tickets.f_ticketera_get_ticket_hours($1);", [ticket_id], (error, results) => {
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

const getDBTicketProjectedHours = (ticket_id) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query("SELECT * FROM tickets.f_ticketera_get_ticket_projected_hours($1);", [ticket_id], (error, results) => {
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

const createDBArea = (empesa_id, nombre) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query("SELECT * FROM tickets.f_ticketera_create_area($1, $2);", [empesa_id, nombre], (error, results) => {
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

const getAllDBFilesPaths = (ticket_id, username, offset, limit) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_ticket_action_getAllFilesPaths_by_ticketId($1, $2, $3, $4)', [ticket_id, username, offset, limit], (error, results) => {

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
    createDBResponsible,
    createDBNote,
    createDBAutoEvaluation,
    createDBHours,
    createDBPriority,
    createDBState,
    createDBFilePath,
    createDBHiddenNote,
    getDBTicketActionByTicketId,
    getAllDBUsers,
    getAllDBUsersByCompany,
    getDBTicketDetail,
    createDBHoursByList,
    createDBProjectedHours,
    getDBTicketHours,
    getDBTicketProjectedHours,
    getDBTicketTotalHours,
    createDBArea,
    getAllDBFilesPaths
}