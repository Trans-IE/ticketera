const jwt = require("jsonwebtoken");

const generarJWT = async (label) => {
  return new Promise((resolve, reject) => {
    const payload = { label };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      { expiresIn: "8h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  generarJWT,
};
