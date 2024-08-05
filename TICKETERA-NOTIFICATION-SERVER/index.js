try {
  // Inicialización de la carpeta logs
  const fs = require("node:fs");
  const path = require("node:path");

  // Crear el directorio de logs si no existe
  const logDir = path.join(__dirname, "logs");
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
    fs.chmodSync(logDir, 0o777);
  }

  const Server = require("./models/server");
  const server = new Server();
  server.execute();
} catch (error) {
  console.error(error);
}
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
  });
  
  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
  });