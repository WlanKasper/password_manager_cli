const fs = require('fs');
const cipher = require('./cipher');

// ------------------------------------------------------------------------------------------------

const path = 'data/data.txt';
var tempJSON;

// ------------------------------------------------------------------------------------------------

function initTemp(callback_1, callback_save)
{
    fs.stat(path, function(err, stats)
    {
        if (!err && stats.size > 0)
        {
            console.log('\nФайл найден\n');
            requireDataFromFile();
        }
        else
        {
            console.log('\nФайл не найден или пуст\n');
            initJSON();
            createDir();
        }
        // Для другого
        callback_1();
        // Для сохранения
        callback_save();
    });
}

// ------------------------------------------------------------------------------------------------

function requireDataFromFile()
{
    let fileContent = fs.readFileSync(path, 'utf8');
    console.log('FILE CONTENT: ' + fileContent);

    let encrypted = cipher.decrypt(fileContent).toString('base64');
    console.log('ENCT: ' + encrypted);

    tempJSON = convertStringToJSON(encrypted);
    console.log('JSON: ' + tempJSON);
}

function saveDataToFile()
{
    let data = convertJSONtoString(tempJSON);
    let encrypted = cipher.encrypt(data);
    try
    {
        fs.writeFileSync(
          path,
          encrypted.toString('base64'),
          'utf8'
        );

        console.log('\nФайл сохранен\n');
    }
    catch (e)
    {
        console.log(e);
    }
      
}

// ------------------------------------------------------------------------------------------------

function addCollectionToJSON(company, login, password, link, mnemonic, restore_key)
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
        console.log('\nДобавленна новая коллекция\n');
    }
    else
    {
        console.log('\nНе добавленна новая коллекция\n');
    }
}

// ------------------------------------------------------------------------------------------------

function getCollectionByCompany(company)
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
        console.log('\nСоздана дирркетория Data\n');
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
                console.log('\nФайл удален\n');
            } catch (e)
            {
                console.log(e);
            }
        }
    });
}

// ------------------------------------------------------------------------------------------------

function initJSON(user = 'Me')
{
    tempJSON = {
        user: user,
        collections: []
    };
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
    getCollectionByCompany: getCollectionByCompany
};