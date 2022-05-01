const fs = require('fs');

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
            saveDataToFile(convertJSONtoString(tempJSON));
        }
        else
        {
            console.log('Файл не найден или пуст');
            initJSON();
            createDir();
            saveDataToFile(convertJSONtoString(tempJSON));
        }
    });
}

// ------------------------------------------------------------------------------------------------

function requireDataFromFile()
{
    let fileContent = fs.readFileSync(path, 'utf8');
    console.log(fileContent);
    tempJSON = convertStringToJSON(fileContent);
}

function createDir()
{
    try
    {
        fs.mkdirSync('files', { recursive: true });
    }
    catch (e)
    {
        console.log(e);
    }
}

function saveDataToFile(data)
{
    try
    {
        fs.writeFileSync(
          path,
          data,
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