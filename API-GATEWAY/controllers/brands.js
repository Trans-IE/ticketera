const { response } = require("express");
const { logger, loggerCSV } = require("../logger");
const { generarJWT } = require("../helpers/jwt");
const { fetchConToken, fetchSinToken } = require("../helpers/fetch");
const { getUserRol } = require("../helpers/validators");
const { UserRol } = require("../helpers/constants");

const getAllBrands = async (req, res = response) => {
  const { label: username } = req;
  let function_enter_time = new Date();
  const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC},${UserRol.ClienteADM},${UserRol.ClienteUSR}`;
  logger.info(`==> getAllBrands - username:${username}`);
  let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getAllBrands";

  try {
    logger.info(`getAllBrands `);

    const rol = await getUserRol(username);
    let arrRolExclusive = rolExclusive.split(",").map(Number);
    let setRolUser = new Set(rol.split(",").map(Number));
    let resultado = arrRolExclusive.some((numero) => setRolUser.has(numero));

    if (resultado) {
      const resp = await fetchSinToken(url, {}, "POST");
      console.log(resp);
      const body = await resp.json();
      if (body.ok) {
        logger.info(`<== getAllBrands - username:${username}`);
        loggerCSV.info(
          `getAllBrands,${(new Date() - function_enter_time) / 1000}`
        );
        res.status(200).json({
          ok: true,
          value: body.value,
          msg: "Marcas obtenidas correctamente.",
        });
      } else {
        logger.error(`getAllBrands : ${body.msg}`);
        res.status(200).json({
          ok: false,
          msg: body.msg,
        });
      }
    } else {
      logger.error(
        `getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion getAllBrands`
      );
      res.status(401).json({
        ok: false,
        msg: "No se poseen permisos suficientes para realizar la acción",
      });
    }
  } catch (error) {
    logger.error(`getAllBrands : ${error.message}`);
    res.status(500).json({
      ok: false,
      error: error,
      msg: "Por favor hable con el administrador",
    });
  }
};

const createBrand = async (req, res = response) => {
  const { label: username } = req;
  const { id, nombre } = req.body;
  let function_enter_time = new Date();
  const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}`;
  logger.info(`==> createBrand - username:${username}`);
  let url = process.env.HOST_TICKETERA_BACKEND + "/entities/createBrand";

  try {
    logger.info(`createBrand id:${id} nombre:${nombre} `);

    const rol = await getUserRol(username);
    let arrRolExclusive = rolExclusive.split(",").map(Number);
    let setRolUser = new Set(rol.split(",").map(Number));
    let resultado = arrRolExclusive.some((numero) => setRolUser.has(numero));

    if (resultado) {
      const resp = await fetchSinToken(url, { id, nombre }, "POST");
      console.log(resp);
      const body = await resp.json();
      if (body.ok) {
        if (!body.value) {
          return res.status(400).json({
            ok: false,
            msg: body.msg,
          });
        }

        logger.info(`<== createBrand - username:${username}`);
        loggerCSV.info(
          `createBrand,${(new Date() - function_enter_time) / 1000}`
        );
        const { Brand } = body.value;
        res.status(200).json({
          ok: true,
          value: { Brand },
          msg: "Marca creada correctamente.",
        });
      } else {
        logger.error(`createBrand : ${body.msg}`);
        res.status(200).json({
          ok: false,
          msg: body.msg,
        });
      }
    } else {
      logger.error(
        `getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion createBrand`
      );
      res.status(401).json({
        ok: false,
        msg: "No se poseen permisos suficientes para realizar la acción",
      });
    }
  } catch (error) {
    logger.error(`createBrand : ${error.message}`);
    res.status(500).json({
      ok: false,
      error: error,
      msg: "Por favor hable con el administrador",
    });
  }
};

const updateBrand = async (req, res = response) => {
  const { label: username } = req;
  const id = req.params.id;
  const { nombre } = req.body;
  let function_enter_time = new Date();
  const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}`;
  logger.info(`==> updateBrand - username:${username}`);
  let url =
    process.env.HOST_TICKETERA_BACKEND + `/entities/updateBrand/${id}`;

  try {
    logger.info(
      `updateBrand id:${id} nombre:${nombre}`
    );

    const rol = await getUserRol(username);
    let arrRolExclusive = rolExclusive.split(",").map(Number);
    let setRolUser = new Set(rol.split(",").map(Number));
    let resultado = arrRolExclusive.some((numero) => setRolUser.has(numero));

    if (resultado) {
      const resp = await fetchSinToken(url, { id, nombre }, "PUT");
      const body = await resp.json();
      if (body.ok) {
        if (!body.value) {
          return res.status(400).json({
            ok: false,
            msg: body.msg,
          });
        }

        logger.info(`<== updateBrand - username:${username}`);
        loggerCSV.info(
          `updateBrand,${(new Date() - function_enter_time) / 1000}`
        );

        res.status(200).json({
          ok: true,
          value: body.value,
          msg: "Marca actualizada correctamente.",
        });
      } else {
        logger.error(`updateBrand : ${body.msg}`);
        res.status(200).json({
          ok: false,
          //  value: body.value,
          msg: body.msg,
        });
      }
    } else {
      logger.error(
        `getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion updateBrand`
      );
      res.status(401).json({
        ok: false,
        msg: "No se poseen permisos suficientes para realizar la acción",
      });
    }
  } catch (error) {
    logger.error(`updateBrand : ${error.message}`);
    res.status(500).json({
      ok: false,
      error: error,
      msg: "Por favor hable con el administrador",
    });
  }
};

const deleteBrand = async (req, res = response) => {
  const { label: username } = req;
  const id = req.params.id;

  let function_enter_time = new Date();
  const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC}`;
  logger.info(`==> deleteBrand - username:${username}`);

  let url = process.env.HOST_TICKETERA_BACKEND + `/entities/deleteBrand/${id}`;

  try {
    const rol = await getUserRol(username);
    let arrRolExclusive = rolExclusive.split(",").map(Number);
    let setRolUser = new Set(rol.split(",").map(Number));
    let resultado = arrRolExclusive.some((numero) => setRolUser.has(numero));

    if (resultado) {
      const resp = await fetchSinToken(url, { id }, "DELETE");
      console.log(resp);
      const body = await resp.json();
      if (body.ok) {
        if (!body.value) {
          return res.status(400).json({
            ok: false,
            msg: body.msg,
          });
        }

        logger.info(`<== deleteBrand - id:${id}`);
        loggerCSV.info(
          `deleteBrand,${(new Date() - function_enter_time) / 1000}`
        );

        res.status(200).json({
          ok: true,
          value: body.value,
          msg: "Empresa eliminada correctamente.",
        });
      } else {
        logger.error(`deleteBrand : ${body.msg}`);
        res.status(200).json({
          ok: false,
          msg: body.msg,
        });
      }
    } else {
      logger.error(
        `getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion deleteBrand`
      );
      res.status(401).json({
        ok: false,
        msg: "No se poseen permisos suficientes para realizar la acción",
      });
    }
  } catch (error) {
    logger.error(`deleteBrand : ${error.message}`);
    res.status(500).json({
      ok: false,
      error: error,
      msg: "Por favor hable con el administrador",
    });
  }
};

