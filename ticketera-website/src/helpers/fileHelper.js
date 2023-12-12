const FileSaver = require('file-saver');

const saveFile = (paths = [], names = []) => {
  paths.map((path, i) => {
    let name = names[i] || path.split('/').pop()
    if (name.indexOf('\\') > -1) {
      name = name.split('\\').pop()
    }
    FileSaver.saveAs(
      path,
      name
    );
  });
}

module.exports = { saveFile }