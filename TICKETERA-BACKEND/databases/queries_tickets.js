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

const getAllDBTicketsByFilter = (pCadenaSearch, tipoUsuario, userId, offset, estadoId, prioridadId, tipoId, tipoTicket, orderBy, orderByType) => {
    const return_promise = new Promise((resolve, reject) => {
        // Imprimir los valores antes de ejecutar la consulta
        console.log('Parámetros para la consulta SQL:');
        console.log('pCadenaSearch:', pCadenaSearch);
        console.log('tipoUsuario:', tipoUsuario);
        console.log('userId:', userId);
        console.log('offset:', offset);
        console.log('estadoId:', estadoId);
        console.log('prioridadId:', prioridadId);
        console.log('tipoId:', tipoId);
        console.log('tipoTicket:', tipoTicket);
        console.log('orderBy:', orderBy);
        console.log('orderByType:', orderByType);
        pooldata.getPool.query('select * from f_search_getticketsdataset_v1($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);', [pCadenaSearch, tipoUsuario, userId, offset, estadoId, prioridadId, tipoId, tipoTicket, orderBy, orderByType], (error, results) => {
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
    deleteDBTicket
}