const { v4: uuidv4 } = require('uuid');

class Notification {

    constructor( type, data, datetime ) {

        this.id    = uuidv4();
        this.type  = type;
        this.data  = data;
        this.datetime = datetime;
    }
}

module.exports = Notification;
