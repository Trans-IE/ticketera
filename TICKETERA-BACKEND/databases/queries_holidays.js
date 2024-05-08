const pooldata = require('./poolpg')

const createDBHoliday = (fecha, descripcion) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('SELECT tickets.f_ticketera_holiday_insert($1, $2);', [fecha, descripcion], (error, results) => {
            if (error) {
                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_holiday_insert);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

const deleteDBHoliday = (fecha) => {
    const return_promise = new Promise((resolve, reject) => {

        pooldata.getPool.query('select * from tickets.f_ticketera_holiday_delete($1);', [fecha], (error, results) => {
            if (error) {
                reject(error.message);
            }
            else {
                try {
                    resolve(results.rows[0].f_ticketera_holiday_delete);
                } catch (error) {
                    reject(error.message);
                }
            }
        })

    });

    return return_promise;
}

module.exports = {
    deleteDBHoliday,
    createDBHoliday

}

