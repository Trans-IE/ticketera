const notificationList = require('./notificationList');
const Notification = require('./notification');
const jwt = require('jsonwebtoken');
const logger = require('../logger');
class Sockets {

    constructor(io) {

        this.io = io;
        this.notificationList = new notificationList();
        this.disconnectedRooms = []
        this.socketEvents();
        this.consitencyChecks();
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
        }).on('connection', (socket) => {
            socket.on('join', (rooms) => {
                try {
                    let tmpRoom = `${rooms}`;
                    let room_array = tmpRoom.split(',');
                    room_array.forEach(room => {
                        let deleteTmpRoom = this.disconnectedRooms.find(element => element.room === room)
                        if (deleteTmpRoom !== undefined) {
                            this.disconnectedRooms = this.disconnectedRooms.filter(element => element !== deleteTmpRoom)
                        }
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
            socket.on('leave', (rooms) => {
                try {
                    let tmpRoom = `${rooms}`;
                    let room_array = tmpRoom.split(',');
                    room_array.forEach(room => {
                        let deleteTmpRoom = this.disconnectedRooms.find(element => element.room === room)
                        if (deleteTmpRoom !== undefined) {
                            //lo elimino asi no lo deslogueo 2 veces con el cleanup
                            this.disconnectedRooms = this.disconnectedRooms.filter(element => element !== deleteTmpRoom)
                        }
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
            socket.on('get-alive-agents', (payload) => {
                try {
                    var rooms = this.io.sockets.adapter.rooms;
                    let usersAlive = []
                    Array.from(rooms).map((name, value) => {
                        if (name[0].includes('room:') && !Number.isInteger(parseInt(name[0].substring(5)))) {
                            usersAlive.push(name[0].substring(5));
                        }
                    })
                    this.io.to(`room:${payload.username}`).emit('users-alive', { users: usersAlive })
                } catch (error) {
                    logger.error(`could not get-alive-agents. ${error}`);
                }
            });
            socket.on('toolbar-back-new-notification', (payload) => {
                let notification = new Notification(payload.type, payload, new Date())
                this.io.to(`room:${payload.username}`).emit(payload.type, notification);
            });
        });

        this.io.of("/").adapter.on("delete-room", (room) => {
            try {
                if (room.includes('room:') && !Number.isInteger(parseInt(room.substring(5)))) {
                    if (!this.disconnectedRooms.includes(room.substring(5))) {
                        this.disconnectedRooms.push({ room: room.substring(5), date: new Date() })
                    }
                }
            } catch (error) {
                logger.error(`could not delete room: ${room}. ${error}`)
            }
        });

    }

    consitencyChecks() {
        setInterval(() => {
            try {
                let now = new Date();
                let roomsToDisconnect = this.disconnectedRooms.filter(room => Math.abs((now.getTime() - room.date.getTime()) / 1000) > Number.parseInt(process.env.SECONDS_TO_CLEANUP))
                if (roomsToDisconnect.length > 0) {
                    roomsToDisconnect.forEach(element => {
                        logger.info(`User ${element.room} disconnected`)
                        this.io.to('room:router').emit('user-disconnected', { username: element.room })
                        this.disconnectedRooms = this.disconnectedRooms.filter(room => room !== element)
                    });
                }
            } catch (error) {
                logger.error(`could not get rooms to disconnect. ${error}`);
            }

        }, 10000);
    }

}


module.exports = Sockets;