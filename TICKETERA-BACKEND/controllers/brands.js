const { response } = require("express");
const {
  getAllDBBrands,
  createDBBrand,
  updateDBBrand,
  deleteDBBrand,
  getDBBrandsByCompany,
  getDBBrandsByContract,
} = require("../databases/queries_brands");
const { logger, loggerCSV } = require("../logger");
const { userType } = require("../helpers/constants");
const crypto = require("crypto");

const getAllBrands = async (req, res = response) => {
  let function_enter_time = new Date();
  logger.info(`==> getAllBrands.`);
  try {
    getAllDBBrands()
      .then((result) => {
        logger.info(`<== getAllBrands`);
        loggerCSV.info(
          `getAllBrands, ${(new Date() - function_enter_time) / 1000}`
        );
        res.status(200).json({
          ok: true,
          value: result,
          msg: "Listado de marcas obtenido correctamente.",
        });
      })
      .catch((error) => {
        logger.error(`getAllBrands => getAllDBBrands error=> ${error}`);
      });
  } catch (error) {
    logger.error(`getAllDBBrands error=> ${error}`);
    res.status(500).json({
      ok: false,
      items: [],
      msg: "Error obteniendo listado de marcas.",
    });
  }
};

const createBrand = async (req, res = response) => {
  // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes
  // alli identifica estos datos desencriptando el hash x-token

  const { id, nombre } = req.body;

  logger.info(`createBrand id:${id} nombre:${nombre} `);

  try {
    createDBBrand(id, nombre)
      .then((result) => {
        res.status(200).json({
          ok: true,
          value: { brand: result },
          msg: `Marca ${nombre} creado correctamente con id: ${result}`,
        });
      })
      .catch((dataError) => {
        logger.error(
          `createBrand => createDBBrand : params=> id=${id} nombre=${nombre}`
        );
        res.status(501).json({
          ok: false,
          error: dataError,
          msg: `No se pudo crear el marca. `,
        });
      });
  } catch (error) {
    logger.error(
      `createBrand => createDBBrand : params=> id=${id} nombre=${nombre} error=> ${error}`
    );
    res.status(500).json({
      ok: false,
      error: error,
      msg: "Por favor hable con el administrador",
    });
  }
};

const updateBrand = async (req, res = response) => {
  const id = req.params.id;
  const { nombre, habilitado } = req.body; // Incluye el campo habilitado en la desestructuración

  logger.info(
    `updateBrand. id:${id} nombre:${nombre} habilitado:${habilitado}`
  );
  try {
    // Asegúrate de que updateDBBrand esté manejando todos los campos necesarios
    updateDBBrand(id, { nombre, habilitado })
      .then((result) => {
        console.log(`result: ${result}`);
        if (result == 1) {
          res.status(200).json({
            ok: true,
            value: result,
            msg: `La marca '${nombre}' fue actualizada correctamente.`,
          });
        } else {
          return res.status(401).json({
            ok: false,
            msg: `La marca no pudo ser actualizada en el sistema.`,
          });
        }
      })
      .catch((dataError) => {
        logger.error(
          `updateBrand => updateDBBrand : params=> id=${id} nombre=${nombre} habilitado=${habilitado}`
        );
        res.status(501).json({
          ok: false,
          error: dataError,
          msg: `No se pudo actualizar la marca '${nombre}'.`,
        });
      });
  } catch (error) {
    logger.error(
      `updateBrand : params=> id=${id} nombre=${nombre} habilitado=${habilitado} error=> ${error}`
    );
    res.status(500).json({
      ok: false,
      error: error,
      msg: "Hable con el administrador",
    });
  }
};

const deleteBrand = async (req, res = response) => {
  const id = req.params.id;

  // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes
  // alli identifica estos datos desencriptando el hash x-token
  logger.info(`deleteBrand id:${id}`);

  try {
    // AL ELIMINAR PUEDE QUE SEA NECESARIO CHEQUEAR PRIVILEGIOS DE USUARIO
    // DEBE VALIDAR SI EXISTE EL ELEMENTO

    deleteDBBrand(id)
      .then((result) => {
        if (result === 1) {
          res.status(200).json({
            ok: true,
            value: result,
            msg: `Marca id: ${id} fue eliminado correctamente`,
          });
        } else {
          //Ocurrio un error no manejado en sql.
          return res.status(401).json({
            ok: false,
            msg: "La marca no pudo ser eliminado del sistema.",
          });
        }
      })
      .catch((dataError) => {
        logger.error(
          `deleteBrand => deleteDBBrand: params=> id=${id} error=> ${dataError}`
        );
        // DESDE CAPA databases recibira un objeto error { code, message, stack }
        res.status(401).json({
          ok: false,
          error: dataError,
          msg: `No se pudo eliminar la marca '${id}' `,
        });
      });
  } catch (error) {
    logger.error(`deleteBrand: params=> id=${id} error=> ${error}`);
    res.status(502).json({
      ok: false,
      error: error,
      msg: `No se pudo eliminar la marca '${id}' `,
    });
  }
};

