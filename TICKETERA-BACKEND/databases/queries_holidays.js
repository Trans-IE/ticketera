const pooldata = require("./poolpg");

const getAllDBHolidays = () => {
  const return_promise = new Promise((resolve, reject) => {
    pooldata.getPool.query("SELECT * FROM feriados;", [], (error, results) => {
      if (error) {
        reject(error.message);
      } else {
        try {
          resolve(results.rows);
        } catch (error) {
          reject(error.message);
        }
      }
    });
  });

  return return_promise;
};

const createDBHoliday = (fecha, descripcion) => {
  const return_promise = new Promise((resolve, reject) => {
    pooldata.getPool.query(
      "SELECT tickets.f_ticketera_feriados_insert($1, $2);",
      [fecha, descripcion],
      (error, results) => {
        if (error) {
          reject(error.message);
        } else {
          try {
            resolve(results.rows[0].f_ticketera_holiday_insert);
          } catch (error) {
            reject(error.message);
          }
        }
      }
    );
  });

  return return_promise;
};

const deleteDBHoliday = (id) => {
  const return_promise = new Promise((resolve, reject) => {
    pooldata.getPool.query(
      "select * from tickets.f_ticketera_holiday_delete($1);",
      [id],
      (error, results) => {
        if (error) {
          reject(error.message);
        } else {
          try {
            resolve(results.rows[0].f_ticketera_holiday_delete);
          } catch (error) {
            reject(error.message);
          }
        }
      }
    );
  });

  return return_promise;
};

const updateDBHoliday = (id, descripcion, fecha) => {
  const return_promise = new Promise((resolve, reject) => {
    pooldata.getPool.query(
      "select * from tickets.f_ticketera_feriados_update($1,$2,$3);", [id, descripcion, fecha], (error, results) => {
        if (error) {
          reject(error.message);
        } else {
          try {
            resolve(results.rows[0].f_ticketera_feriados_update);
          } catch (error) {
            reject(error.message);
          }
        }
      }
    );
  });

  return return_promise;
};

module.exports = {
  deleteDBHoliday,
  createDBHoliday,
  getAllDBHolidays,
  updateDBHoliday,
};
