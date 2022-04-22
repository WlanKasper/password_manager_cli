/*
* Key: Google
* Value: .json
*/

const fs = require("fs");
const map = new Map();

function addNewCollection(key, val) {
    map.set(key.toLowerCase(), val);
}

function getValueByKey(key) {
    return map.get(key.toLowerCase());
}

function createNewCollection(company, login, password, link = 'empty', mnemonic = 'empty', restore_key = 'empty') {
    return {
        company: company,
        login: login.toLowerCase(),
        password: password,
        link: link,
        mnemonic: mnemonic,
        restore_key: restore_key
    };
}
// Неправильно расставляет скобки, нужно [{},{}], а делает {}{}
function saveDataToFile() {
    for (let mapKey of map.values()) {
        let data = JSON.stringify(mapKey, null, 2);
        fs.appendFileSync('files/data.json', data);
    }
}

// ----- записывает только последний элемент -----
// function saveDataToFile() {
//     const stream = fs.createWriteStream(
//         'files/data.json',
//         'utf8'
//     );
//     stream.on('error', (err) => console.log(`Err: ${err}`));
//     stream.on('finish', () => console.log('Done'));
//     stream.write((chunk) => {
//         for (let mapKey of map.values()) {
//             chunk = JSON.stringify(mapKey, null, 2)
//         }
//     });
//     stream.end();
// }

module.exports.addNewCollection = addNewCollection;
module.exports.getValueByKey = getValueByKey;
module.exports.createNewCollection = createNewCollection;
module.exports.saveDataToFile = saveDataToFile;