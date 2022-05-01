var NodeRSA = require('node-rsa');
var key = new NodeRSA({b: 512});


function encrypt (toEncrypt)
{
    var encrypted = key.encrypt(toEncrypt, 'base64');
    return encrypted;
}

function decrypt(toDecrypt)
{
    var decrypted = key.decrypt(toDecrypt, 'utf8');
    return decrypted;
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;