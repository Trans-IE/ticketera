const { response } = require("express");
const {
  getAllDBHolidays,
  createDBHoliday,
  deleteDBHoliday,
  updateDBHoliday,
} = require("../databases/queries_holidays");
const { logger, loggerCSV } = require("../logger");
const { userType } = require("../helpers/constants");
const crypto = require("crypto");

const getAllHolidays = async (req, res = response) => {
  let function_enter_time = new Date();
  logger.info(`getAllHolidays.`);
  try {
    getAllDBHolidays()
      .then((result) => {
        logger.info(`<== getAllHolidays`);
        loggerCSV.info(
          `getAllHolidays, ${(new Date() - function_enter_time) / 1000}`
        );
        res.status(200).json({
          ok: true,
          value: result,
          msg: "Listado de feriados obtenido correctamente.",
        });
      })
      .catch((error) => {
        logger.error(`getAllDBHolidays => getAllDBHolidays : error=> ${error}`);
      });
  } catch (error) {
    logger.error(`getAllDBHolidays : params=> error=> ${error}`);
    res.status(500).json({
      ok: false,
      value: [],
      msg: "Error obteniendo listado de feriados.",
    });
  }
};

const createHoliday = async (req, res = response) => {
  const { label } = req;
  const { fecha, descripcion } = req.body;

  logger.info(`createHoliday fecha:${fecha} descripcion:${descripcion}`);

  try {
    createDBHoliday(fecha, descripcion)
      .then((result) => {
        res.status(200).json({
          ok: true,
          value: { holiday: result },
          msg: `Feriado creado correctamente`,
        });
      })
      .catch((dataError) => {
        logger.error(
          `createHoliday => createDBHoliday : params=> fecha:${fecha} descripcion:${descripcion} error=> ${dataError}`
        );
        res.status(501).json({
          ok: false,
          error: dataError,
          msg: `No se pudo crear el feriado. `,
        });
      });
  } catch (error) {
    logger.error(`createBrand => createHoliday : params=> error=> ${error}`);
    res.status(500).json({
      ok: false,
      error: error,
      msg: "Por favor hable con el administrador",
    });
  }
};

const deleteHoliday = async (req, res = response) => {
  const fecha = req.params.fecha;

  logger.info(`deleteHoliday fecha:${fecha}`);

  try {
    deleteDBHoliday(fecha)
      .then((result) => {
        if (result === 1) {
          res.status(200).json({
            ok: true,
            value: result,
            msg: `El feriado fue eliminado correctamente`,
          });
        } else {
          return res.status(401).json({
            ok: false,
            msg: "El feriado no pudo ser eliminado del sistema.",
          });
        }
      })
      .catch((dataError) => {
        logger.error(
          `deleteHoliday => deleteDBHoliday: params=> fecha=${fecha} error=> ${dataError}`
        );
        res.status(501).json({
          ok: false,
          error: dataError,
          msg: `No se pudo eliminar el feriado `,
        });
      });
  } catch (error) {
    logger.error(`deleteHoliday: params=> fecha=${fecha} error=> ${error}`);
    res.status(502).json({
      ok: false,
      error: error,
      msg: `No se pudo eliminar el feriado`,
    });
  }
};

const updateHoliday = async (req, res = response) => {
  const id = req.params.id;
  const { fecha, descripcion } = req.body;
  logger.info(
    `updateHoliday. id:${id} fecha:${fecha} descripcion:${descripcion}`
  );
  try {
    updateDBHoliday(id, fecha, descripcion)
      .then((result) => {
        if (result == 1) {
          res.status(200).json({
            ok: true,
            value: result,
            msg: `La fecha '${descripcion}' fue actualizada correctamente.`,
          });
        } else {
          return res.status(401).json({
            ok: false,
            msg: `La fecha no pudo ser actualizada en el sistema.-`,
          });
        }
      })
      .catch((dataError) => {
        logger.error(
          `updateHoliday  => updateDBHoliday : params=> id=${id} descripcion=${descripcion}`
        );
        res.status(501).json({
          ok: false,
          error: dataError,
          msg: `No se pudo actualizar la marca '${descripcion}' `,
        });
      });
  } catch (error) {
    logger.error(
      `updateHoliday : params=> id=${id} descripcion=${descripcion} error=> ${error}`
    );
    res.status(500).json({
      ok: false,
      error: error,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getAllHolidays,
  createHoliday,
  deleteHoliday,
  updateHoliday,
};
