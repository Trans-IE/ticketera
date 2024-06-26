const fs = require("node:fs");
const path = require("node:path");
const { logger } = require("../logger");
const mime = require('mime-types');
const { getFormatDate } = require("./isDate");

const deleteTmpFiles = (folderPath = "", olderThanSeconds = 3600) => {
  try {
    const files = fs.readdirSync(folderPath);

    const currentTime = Date.now();

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const fileStats = fs.statSync(filePath);
      const fileAgeInSeconds = (currentTime - fileStats.mtime.getTime()) / 1000;

      if (fileAgeInSeconds > olderThanSeconds) {
        fs.unlinkSync(filePath);
        logger.info(`Deleted file: ${filePath}`);
      }
    });

    return "Files deleted successfully.";
  } catch (error) {
    logger.error(error);
    return "";
  }
};

const checkAndCreateFolder = (folderPath) => {

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
}

const getCleanName = (name) => {
  let modifiedString = name.replace(/ /g, '_');

  // Convertir a minúsculas
  modifiedString = modifiedString.toLowerCase();

  // Reemplazar tildes y caracteres especiales
  const accentMap = {
    'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
    'ü': 'u', 'ñ': 'n'
  };

  modifiedString = modifiedString.replace(/[áéíóúüñ]/g, match => accentMap[match] || match);
  modifiedString = modifiedString.replace(/[^a-z0-9_]/g, '');

  return modifiedString;
}

const readBinaryFile = (filePath = "") => {
  try {
    let readPath = ""
    if (filePath) {
      readPath = process.env.ATTACHMENTS_LOCAL_PRIVATE_DESTINATION_FOLDER + filePath
      if (fs.existsSync(readPath)) {
        const binaryData = fs.readFileSync(readPath);
        const MIMEType = mime.lookup(readPath) || 'application/octet-stream';
        const filename = readPath.split('/').pop();

        return {
          data: binaryData,
          MIMEType: MIMEType,
          filename: filename
        };
      } else {
        return {
          data: null,
          MIMEType: null,
          filename: null
        };
      }
    } else {
      return {
        data: null,
        MIMEType: null,
        filename: null
      };
    }
  } catch (error) {
    console.error('Error reading binary file:', error);
    return {
      data: null,
      MIMEType: null,
      filename: null
    };
  }
}

const makeid = (length = 0) => {
  length = length + 10;
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const loadFileServer = (fileToUpload, idTicket) => {

  const return_promise = new Promise((resolve, reject) => {
    try {
      const date = new Date();
      let savePath = `${process.env.ATTACHMENTS_LOCAL_PRIVATE_DESTINATION_FOLDER}${path.sep}${getFormatDate(date)}${path.sep}${idTicket}${path.sep}${makeid(Math.floor(Math.random() * 50) + 1)}`;

      fs.mkdirSync(savePath, { recursive: true });

      let filename = fileToUpload.filename ? fileToUpload.filename.indexOf('.') > 0 ? fileToUpload.filename.substring(0, fileToUpload.filename.indexOf('.')) : fileToUpload.filename : makeid(Math.floor(Math.random() * 50) + 30)
      filename = getCleanName(filename);
      savePath = savePath + `${path.sep}${filename}.${fileToUpload.path.substr(fileToUpload.path.indexOf('.') + 1)}`
      var buffer = fs.readFileSync(fileToUpload.path);
      fs.writeFileSync(savePath, buffer);
      resolve(savePath.replace(process.env.ATTACHMENTS_LOCAL_PRIVATE_DESTINATION_FOLDER, ''));
    } catch (error) {
      logger.error(`loadFileServer: ${error}`);
      reject(error);
    }

  });

  return return_promise;

}

module.exports = { deleteTmpFiles, checkAndCreateFolder, getCleanName, readBinaryFile, loadFileServer };
