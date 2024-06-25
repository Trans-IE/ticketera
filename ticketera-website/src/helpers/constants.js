const mainMenuOptions = {
    DashboardMenu: 1,
    TicketsMenu: 2,
    ReportsMenu: 3,
    AdministrationMenu: 4,
}

const userType = {
    host: 1,
    client: 2
}

const userMenuOptions = {
    LogoutMenu: 1,
    MyAccountMenu: 2,
}

const UserRol = {
    LocalSM: 1,
    LocalTEC: 2,
    LocalEJ: 3,
    ClienteADM: 4,
    ClienteUSR: 5,
    LocalTAC: 6
}

const messageTypes = {
    text: 0,
    image: 1,
    file: 2,
    video: 3,
    audio: 4,
    sticker: 5,
    list: 6,
    quick_reply: 7
}

const ticketType = {
    Creation: 1,
    Edition: 2,
    Asigned: 3,
    PriorityChange: 4,
    StateChange: 5,
    Note: 6,
    SecretNote: 7,
    Attatchment: 8,
    AutoEvaluation: 9,
    OnSiteSupport: 10,
    Hours: 11,
    TechnicalNote: 12,
    UserNote: 13,
    Email: 14,
    SeenByUser: 15
}

const messageDirection = {
    Incomming: 0,
    Outgoing: 1
}
const interactionTypes = {
    email: 0,
    chat: 1,
    webex: 2,
    whatsapp: 4,
    facebook_messenger: 5,

    email_outbound: 11,
    chat_outbound: 12,
    whatsapp_outbound: 13,
    facebook_messenger_outbound: 14,
    webex_outbound: 15
}


const interactionTypesMonitor = {
    0: 'Email',
    1: 'Chat',
    2: 'Webex',
    4: 'WhatsApp',
    5: 'Facebook Messenger'
}

const interactionStatesMonitor = {
    1: 'Abierto',
    3: 'Cerrado',
    4: 'Suspendido'
}

const GupshupErrorCodes = {
    MoreThan24Hours: 470,
    NotExistingNumber: 1002,
    NoMoneyOnWallet: 1003,
    NotSendingTemplateAndUserNotOptIn: 1005,
    UserNotRegisteredForTemplate: 1006,
    MissingParameter: 1008,
    MediaURLNotValid: 1010,
    MediaSizeNotValid: 1011,
    UserNotValid: 1013,
    TemplateFormatMismatch: 2012
}

const MIMETypes = {
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.dot': 'application/msword',
    '.dotx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
    '.docm': 'application/vnd.ms-word.document.macroEnabled.12',
    '.dotm': 'application/vnd.ms-word.template.macroEnabled.12',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.xlsm': 'application/vnd.ms-excel.sheet.macroEnabled.12',
    '.xlsb': 'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
    '.xlt': 'application/vnd.ms-excel',
    '.xltx:': 'application / vnd.openxmlformats - officedocument.spreadsheetml.template',
    '.xltm': 'application/vnd.ms-excel.template.macroEnabled.12',
    '.ppt': 'application/vnd.ms-powerpoint',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    '.pptm': 'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
    '.pot': 'application/vnd.ms-powerpoint',
    '.potx': 'application/vnd.openxmlformats-officedocument.presentationml.template',
    '.potm': 'application/vnd.ms-powerpoint.template.macroEnabled.12',
    '.ppa': 'application/vnd.ms-powerpoint',
    '.ppam': 'application/vnd.ms-powerpoint.addin.macroEnabled.12',
    '.pps': 'application/vnd.ms-powerpoint',
    '.ppsx': 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    '.ppsm': 'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain',
    '.log': 'text/plain',
    '.ini': 'text/plain',
    '.csv': 'text/plain',
    '.tsv': 'text/plain',
    '.html': 'text/plain',
    '.css': 'text/plain',
    '.js': 'text/plain',
}
const CategoriesColor = {
    1: "#404040",
    2: "#008000",
    3: "#FFD700",
    4: "#CC66FF",
    5: "#FF0000",
    6: "#283593",
    7: "#FFC0CB",
    8: "#B35900"
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
}

const TICKETS_ROOMS_PREFIX = {
    CLIENTE: 'c_',
    EMPRESA: 'e_',
    USUARIO: 'u_'
}

const TReportingVersion = "3.0.0";

module.exports = { CategoriesColor, messageTypes, userType, messageDirection, interactionTypes, interactionTypesMonitor, interactionStatesMonitor, TReportingVersion, GupshupErrorCodes, MIMETypes, UserRol, userMenuOptions, ticketType, NOTIFICATION_EVENTS, PAYLOAD_TYPES, TICKETS_ROOMS_PREFIX };
