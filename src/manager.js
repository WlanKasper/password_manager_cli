const fs = require('fs');
const cipher = require('./cipher');

// ------------------------------------------------------------------------------------------------

const path = 'data/data.txt';

// ------------------------------------------------------------------------------------------------

const byteSiq = 'utf8'
const byteStr = 'base64'

// ------------------------------------------------------------------------------------------------

function requireDataFromFile(authorization) {
    let fileContent = fs.readFileSync(path, byteSiq);
    let decrypted = cipher.decrypt(fileContent, authorization).toString(byteStr);
    let temp = convertStringToJSON(decrypted);
    return temp;
}

function saveDataToFile(tempJSON) {
    let data = convertJSONtoString(tempJSON);
    let encrypted = cipher.encrypt(data);
    try {
        fs.writeFileSync(
            path,
            encrypted.toString(byteStr),
            byteSiq
        );

        // console.log('\nФайл сохранен\n');
    } catch (e) {
        console.log(e);
    }

}

// ------------------------------------------------------------------------------------------------

function addStandardAccToJSON(tempJSON, company, login, password, link, restore_key, notes) {
    if (tempJSON != undefined && company != undefined) {
        tempJSON.collections.push({
            company: company,
            login: login,
            password: password,
            link: link,
            restore_key: restore_key,
            notes: notes
        });
        // console.log('\nДобавленна новая коллекция\n');
    } else {
        // console.log('\nНе добавленна новая коллекция\n');
    }
    return tempJSON;
}

function addCryptoAccToJSON(tempJSON, company, address, password, mnemonic, link, notes) {
    if (tempJSON != undefined && company != undefined) {
        tempJSON.collections.push({
            company: company,
            address: address,
            password: password,
            mnemonic: mnemonic,
            link: link,
            notes: notes
        });
        // console.log('\nДобавленна новая коллекция\n');
    } else {
        // console.log('\nНе добавленна новая коллекция\n');
    }
    return tempJSON;
}

// ------------------------------------------------------------------------------------------------

function getAccByCompany(tempJSON, company) {
    let is = false;
    let temp = '';
    if (tempJSON != null && tempJSON.collections.length != 0) {
        for (var i = 0; i <= tempJSON.collections.length - 1; i++) {
            for (key in tempJSON.collections[i]) {
                if (tempJSON.collections[i].hasOwnProperty(key)) {
                    if (key == 'company' && tempJSON.collections[i][key].toLowerCase() == company.toLowerCase()) {
                        is = true;
                        temp += '\n-----------------'
                    }
                    if (is == true) {
                        temp += '\n' + key + ": " + tempJSON.collections[i][key];
                    }
                }
            }
            is = false;
        }
        return (temp != '') ? temp : '\nДанные отсутствуют\n';
    }
}

function getAccByAddress(tempJSON, address) {
    let is = false;
    let temp = '';
    if (tempJSON != null && tempJSON.collections.length != 0) {
        for (var i = 0; i <= tempJSON.collections.length - 1; i++) {
            for (key in tempJSON.collections[i]) {
                if (tempJSON.collections[i].hasOwnProperty(key)) {
                    if (key == 'address' && tempJSON.collections[i][key].toLowerCase() == address.toLowerCase()) {
                        is = true;
                        temp += '\n-----------------'
                    }
                    if (is == true) {
                        temp += '\n' + key + ": " + tempJSON.collections[i][key];
                    }
                }
            }
            is = false;
        }
        return (temp != '') ? temp : '\nДанные отсутствуют\n';
    }
}
// ------------------------------------------------------------------------------------------------

function createDir() {
    try {
        fs.mkdirSync('data', {
            recursive: true
        });
        // console.log('\nСоздана дирркетория Data\n');
    } catch (e) {
        console.log(e);
    }
}

function deleteFile() {
    fs.stat(path, function (err, stats) {
        if (!err) {
            try {
                fs.unlinkSync(path);
                // console.log('\nФайл удален\n');
            } catch (e) {
                console.log(e);
            }
        }
    });
}

// ------------------------------------------------------------------------------------------------

function initJSON(user = 'Me', authorization) {
    let tempJSON;

    try {
        tempJSON = requireDataFromFile(authorization);
    } catch (error) {
        tempJSON = {
            user: user,
            collections: []
        };
    }

    return tempJSON;
}

function convertJSONtoString(json) {
    return JSON.stringify(json);
}

function convertStringToJSON(string) {
    return JSON.parse(string);
}

// ------------------------------------------------------------------------------------------------

module.exports = {
    addStandardAccToJSON: addStandardAccToJSON,
    saveDataToFile: saveDataToFile,
    deleteFile: deleteFile,
    getAccByCompany: getAccByCompany,
    requireDataFromFile: requireDataFromFile,
    initJSON: initJSON,
    createDir: createDir,
    addCryptoAccToJSON: addCryptoAccToJSON,
    getAccByAddress: getAccByAddress
};