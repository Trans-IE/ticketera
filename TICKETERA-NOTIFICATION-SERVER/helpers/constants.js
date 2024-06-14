const NOTIFICATION_EVENTS = {
    'CONNECTION': 'connection',
    'CONNECT': 'connect',
    'JOIN': 'join',
    'LEAVE': 'leave',
    'TICKET_NEW_NOTIFICATION': 'ticket-new-notification',
}

const PAYLOAD_TYPES = {
    'TICKET_NOTE_ADD': 'ticket-note-add',
    'TICKET_HIDDEN_NOTE_ADD': 'ticket-hidden-note-add',
    'TICKET_STATE_ADD': 'ticket-state-note-add',
    'TICKET_PRIORITY_ADD': 'ticket-priority-note-add',
    'TICKET_RESPONSIBLE_ADD': 'ticket-responsible-note-add',
    'TICKET_HOURS_ADD': 'ticket-hours-add',
    'TICKET_PROJECTED_HOURS_ADD': 'ticket-projected-hours-add',
}

const TICKETS_ROOMS_PREFIX = {
    CLIENTE: 'c_',
    EMPRESA: 'e_',
    USUARIO: 'u_'
}

const USER_TYPE = {
    HOST: 1,
    CLIENT: 2
}

module.exports = {
    NOTIFICATION_EVENTS,
    PAYLOAD_TYPES,
    USER_TYPE,
    TICKETS_ROOMS_PREFIX
}
