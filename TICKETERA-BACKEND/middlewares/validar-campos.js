const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, res = response, next) => {
    // manejo de errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }

    next();
};

const validarCamposFormData = (req, res = response, next) => {
    const { body } = req;
    const errors = validationResult(req);

    // Obtener las claves requeridas desde los errores de validación
    const clavesRequeridas = errors.array().map((error) => error.path);

    // Verificar si las claves están presentes en el formulario
    const clavesFaltantes = clavesRequeridas.filter((clave) => !(clave in body));
    if (clavesFaltantes.length > 0) {
        return res.status(400).json({
            ok: false,
            errors: clavesFaltantes.reduce((obj, clave) => {
                obj[clave] = `El campo ${clave} es obligatorio`;
                return obj;
            }, {}),
        });
    }

    next();
};

module.exports = {
    validarCampos,
    validarCamposFormData,
};
