const pooldata = require('./poolpg')

const createDBTicketClient = (userId, empresaId, contratoId, productoId, tipoFalla, title, description, nroSerie, nodo, array_user_id_notif) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from f_ticket_create($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)', [userId, empresaId, contratoId, productoId, tipoFalla, title, description, nroSerie, nodo, 0, 0, 0, 0, '', array_user_id_notif], (error, results) => {
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

const createDBTicketTrans = (userId, empresaId, contratoId, productoId, tipoFalla, title, description, nroSerie, nodo, esProyecto, padreId, preventaId, vendedorId, tkEnPartner, array_user_id_notif) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from f_ticket_create($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)', [userId, empresaId, contratoId, productoId, tipoFalla, title, description, nroSerie, nodo, esProyecto, padreId, preventaId, vendedorId, tkEnPartner, array_user_id_notif], (error, results) => {
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
        pooldata.getPool.query('select * from f_ticket_edit($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)', [userId, empresaId, tipoFalla, cliente, partner, rma, bug, comment, nroSerie, nodo, titulo, causaRaiz, preventa, vendedor, producto, esProjecto, proyecton, array_user_id_notif], (error, results) => {
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

        pooldata.getPool.query('select * from public.f_ticketera_ticket_delete($1)', [id], (error, results) => {
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


//TODO: Nuevo parámetros para versión 3 del nuevo function de la obtención de tickets
//p_titulo,p_causa_raiz,p_ticket_partner,p_empresa_id,p_producto_id,p_responsable_id,p_numero_id,p_prioridad,p_estado,p_tipo_estado,p_tipo_falla,p_tktip,p_dateFrom,p_dateTo,p_tksinac,p_tipo_usuario,p_usuario_id,p_offset,p_estadoid,p_prioridadid,p_tipoid,p_tipoticket,p_order_by,p_order_by_type,p_limit
//Function: select * from f_search_getticketsdataset_v2($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25);
const getAllDBTicketsByFilter = (pCadenaSearch, tipoUsuario, userId, offset, estadoId, prioridadId, tipoId, tipoTicket, orderBy, orderByType, limit) => {
    const return_promise = new Promise((resolve, reject) => {
        pooldata.getPool.query('select * from f_search_getticketsdataset_v2($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);', [pCadenaSearch, tipoUsuario, userId, offset, estadoId, prioridadId, tipoId, tipoTicket, orderBy, orderByType, limit], (error, results) => {
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

module.exports = {
    getAllDBTicketsByFilter,
    createDBTicketTrans,
    updateDBTicketTrans,
    createDBTicketClient,
    deleteDBTicket,
    getAllDBFailTypes,
    getAllDBTicketTypes
}