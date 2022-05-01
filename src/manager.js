const fs = require('fs');
const cipher = require('./cipher');

// ------------------------------------------------------------------------------------------------

const path = 'data/data.txt';
var tempJSON;

// ------------------------------------------------------------------------------------------------

function initTemp()
{
    fs.stat(path, function(err, stats)
    {
        if (!err && stats.size > 10)
        {
            console.log('Файл найден');
            requireDataFromFile();
            addCollectionToJSON('google', 'login123', 'psw123');
            saveDataToFile();
        }
        else
        {
            console.log('Файл не найден или пуст');
            initJSON();
            createDir();
            saveDataToFile();
        }
    });
}

// ------------------------------------------------------------------------------------------------

function requireDataFromFile()
{
    let fileContent = fs.readFileSync(path, 'utf8');
    console.log('fileContent => ' + fileContent);
    let encrypted = cipher.decrypt(fileContent);
    tempJSON = convertStringToJSON(encrypted);
}

function createDir()
{
    try
    {
        fs.mkdirSync('data', { recursive: true });
    }
    catch (e)
    {
        console.log(e);
    }
}

function saveDataToFile()
{
    let data = convertJSONtoString(tempJSON);
    try
    {
        fs.writeFileSync(
          path,
          cipher.encrypt(data),
          'utf8'
        );
    }
    catch (e)
    {
        console.log(e);
    }
      
}

// ------------------------------------------------------------------------------------------------

function addCollectionToJSON(company, login, password, link, mnemonic, restore_key)
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

module.exports.initTemp = initTemp;
module.exports.addCollectionToJSON = addCollectionToJSON;