const getBrandsByCompany = async (req, res = response) => {
  // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes
  // alli identifica estos datos desencriptando el hash x-token.
  const { username, company } = req.body;

  let function_enter_time = new Date();
  logger.info(`getBrandsByCompany. username:${username} company:${company}`);
  try {
    getDBBrandsByCompany(username, company)
      .then((result) => {
        logger.info(`<== getBrandsByCompany`);
        loggerCSV.info(
          `getBrandsByCompany, ${(new Date() - function_enter_time) / 1000}`
        );
        res.status(200).json({
          ok: true,
          value: result,
          msg: "Listado de marcas obtenido correctamente.",
        });
      })
      .catch((error) => {
        logger.error(
          `getBrandsByCompany => getDBBrandsByCompany error=> ${error}`
        );
      });
  } catch (error) {
    logger.error(
      `getDBTicketActionByTicketId : params=> ticket_id=> ${ticket_id} error=> ${error}`
    );
    res.status(500).json({
      ok: false,
      value: [],
      msg: "Error obteniendo listado de acciones.",
    });
  }
};

const getBrandsByContract = async (req, res = response) => {
  // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes
  // alli identifica estos datos desencriptando el hash x-token.
  const { username, contract } = req.body;

  let function_enter_time = new Date();
  logger.info(`getBrandsByContract. username:${username} contract:${contract}`);
  try {
    getDBBrandsByContract(username, contract)
      .then((result) => {
        logger.info(`<== getBrandsByContract`);
        loggerCSV.info(
          `getBrandsByContract, ${(new Date() - function_enter_time) / 1000}`
        );
        res.status(200).json({
          ok: true,
          value: result,
          msg: "Listado de marcas obtenido correctamente.",
        });
      })
      .catch((error) => {
        logger.error(
          `getBrandsByContract => getDBBrandsByContract error=> ${error}`
        );
      });
  } catch (error) {
    logger.error(
      `getDBTicketActionByTicketId : params=> ticket_id=> ${ticket_id} error=> ${error}`
    );
    res.status(500).json({
      ok: false,
      value: [],
      msg: "Error obteniendo listado de acciones.",
    });
  }
};

//TODO: //==> Otra posibilidad de hacer la llamada más reducida:

// const deleteBrandTest = async (req, res = response) => {

//     const id = req.params.id;

//     // NOTA: valores que provienen de funcion validar-jwt que se ejecuta antes
//     // alli identifica estos datos desencriptando el hash x-token
//     logger.info(`deleteBrand id:${id}`)

//     try {
//         // AL ELIMINAR PUEDE QUE SEA NECESARIO CHEQUEAR PRIVILEGIOS DE USUARIO
//         // DEBE VALIDAR SI EXISTE EL ELEMENTO
//         const id = await deleteDBBrand(id)

//         if (result === 1) {
//             res.status(200).json({
//                 ok: true,
//                 value: result,
//                 msg: `Marca id: ${id} fue eliminado correctamente`
//             });
//         }
//         else {
//             //Ocurrio un error no manejado en sql.
//             return res.status(401).json({
//                 ok: false,
//                 msg: 'La marca no pudo ser eliminado del sistema.'
//             });
//         }

//         /* deleteDBBrand(id)
//             .then(result => {
//                 if (result === 1) {
//                     res.status(200).json({
//                         ok: true,
//                         value: result,
//                         msg: `Marca id: ${id} fue eliminado correctamente`
//                     });
//                 }
//                 else {
//                     //Ocurrio un error no manejado en sql.
//                     return res.status(401).json({
//                         ok: false,
//                         msg: 'La marca no pudo ser eliminado del sistema.'
//                     });
//                 }
//             })
//             .catch(dataError => {
//                 logger.error(`deleteBrand => deleteDBBrand: params=> id=${id} error=> ${dataError}`);
//                 // DESDE CAPA databases recibira un objeto error { code, message, stack }
//                 res.status(501).json({
//                     ok: false,
//                     error: dataError,
//                     msg: `No se pudo eliminar la marca '${id}' `
//                 });

//             }); */
//     } catch (error) {
//         logger.error(`deleteBrand: params=> id=${id} error=> ${error}`);
//         res.status(502).json({
//             ok: false,
//             error: error,
//             msg: `No se pudo eliminar la marca '${id}' `
//         });
//     }
// }

module.exports = {
  getAllBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandsByCompany,
  getBrandsByContract,
};
