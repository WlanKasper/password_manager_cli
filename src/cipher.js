var NodeRSA = require('node-rsa');
const fs = require('fs');

function encrypt (toEncrypt)
{
    var encrypted = getKey().encrypt(toEncrypt, 'base64');
    console.log('encrypted => ' + encrypted);
    return encrypted;
}

function decrypt(toDecrypt)
{
    var decrypted = getKey().decrypt(toDecrypt, 'utf8');
    console.log('decrypted => ' + decrypted);
    return decrypted;
}

function saveKey ()
{
    fs.stat('data//key.txt', function(err, stats)
    {
        if (err && stats.size < 1)
        {
            var key = new NodeRSA({b: 512});
            key.setOptions({encryptionScheme: 'pkcs1'});

            try
            {
                fs.writeFileSync(
                'data/key.txt',
                key.exportKey(),
                'utf8'
                );
            }
            catch (e)
            {
                console.log(e);
            }
        }
    });

    
}

function getKey() 
{
    let fileContent = fs.readFileSync('data/key.txt', 'utf8');
    var key =new NodeRSA({b: 512});
    key.importKey(fileContent);
    return key;
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
module.exports.saveKey = saveKey;
// module.exports.getKey = getKey;