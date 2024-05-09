try {
    const Server = require('./models/server');
    const server = new Server();
    server.execute();
} catch (error) {
    console.error(error);
}


