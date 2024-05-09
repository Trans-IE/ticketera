const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const timezoned = () => {
    return new Date().toLocaleString();
}

// Función para obtener el siguiente número disponible para el archivo de log
function getNextLogNumber() {
    const logsDir = `${__dirname}/logs`;
    const logFiles = fs.readdirSync(logsDir).filter(file => file.startsWith('log'));

    if (logFiles.length <= 0) {
        return 1;
    }

    const lastLogFile = logFiles[logFiles.length - 1];
    const logNumber = parseInt(lastLogFile.substring(3, lastLogFile.indexOf('.log')));

    return logNumber + 1;
}

module.exports = createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp({ format: timezoned }),
        format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
    ),
    transports: [
        new transports.DailyRotateFile({
            //    maxsize: 5120000,
            maxFiles: '182d',
            level: 'info',
            filename: `${__dirname}/logs/log${getNextLogNumber()}.log`,
            handleExceptions: true,
            humanReadableUnhandledException: true
        }),
        new transports.Console({
            level: 'debug',
        })
    ]
});