const fs = require("fs");
const path = require("path");
const { logger } = require("../logger");
const mime = require('mime-types');

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
      readPath = process.env.ATTACHMENTS_LOCAL_PRIVATE_FOLDER + filePath
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
        readPath = process.env.ATTACHMENTS_LOCAL_PUBLIC_FOLDER + filePath
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

module.exports = { deleteTmpFiles, checkAndCreateFolder, getCleanName, readBinaryFile };
