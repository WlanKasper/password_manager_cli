/*
* Key: Google
* Value: .json
*/

const fs = require("fs");
const map = new Map();
let json = '';

createBaseJSON('user_1');

function createBaseJSON(user) {
    json = {
        user: user,
        collections: []
    };
}

function createNewCollection(company, login, password, link, mnemonic, restore_key) {
    json.collections.push({
        company: company,
        login: login.toLowerCase(),
        password: password,
        link: link,
        mnemonic: mnemonic,
        restore_key: restore_key
    });
}

function saveDataToFile() {
    const stream = fs.createWriteStream(
        'files/data.json',
        'utf8'
    );
    stream.on('error', (err) => console.log(`Err: ${err}`));
    stream.on('finish', () => console.log('Done'));
    stream.write(JSON.stringify(json, null, 2));
    stream.end();
}

function requireDataFromFile() {
    let file = fs.readFileSync('files/data.json');
    let data = JSON.parse(file);
    console.log(data);
}

module.exports.createNewCollection = createNewCollection;
module.exports.saveDataToFile = saveDataToFile;
module.exports.requierDataFromFile = requireDataFromFile;