const fs = require('fs');
const cipher = require('./cipher');

// ------------------------------------------------------------------------------------------------

const path = 'data/data.txt';

// ------------------------------------------------------------------------------------------------

const byteSiq = 'utf8'
const byteStr = 'base64'

// ------------------------------------------------------------------------------------------------

function initTemp(authorization, callback_save)
{
    fs.stat(path, function(err, stats)
    {
        if (!err && stats.size > 0)
        {
            // console.log('\nФайл найден\n');
            requireDataFromFile(authorization);
        }
        else
        {
            // console.log('\nФайл не найден или пуст\n');
            
        }
        // Для другого
        callback_1();
        // Для сохранения
        callback_save();
    });
}

// ------------------------------------------------------------------------------------------------

function requireDataFromFile(authorization)
{
    try{
        var fileContent = fs.readFileSync(path, byteSiq);
    }catch(err){
        return 'err_file'
    }
    var decrypted = cipher.decrypt(fileContent, authorization).toString(byteStr);

    var temp = convertStringToJSON(decrypted);

    if (temp == false){
        return 'err_psw';
    }
    return temp;
}

function saveDataToFile(tempJSON)
{
    let data = convertJSONtoString(tempJSON);
    let encrypted = cipher.encrypt(data);
    try
    {
        fs.writeFileSync(
          path,
          encrypted.toString(byteStr),
          byteSiq
        );

        // console.log('\nФайл сохранен\n');
    }
    catch (e)
    {
        console.log(e);
    }
      
}

// ------------------------------------------------------------------------------------------------

function addCollectionToJSON(tempJSON, company, login, password, link, mnemonic, restore_key)
{
    if (tempJSON != undefined && company != undefined)
    {
        tempJSON.collections.push
        ({
            company: company,
            login: login,
            password: password,
            link: link,
            mnemonic: mnemonic,
            restore_key: restore_key
        });
        // console.log('\nДобавленна новая коллекция\n');
    }
    else
    {
        // console.log('\nНе добавленна новая коллекция\n');
    }
    return tempJSON;
}

// ------------------------------------------------------------------------------------------------

function getCollectionByCompany(tempJSON, company)
{
    let is = false;
    let temp = '';
    if (tempJSON != null && tempJSON.collections.length != 0){
        for (var i = 0; i <= tempJSON.collections.length - 1; i++) {
            for (key in tempJSON.collections[i]) {
                if (tempJSON.collections[i].hasOwnProperty(key)) {
                    if(key == 'company' && tempJSON.collections[i][key] == company){
                        is = true;
                        temp += '\n-----------------'
                    }
                    if (is == true){
                        temp += '\n'+key + ": " + tempJSON.collections[i][key];
                    }
                }
            }
            is = false;
        }
        return (temp != '') ? temp : '\nДанные отсутствуют\n';
    }
}

// ------------------------------------------------------------------------------------------------

function createDir()
{
    try
    {
        fs.mkdirSync('data', { recursive: true });
        // console.log('\nСоздана дирркетория Data\n');
    }
    catch (e)
    {
        console.log(e);
    }
}

function deleteFile()
{
    fs.stat(path, function(err, stats)
    {
        if (!err)
        {
            try
            {
                fs.unlinkSync(path);
                // console.log('\nФайл удален\n');
            } catch (e)
            {
                console.log(e);
            }
        }
    });
}

// ------------------------------------------------------------------------------------------------

function initJSON(user = 'Me', tempJSON)
{
    tempJSON = {
        user: user,
        collections: []
    };
    return tempJSON;
}

function convertJSONtoString(json)
{
    return JSON.stringify(json);
}

function convertStringToJSON(string)
{
    return JSON.parse(string);
}

// ------------------------------------------------------------------------------------------------

module.exports = {
    initTemp: initTemp,
    addCollectionToJSON: addCollectionToJSON,
    saveDataToFile: saveDataToFile,
    deleteFile: deleteFile,
    getCollectionByCompany: getCollectionByCompany,
    requireDataFromFile: requireDataFromFile,
    initJSON:initJSON,
    createDir:createDir
};