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
        company: transformInput(company),
        login: transformInput(login),
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

function requireByCompany(companyName) {
    json = requireDataFromFile();
    let is = false;
    for (var i = 0; i <= json.collections.length - 1; i++) {
        for (key in json.collections[i]) {
            if (json.collections[i].hasOwnProperty(key)) {
                if(key == 'company' && json.collections[i][key] == transformInput(companyName)){
                    is = true;
                }
                if (is == true){
                    console.log("Ключ = " + key);
                    console.log("Значение = " + json.collections[i][key]);
                }
            }
        }
        is = false;
    }
}

function transformInput(input) {
    return input.toLowerCase();
}

module.exports.initJSON = initJSON;
module.exports.addNewCollection = addNewCollection;
module.exports.saveDataToFile = saveDataToFile;
module.exports.requireDataFromFile = requireDataFromFile;
module.exports.requireByCompany = requireByCompany;