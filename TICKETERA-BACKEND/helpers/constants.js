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
    'TICKET_NOTE_ADD': 'ticket-note-add'
}

module.exports = {
    userType,
    ticketStatus,
    NOTIFICATION_EVENTS,
    PAYLOAD_TYPES
}
