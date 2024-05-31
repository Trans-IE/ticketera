// Servidor de Express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('node:path');
const cors = require('cors');
const Sockets = require('./sockets');
const fs = require('node:fs');
const https = require('node:https');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        if (process.env.SSL === 'ON') {
            const privateKey = fs.readFileSync(`sslcert/${process.env.SSL_KEY_CRT_NAME}.key`, 'utf8');
            const certificate = fs.readFileSync(`sslcert/${process.env.SSL_KEY_CRT_NAME}.crt`, 'utf8');
            const credentials = { key: privateKey, cert: certificate };
            this.server = https.createServer(credentials, this.app);
        } else {
            this.server = http.createServer(this.app);
        }

        // Configuraciones de sockets
        this.io = socketio(this.server, { /* configuraciones */ });
    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use(express.static(path.resolve(__dirname, '../public')));

        // CORS
        this.app.use(cors());

    }

    configurarSockets() {
        new Sockets(this.io);
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar Server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en puerto:', this.port);
        });
    }

}


module.exports = Server;