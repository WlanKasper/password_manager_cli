const fs = require("fs");

let json = '';

function initJSON(user = 'WlanKasper', path = 'data/data.json') {
    try {
        const exists = fs.existsSync(path);
        if (exists) {
            requireJSONFromFile();
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

function getJSON(){
    initJSON();
    return requireDataFromJSON();
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

function requireJSONFromFile(path = 'data/data.json') {
    try {
        const exists = fs.existsSync(path);
        if (exists) {
            let file = fs.readFileSync(path);
            json = JSON.parse(file);
        }
    } catch (e) {
        console.log(e);
    }
}

function requireDataFromJSON(){
    let temp = '';
    if (json != null && json.collections.length != 1){
        for (var i = 0; i <= json.collections.length - 1; i++) {
            for (key in json.collections[i]) {
                if (json.collections[i].hasOwnProperty(key)) {
                        temp += '\n'+key + ": " + json.collections[i][key];
                }
            }
        }
        return temp;
    }
}

function getByCompany(companyName){
    let is = false;
    let temp = '';
    if (json != null && json.collections.length != 1){
        for (var i = 0; i <= json.collections.length - 1; i++) {
            for (key in json.collections[i]) {
                if (json.collections[i].hasOwnProperty(key)) {
                    if(key == 'company' && json.collections[i][key] == transformInput(companyName)){
                        is = true;
                        temp += '\n-----------------'
                    }
                    if (is == true){
                        temp += '\n'+key + ": " + json.collections[i][key];
                    }
                }
            }
            is = false;
        }
        return temp
    }
    return json.collections[0];
}

function transformInput(input) {
    return input.toLowerCase();
}

module.exports.initJSON = initJSON;
module.exports.getJSON = getJSON;
module.exports.addNewCollection = addNewCollection;
module.exports.saveDataToFile = saveDataToFile;
module.exports.requireJSONFromFile = requireJSONFromFile;
module.exports.getByCompany = getByCompany;