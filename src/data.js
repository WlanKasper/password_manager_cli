const fs = require("fs");

let json = '';

function initJSON(user = 'WlanKasper', path = 'data/data.json') {
    try {
        const exists = fs.existsSync(path);
        if (exists) {
            json = requireDataFromFile();
        } else {
            json = {
                user: user,
                collections: []
            };
        }
    } catch (e) {
        console.log(e);
    }
}

function addNewCollection(company, login, password, link, mnemonic, restore_key) {
    json.collections.push({
        company: company,
        login: login.toLowerCase(),
        password: password,
        link: link,
        mnemonic: mnemonic,
        restore_key: restore_key
    });
}

function saveDataToFile(path = 'data/data.json') {
    const stream = fs.createWriteStream(
        path,
        'utf8'
    );
    stream.on('error', (err) => console.log(`Err: ${err}`));
    stream.on('finish', () => console.log('Done'));
    stream.write(JSON.stringify(json, null, 2));
    stream.end();
}

function requireDataFromFile(path = 'data/data.json') {
    try {
        const exists = fs.existsSync(path);
        if (exists) {
            let file = fs.readFileSync(path);
            return JSON.parse(file);
        }
    } catch (e) {
        console.log(e);
    }
}

function createFileDir(){
    try {
        fs.mkdirSync('data', { recursive: true });
        console.log('Created dir ~/data');
      } catch (e) {
        console.log(e);
      }
      
}

module.exports.initJSON = initJSON;
module.exports.addNewCollection = addNewCollection;
module.exports.saveDataToFile = saveDataToFile;
module.exports.requireDataFromFile = requireDataFromFile;