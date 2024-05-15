const pooldata = require('./poolpg')

const getAllDBStatesByTicketId = (ticket_id) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('SELECT * FROM tickets.f_ticketera_get_estados($1);', [ticket_id], (error, results) => {
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

const getAllDBStates = () => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('SELECT * FROM public.estados_ticket;', [], (error, results) => {
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
    getAllDBStatesByTicketId,
    getAllDBStates

}

