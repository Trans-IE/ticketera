const { logger, loggerCSV } = require('../logger');
const util = require('util');
const fs = require('fs');
const path = require('path');
const csvtojson = require('csvtojson');
const XLSX = require('xlsx');
const { getCustomTitle } = require('./formatter');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const insertNLPModelTrainingDataFile = async (csvPath, id_model) => {
    try {
        const exec = util.promisify(require("child_process").exec);
        // Leer el archivo CSV
        const csvData = fs.readFileSync(csvPath, 'utf8');
        // Modificar los datos del archivo CSV agregando el valor de id_model
        const modifiedCsvData = csvData.split('\n').map(line => {
            const [example, tag] = line.split(',');
            return `${id_model},${example},${tag}`;
        }).join('\n');
        // Crear un archivo temporal con los datos modificados
        const tempFilePath = `${path.dirname(csvPath)}/${id_model}_tmp`;
        fs.writeFileSync(tempFilePath, modifiedCsvData);
        // Ejecutar el comando COPY con el archivo temporal modificado
        let command_line = `"${process.env.PSQL_PATH}" -c "\\copy bot.nlp_model_data (id_model, example, tag) FROM ${tempFilePath} WITH DELIMITER ',' CSV HEADER --append" "dbname=${process.env.DB_PG_NAME} user=${process.env.DB_PG_USER} password=${process.env.DB_PG_PASSWORD} host=${process.env.DB_PG_HOST} port=${process.env.DB_PG_PORT}"`;
        const { stdout, stderr } = await exec(command_line);
        if (stderr) {
            logger.error(`insertNLPModelTrainingDataFile: ${stderr}`);
        }
        // Eliminar el archivo temporal
        fs.unlinkSync(tempFilePath);
        fs.unlinkSync(csvPath);
    } catch (error) {
        throw new Error(`insertNLPModelTrainingDataFile error: ${error}`);
    }
}



const psqlToCsv = async (query, filepath) => {

    try {
        logger.info(`init psqlToCsv params: ${query} ${filepath} `);
        if (query[query.length - 1] === ';') {
            query = query.substr(0, query.length - 1);
        }
        const exec = util.promisify(require("child_process").exec);
        let command_line = `"${process.env.PSQL_PATH}" -c "\\copy (${query}) TO '${filepath}' CSV HEADER" "dbname=${process.env.DB_PG_NAME} user=${process.env.DB_PG_USER} password=${process.env.DB_PG_PASSWORD} host=${process.env.DB_PG_HOST} port=${process.env.DB_PG_PORT} "`;
        console.log("LOGUEAME ESTO DEL CSV: ", command_line);
        const { stdout, stderr } = await exec(command_line);
        if (stderr) {
            logger.error(`psqlToCsv: ${stderr}`);
            //    throw stderr;
        }
        logger.info(`psqlToCsv ${stdout}`);

    } catch (error) {
        throw new Error(`psqlToCsv error: ${error}`)
    }

}


const csvToExcel = async (csvFilePath, xlsxFilePath) => {

    // Leer el archivo CSV y convertirlo a un objeto JSON
    try {
        let jsonObj = await csvtojson().fromFile(csvFilePath)
        // Crear un nuevo libro de Excel
        const workbook = XLSX.utils.book_new();

        // Crear una hoja de trabajo y agregar los datos del objeto JSON
        const worksheet = XLSX.utils.json_to_sheet(jsonObj);

        // Agregar la hoja de trabajo al libro de Excel
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');

        // Escribir el libro de Excel en un archivo
        XLSX.writeFile(workbook, xlsxFilePath, { bookType: 'xlsx', type: 'buffer' });

        console.log(`El archivo ${xlsxFilePath} se ha creado correctamente.`);
        return xlsxFilePath
    } catch (error) {
        console.error(error);
    }

}

const generateNodeCSV = async (path = "", data = []) => {
    try {
        const headers = Object.keys(data[0] || {}).map(item => { return { id: item, title: getCustomTitle(item) } })

        const csvWriter = createCsvWriter({
            path: path,
            header: headers
        });

        await csvWriter.writeRecords(data);

    } catch (error) {
        throw new Error(error)
    }

}

module.exports = { insertNLPModelTrainingDataFile, psqlToCsv, csvToExcel, generateNodeCSV };
