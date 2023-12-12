const moment = require('moment');

const isDate = (value) => {

    if (!value) {
        return false;
    }

    const fecha = moment(value);
    if (fecha.isValid()) {
        return true;
    } else {
        return false;
    }
}

const customFormatDate = (HH24_MM_SS = "") => {
    let str = "";
    let hour = Number.parseInt(HH24_MM_SS.substring(0, 2));
    let minutes = Number.parseInt(HH24_MM_SS.substring(4, 6));
    let seconds = Number.parseInt(HH24_MM_SS.substring(6));
    if (hour > 0) {
        str = str + `${hour} hs `
    }
    if (minutes > 0) {
        str = str + `${minutes} min `
    } else {
        if (minutes === 0 && hour > 0) {
            str = str + `${minutes} min `
        }
    }
    if (seconds >= 0) {
        str = str + `${seconds} seg`
    }
    return str;
}

const convertirFormatoFechaPDF = (fecha = "dd_mm_yyyy") => {
    // Divide la fecha en sus componentes (año, mes y día) usando el guion bajo como separador
    const componentes = fecha.split('_');

    // Verifica si la fecha tiene el formato esperado
    if (componentes.length !== 3) {
        return fecha;
    }

    // Obtiene los componentes de la fecha
    const año = componentes[0];
    const mes = componentes[1];
    const día = componentes[2];

    // Crea la fecha en el formato deseado (DD/MM/YYYY)
    const fechaFormateada = `${día}/${mes}/${año}`;

    return fechaFormateada;
}


module.exports = { isDate, customFormatDate, convertirFormatoFechaPDF };


