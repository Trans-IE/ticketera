const moment = require('moment')
const getFullDateString = (time) => {
    let dt = new Date(time);
    let date = moment(dt).format('DD/MM/YYYY H:mm:ss');
    return date;
}

const getShortDateString = (time) => {
    let dt = new Date(time);
    let date = moment(dt).format('DD/MM/YYYY');
    return date;
}


function convertToDate(dateString) {
    return new Date(dateString);
}

function compareByDate(a, b) {
    const dateA = convertToDate(a.fecha);
    const dateB = convertToDate(b.fecha);

    if (dateA > dateB) {
        return -1;
    }
    if (dateA < dateB) {
        return 1;
    }
    return 0;
}

module.exports = { getFullDateString, getShortDateString, compareByDate }