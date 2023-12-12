const moment=require('moment')
const getFullDateString = (time) => {
    let dt = new Date(time);
    let date=moment(dt).format('DD/MM/YYYY H:mm:ss');
    return date;
}
module.exports={getFullDateString}