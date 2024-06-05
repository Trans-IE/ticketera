const { io } = require("socket.io-client");
const { logger, loggerCSV } = require('../logger');
const { NOTIFICATION_EVENTS } = require("./constants");

const socket = io(process.env.NOTIFICATION_PATH, {
    transports: ['websocket'],
    autoConnect: true,
    forceNew: true,
    rejectUnauthorized: false,
    query: {
        token: process.env.SECRET_SERVICES_SEED
    }
});

const createNewTicketNotification = (type, data) => {
    let info = { type: type, ...data };
    logger.info(`createNewTicketNotification:${NOTIFICATION_EVENTS.TICKET_NEW_NOTIFICATION} , sending:${JSON.stringify(info)}`);
    socket.emit(NOTIFICATION_EVENTS.TICKET_NEW_NOTIFICATION, info);
}



module.exports = { createNewTicketNotification }