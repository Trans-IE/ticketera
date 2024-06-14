const { fetchConToken, fetchSinToken } = require('./fetch');
const { logger, loggerCSV } = require('../logger');

const getUserRol = async (label) => {
    let function_enter_time = new Date();
    logger.info(`==> getUserRol - label:${label}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getUserRol";
    try {
        const resp = await fetchSinToken(url, { label }, 'POST');
        const body = await resp.json();
        if (body.ok) {
            logger.info(`<== getUserRol - label:${label}`);
            loggerCSV.info(`getUserRol,${(new Date() - function_enter_time) / 1000}`)
            return `${body.value}`
        } else {
            logger.error(`getUserRol body not ok.`)
            return '-1';
        }

    } catch (error) {
        logger.error(`getUserRol. Error:${error}`)
        return '-1';
    }
}

const getTypeByUser = async (username) => {
    let function_enter_time = new Date();
    logger.info(`==> getTypeByUser - username:${username}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getTypeByUser";
    try {
        const resp = await fetchSinToken(url, { username }, 'POST');
        const body = await resp.json();
        if (body.ok) {
            logger.info(`<== getTypeByUser - username:${username}`);
            loggerCSV.info(`getTypeByUser,${(new Date() - function_enter_time) / 1000}`)
            return `${body.value}`
        } else {
            logger.error(`getTypeByUser body not ok.`)
            return '-1';
        }

    } catch (error) {
        logger.error(`getTypeByUser. Error:${error}`)
        return '-1';
    }
}

const getCompanyByUser = async (label) => {
    let function_enter_time = new Date();
    logger.info(`==> getCompanyByUser - label:${label}`);
    let url = process.env.HOST_TICKETERA_BACKEND + "/entities/getCompanyByUser";
    try {
        const resp = await fetchSinToken(url, { label }, 'POST');
        const body = await resp.json();
        if (body.ok) {
            logger.info(`<== getCompanyByUser - label:${label}`);
            loggerCSV.info(`getCompanyByUser,${(new Date() - function_enter_time) / 1000}`)
            return `${body.value}`
        } else {
            logger.error(`getCompanyByUser body not ok.`)
            return '-1';
        }

    } catch (error) {
        logger.error(`getCompanyByUser. Error:${error}`)
        return '-1';
    }
}


module.exports = { getUserRol, getCompanyByUser, getTypeByUser }