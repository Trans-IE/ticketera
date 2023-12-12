const moment = require("moment");

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
};

const formatDateToYYYY_MM_DD = (date) => {
  const formattedDate = moment(date).format('YYYY_MM_DD');
  return formattedDate;
}

module.exports = { isDate, formatDateToYYYY_MM_DD };