const getBrandsByCompany = async (req, res = response) => {
  const { label: username } = req;
  const { company } = req.body;

  let function_enter_time = new Date();
  const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC},${UserRol.ClienteADM},${UserRol.ClienteUSR}`;
  logger.info(`==> getBrandsByCompany - username:${username}`);
  let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getBrandsByCompany";

  try {
    logger.info(`getBrandsByCompany company:${company}`);

    const rol = await getUserRol(username);
    let arrRolExclusive = rolExclusive.split(",").map(Number);
    let setRolUser = new Set(rol.split(",").map(Number));
    let resultado = arrRolExclusive.some((numero) => setRolUser.has(numero));

    if (resultado) {
      const resp = await fetchSinToken(url, { username, company }, "POST");
      console.log(resp);
      const body = await resp.json();
      if (body.ok) {
        logger.info(`<== getBrandsByCompany - username:${username}`);
        loggerCSV.info(
          `getBrandsByCompany,${(new Date() - function_enter_time) / 1000}`
        );

        res.status(200).json({
          ok: true,
          value: body.value,
          msg: "Listado de marcas obtenido correctamente.",
        });
      } else {
        logger.error(`getBrandsByCompany : ${body.msg}`);
        res.status(200).json({
          ok: false,
          msg: body.msg,
        });
      }
    } else {
      logger.error(
        `getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion getBrandsByCompany`
      );
      res.status(401).json({
        ok: false,
        msg: "No se poseen permisos suficientes para realizar la acción",
      });
    }
  } catch (error) {
    logger.error(`getBrandsByCompany : ${error.message}`);
    res.status(500).json({
      ok: false,
      error: error,
      msg: "Por favor hable con el administrador",
    });
  }
};

const getBrandsByContract = async (req, res = response) => {
  const { label: username } = req;
  const { contract } = req.body;

  let function_enter_time = new Date();
  const rolExclusive = `${UserRol.LocalSM},${UserRol.LocalTEC},${UserRol.LocalEJ},${UserRol.LocalTAC},${UserRol.ClienteADM},${UserRol.ClienteUSR}`;
  logger.info(`==> getBrandsByContract - username:${username}`);
  let url =
    process.env.HOST_TICKETERA_BACKEND + "/entities/getBrandsByContract";

  try {
    logger.info(`getBrandsByContract contract:${contract}`);

    const rol = await getUserRol(username);
    let arrRolExclusive = rolExclusive.split(",").map(Number);
    let setRolUser = new Set(rol.split(",").map(Number));
    let resultado = arrRolExclusive.some((numero) => setRolUser.has(numero));

    if (resultado) {
      const resp = await fetchSinToken(url, { username, contract }, "POST");
      console.log(resp);
      const body = await resp.json();
      if (body.ok) {
        logger.info(`<== getBrandsByContract - username:${username}`);
        loggerCSV.info(
          `getBrandsByContract,${(new Date() - function_enter_time) / 1000}`
        );

        res.status(200).json({
          ok: true,
          value: body.value,
          msg: "Listado de marcas obtenido correctamente.",
        });
      } else {
        logger.error(`getBrandsByContract : ${body.msg}`);
        res.status(200).json({
          ok: false,
          msg: body.msg,
        });
      }
    } else {
      logger.error(
        `getUserRol. El usuario ${username} posee el rol ${rol}. No puede acceder a la funcion getBrandsByContract`
      );
      res.status(401).json({
        ok: false,
        msg: "No se poseen permisos suficientes para realizar la acción",
      });
    }
  } catch (error) {
    logger.error(`getBrandsByContract : ${error.message}`);
    res.status(500).json({
      ok: false,
      error: error,
      msg: "Por favor hable con el administrador",
    });
  }
};

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getAllBrands,
  getBrandsByCompany,
  getBrandsByContract,
};
