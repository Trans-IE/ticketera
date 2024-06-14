const logger = require("../logger")
const { fetchSinToken } = require("./fetch")

const getUserType = async ({ username = "" }) => {
    try {
        const url = `${process.env.HOST_TICKETERA_BACKEND}/entities/getTypeByUser`
        const resp = await fetchSinToken(url, { username }, 'POST')
        const body = await resp.json()

        return body.value ?? ''
    } catch (error) {
        logger.error(`getUserType - ${error.toString()}`)
        return ''
    }
}

module.exports = { getUserType }