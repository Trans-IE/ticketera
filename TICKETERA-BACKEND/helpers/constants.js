const userType = {
    host: 1,
    client: 2
}

const ticketStatus = {
    Pendiete_asignacion: 1,
    Pendiente_de_trans: 2,
    Pendiente_de_software: 3,
    Pendiente_de_tercero: 4,
    Actualizado_por_cliente: 5,
    Pendiente_de_cierre: 6,
    Cerrado: 7,
    Pendiente_de_cliente: 8,
    Re_Abierto: 9,
    Pendiente_de_logistica: 10,
    Pendiente_de_importación: 11
}

const NOTIFICATION_EVENTS = {
    'CONNECTION': 'connection',
    'CONNECT': 'connect',
    'JOIN': 'join',
    'LEAVE': 'leave',
    'TICKET_NEW_NOTIFICATION': 'ticket-new-notification',
}

//Agregar evento nuevo según se requiera
const PAYLOAD_TYPES = {
    'TICKET_NOTE_ADD': 'ticket-note-add',
    'TICKET_HIDDEN_NOTE_ADD': 'ticket-hidden-note-add',
    'TICKET_STATE_ADD': 'ticket-state-note-add',
    'TICKET_PRIORITY_ADD': 'ticket-priority-note-add',
    'TICKET_RESPONSIBLE_ADD': 'ticket-responsible-note-add',
    'TICKET_HOURS_ADD': 'ticket-hours-add',
    'TICKET_PROJECTED_HOURS_ADD': 'ticket-projected-hours-add',
    'TICKET_UPLOAD_FILE': 'ticket-upload-file',
}

const TICKETS_ROOMS_PREFIX = {
    CLIENTE: 'c_',
    EMPRESA: 'e_',
    USUARIO: 'u_'
}

module.exports = {
    userType,
    ticketStatus,
    NOTIFICATION_EVENTS,
    PAYLOAD_TYPES,
    TICKETS_ROOMS_PREFIX
}
