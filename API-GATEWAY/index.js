require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("node:fs");
const https = require("node:https");
const path = require("node:path");


// Función para crear directorio si no existe
const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    fs.chmodSync(dirPath, 0o777);
  }
};

// Crear los directorios necesarios
const logDir = path.join(__dirname, "logs");
const uploadsDir = path.join(__dirname, "uploads");
createDirectory(logDir);
createDirectory(uploadsDir);

// Crear el servidor de express
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const {
  checkAndCreateFolder,
  deleteTmpFiles,
} = require("./helpers/fileHelper");

// CORS
app.use(cors());

// Directorio Público
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json({ limit: "100mb" }));

// Routers
// authentication
app.use(
  "/api/auth",
  (req, res, next) => {
    console.log("Ruta /api/auth llamada");
    next();
  },
  require("./routes/auth")
);
app.use(
  "/api/entities/",
  (req, res, next) => {
    console.log("Ruta /api/entities llamada");
    next();
  },
  require("./routes/entities")
);

if (process.env.SHOW_DOCUMENTATION === "ON") {
  console.log("Documentación API habilitada.");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

const checkDeleteTmpFiles = () => {
  deleteTmpFiles(`${__dirname}${path.sep}uploads`, 3600);
  console.log("Archivos temporales eliminados");
};

checkAndCreateFolder(`${__dirname}${path.sep}uploads`);
console.log("Directorio de uploads verificado/creado.");

if (process.env.SSL === "ON") {
  try {
    const privateKey = fs.readFileSync(
      `sslcert/${process.env.SSL_KEY_CRT_NAME}.key`,
      "utf8"
    );
    const certificate = fs.readFileSync(
      `sslcert/${process.env.SSL_KEY_CRT_NAME}.crt`,
      "utf8"
    );
    const credentials = { key: privateKey, cert: certificate };
    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(process.env.PORT, () => {
      console.log(
        `API-GATEWAY is working in port ${process.env.PORT}. SSL: ON`
      );
      setInterval(checkDeleteTmpFiles, 3600000);
    });
  } catch (error) {
    console.error("Error al leer los archivos SSL:", error);
  }
} else {
  app.listen(process.env.PORT, () => {
    console.log(`API-GATEWAY is working in port ${process.env.PORT}. SSL: OFF`);
    setInterval(checkDeleteTmpFiles, 3600000);
  });
}

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
