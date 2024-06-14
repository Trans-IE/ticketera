const notificationList = require('./notificationList');
const Notification = require('./notification');
const jwt = require('jsonwebtoken');
const logger = require('../logger');
const { NOTIFICATION_EVENTS, USER_TYPE, TICKETS_ROOMS_PREFIX } = require('../helpers/constants');
const { getUserType } = require('../helpers/userHelper');
class Sockets {

    constructor(io) {

        this.io = io;
        this.notificationList = new notificationList();
        this.socketEvents();
    }

    socketEvents() {
        this.io.use((socket, next) => {
            if (socket.handshake?.query?.token) {
                jwt.verify(socket.handshake?.query?.token, process.env.SECRET_JWT_SEED, (err, decoded) => {
                    if (err && socket.handshake?.query?.token !== process.env.SECRET_SERVICES_SEED) {
                        console.log('token fail');
                        return next(new Error('Authentication error'));
                    }
                    socket.decoded = decoded;
                    next();
                });
            } else {
                console.log('token fail');
                next(new Error('Authentication error'));
            }
        }).on(NOTIFICATION_EVENTS.CONNECTION, (socket) => {
            socket.on(NOTIFICATION_EVENTS.JOIN, async (rooms) => {
                try {
                    let tmpRoom = `${rooms}`;
                    let room_array = tmpRoom.split(',');
                    const { label } = jwt.verify(socket.handshake?.query?.token, process.env.SECRET_JWT_SEED)
                    const userType = await getUserType({ username: label })

                    if (userType === USER_TYPE.HOST) {
                        room_array = room_array.filter(item => !item.startsWith(TICKETS_ROOMS_PREFIX.CLIENTE))
                    } else {
                        room_array = room_array.filter(item => !item.startsWith(TICKETS_ROOMS_PREFIX.EMPRESA))
                    }

                    room_array.forEach(room => {
                        try {
                            socket.join(`room:${room}`)
                        } catch (error) {
                            logger.error(`could not join room: ${room}.
                        ${error}`)
                        }
                    });
                } catch (error) {
                    logger.error(`could not join rooms.${error}`)
                }

            });
            socket.on(NOTIFICATION_EVENTS.LEAVE, (rooms) => {
                try {
                    let tmpRoom = `${rooms}`;
                    let room_array = tmpRoom.split(',');
                    room_array.forEach(room => {
                        try {
                            socket.leave(`room:${room}`)
                        } catch (error) {
                            logger.error(`could not leave room:${room}.
                        ${error}`)
                        }
                    });
                } catch (error) {
                    logger.error(`could not leave rooms.${error}`)
                }
            });
            socket.on(NOTIFICATION_EVENTS.TICKET_NEW_NOTIFICATION, (payload) => {
                let notification = new Notification(payload.type, payload, new Date())
                this.io.to(`room:${payload.room}`).emit(payload.type, notification);
            });
        });

    }

}


module.exports = Sockets;