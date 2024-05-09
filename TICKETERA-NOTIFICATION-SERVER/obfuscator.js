const fs = require('fs');
const JavascriptObfuscator = require('javascript-obfuscator');

async function obfuscateAndSaveFile(filePath, outputPath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            const obfuscationResult = JavascriptObfuscator.obfuscate(data, {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 0.75,
                numbersToExpressions: true,
                simplify: true,
                shuffleStringArray: true,
                splitStrings: true,
                stringArray: true,
                stringArrayEncoding: ['base64', 'rc4'],
                unicodeEscapeSequence: true
              });

            fs.writeFile(outputPath, obfuscationResult.getObfuscatedCode(), (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    });
}

async function obfuscateAndSaveFolder(inputFolder, outputFolder) {
    if (fs.existsSync(outputFolder)) {
        fs.readdirSync(outputFolder).forEach(file => {
            fs.unlinkSync(`${outputFolder}/${file}`);
        });
        fs.rmdirSync(outputFolder);
    }
    fs.mkdirSync(outputFolder);

    const files = fs.readdirSync(inputFolder);
    const promises = files.map(async (file) => {
        const filePath = `${inputFolder}/${file}`;
        const outputPath = `${outputFolder}/${file}`;
        await obfuscateAndSaveFile(filePath, outputPath);
    });

    await Promise.all(promises);
}

function CheckFolderRoot(rootFolder) {
    if (!fs.existsSync(rootFolder)) {
        fs.mkdirSync(rootFolder);
    }
}

(async () => {
    try {
        CheckFolderRoot("./obfuscate");
        await obfuscateAndSaveFolder('models', './obfuscate/models');
        await obfuscateAndSaveFolder('helpers', './obfuscate/helpers');
        await obfuscateAndSaveFolder('database', './obfuscate/database');
        await obfuscateAndSaveFile('index.js', './obfuscate/index.js');

        console.log('Todos los archivos han sido obfuscados y guardados.');
    } catch (error) {
        console.error('Error:', error);
    }
})();


