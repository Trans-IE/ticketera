const { logger, loggerCSV } = require('../logger');
const { fetchSinToken } = require('../helpers/fetch');

const authenticateUser = async (username, password) => {
    let function_enter_time = new Date();
    logger.info(`==> authenticateUser - username: ${username}`);
    let url = process.env.API_INTEGRACION + "/ActiveDirectory/authenticateUser";
    try {
        const resp = await fetchSinToken(url, { username, password }, 'POST');
        const bodyAPI = await resp.json();
        logger.info(`<== authenticateUser`);
        loggerCSV.info(`authenticateUser,${(new Date() - function_enter_time) / 1000}`)
        if (bodyAPI.ok) {
            return true;
        } else {
            logger.error(`could not authenticate user through ad`);
            return false;
        }
    } catch (error) {
        logger.error(`authenticateUser : ${error}`);
        return false;
    }
}


const authenticateUserAzure = async (username, token) => {
    let function_enter_time = new Date();
    logger.info(`==> authenticateUserAzure - username: ${username}`);
    let url = process.env.API_INTEGRACION + "/azure/authenticateUser";
    try {
        const resp = await fetchSinToken(url, { username, token }, 'POST');
        const bodyAPI = await resp.json();
        logger.info(`<== authenticateUserAzure`);
        loggerCSV.info(`authenticateUserAzure,${(new Date() - function_enter_time) / 1000}`)
        if (bodyAPI.ok) {
            return true;
        } else {
            logger.error(`could not authenticate user via azure. False body`);
            return false;
        }
    } catch (error) {
        logger.error(`authenticateUserAzure : ${error}`);
        return false;
    }
}

const authenticateUserAuth0 = async (username, token) => {
    let function_enter_time = new Date();
    logger.info(`==> authenticateUserAuth0 - username: ${username}`);
    let url = process.env.API_INTEGRACION + "/auth0/authenticateUser";
    try {
        const resp = await fetchSinToken(url, { username, token }, 'POST');
        const bodyAPI = await resp.json();
        logger.info(`<== authenticateUserAuth0`);
        loggerCSV.info(`authenticateUserAuth0,${(new Date() - function_enter_time) / 1000}`)
        if (bodyAPI.ok) {
            return true;
        } else {
            logger.error(`could not authenticate user via Auth0. False body`);
            return false;
        }
    } catch (error) {
        logger.error(`authenticateUserAuth0 : ${error}`);
        return false;
    }
}


module.exports = {
    authenticateUserAzure, authenticateUserAuth0, authenticateUser
}