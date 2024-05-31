const Service = require('node-windows').Service;
const path = require('node:path');

const SERVICE_NAME = "TRANS_ANALYTICS_API_GATEWAY";
const SERVICE_DESCRIPTION = "TRANS_ANALYTICS_API_GATEWAY";

// Crear un nuevo objeto de servicio
const svc = new Service({
    name: SERVICE_NAME,
    description: SERVICE_DESCRIPTION,
    script: path.join(__dirname, 'index.js'),
    nodeOptions: [
        '--env-file=.env'
    ]
});

// Evento que se dispara cuando la instalación del servicio se completa
svc.on('install', function () {
    console.log('Servicio instalado correctamente.');
    console.log('Iniciando el servicio...');
    svc.start();
});

// Evento que se dispara cuando el servicio se inicia correctamente
svc.on('start', function () {
    console.log('Servicio iniciado correctamente.');
});

// Evento que se dispara cuando el servicio se detiene
svc.on('stop', function () {
    console.log('Servicio detenido.');


});

// Evento que se dispara cuando la desinstalación del servicio se completa
svc.on('uninstall', function () {
    console.log('Servicio desinstalado correctamente.');
});

// Verificar si el servicio ya está instalado
if (svc.exists) {
    console.log('El servicio ya está instalado. Desinstalando...');
    svc.uninstall(); // Desinstalar antes de instalar nuevamente
} else {
    console.log('Instalando el servicio...');
    svc.install();   // Instalar el servicio
}
