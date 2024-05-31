const fs = require("node:fs");
const path = require("node:path");
const { logger } = require("../logger");

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

module.exports = { deleteTmpFiles, checkAndCreateFolder };
