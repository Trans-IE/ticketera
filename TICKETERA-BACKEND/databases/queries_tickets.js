const pooldata = require('./poolpg')

const createDBTicketClient = (userId, empresaId, contratoId, productoId, tipoFalla, title, description, nroSerie, nodo, array_user_id_notif) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from public.f_ticket_create($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)', [userId, empresaId, contratoId, productoId, tipoFalla, title, description, nroSerie, nodo, 0, 0, 0, 0, '', array_user_id_notif], (error, results) => {
            if (error) {
                reject(error.message);
            } else {
                try {
                    resolve(results.rows[0].f_ticketera_ticket_create);
                } catch (error) {
                    reject(error.message);
                }
            }
        });
    });

    return return_promise;
};

const createDBTicketTrans = (userId, empresaId, contratoId, productoId, tipoFalla, title, description, nroSerie, nodo, esProyecto, padreId, preventaId, vendedorId, tkEnPartner, areaId, array_user_id_notif) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from public.f_ticket_create($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)', [userId, empresaId, contratoId, productoId, tipoFalla, title, description, nroSerie, nodo, esProyecto, padreId, preventaId, vendedorId, tkEnPartner, areaId, array_user_id_notif], (error, results) => {
            if (error) {
                reject(error.message);
            } else {
                try {
                    resolve(results.rows[0].f_ticket_create);
                } catch (error) {
                    reject(error.message);
                }
            }
        });
    });

    return return_promise;
};

const updateDBTicketTrans = (userId, empresaId, tipoFalla, cliente, partner, rma, bug, comment, nroSerie, nodo, titulo, causaRaiz, preventa, vendedor, producto, esProjecto, proyecton, array_user_id_notif) => {
    const return_promise = new Promise((resolve, reject) => {
        pooldata.getPool.query('select * from public.f_ticket_edit($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)', [userId, empresaId, tipoFalla, cliente, partner, rma, bug, comment, nroSerie, nodo, titulo, causaRaiz, preventa, vendedor, producto, esProjecto, proyecton, array_user_id_notif], (error, results) => {
            if (error) {

                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticket_edit);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

const deleteDBTicket = (id) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_ticket_delete($1)', [id], (error, results) => {
            if (error) {

                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_ticket_delete);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

const getAllDBTicketsByFilter = (titulo, causaRaiz, ticketPartner, empresaId, productoId, responsableId, numeroId, prioridad, estado, tipoFalla, dateFrom, dateTo, tipoUsuario, usuarioId, tipoTicket, offset, orderBy, orderByType, limit) => {
    const return_promise = new Promise((resolve, reject) => {
        pooldata.getPool.query('select * from tickets.f_search_getticketsdataset($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19);', [titulo, causaRaiz, ticketPartner, empresaId, productoId, responsableId, numeroId, prioridad, estado, tipoFalla, dateFrom, dateTo, tipoUsuario, usuarioId, tipoTicket, offset, orderBy, orderByType, limit], (error, results) => {
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

const getAllDBAreas = () => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('SELECT * FROM public.area;', [], (error, results) => {
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

const getAllDBResponsiblesByArea = (area_id) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('SELECT * FROM tickets.f_ticketera_ticket_get_responsible_by_area($1);', [area_id], (error, results) => {
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

const getAllDBFailTypes = () => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('SELECT * FROM public.tiposfalla;', [], (error, results) => {
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

const getAllDBTicketTypes = () => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('SELECT id_tipo, descripcion FROM public.tipo_ticket;', [], (error, results) => {
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

const changeAssingDBTicket = (userId, ticketId, responsableId) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from f_ticket_assign($1, $2, $3, $4);', [userId, ticketId, responsableId, ''], (error, results) => {
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

const changeStateDBTicket = (userId, ticketId, idState) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from f_ticket_change_state($1, $2, $3, $4);', [userId, ticketId, idState, ''], (error, results) => {
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
    getAllDBTicketsByFilter,
    createDBTicketTrans,
    updateDBTicketTrans,
    createDBTicketClient,
    deleteDBTicket,
    getAllDBFailTypes,
    getAllDBTicketTypes,
    changeAssingDBTicket,
    changeStateDBTicket,
    getAllDBAreas,
    getAllDBResponsiblesByArea
}