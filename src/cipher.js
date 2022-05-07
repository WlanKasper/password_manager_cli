const crypto = require("crypto");
const fs = require('fs');
const { get } = require("http");

const byteSiq = 'utf8'
const byteStr = 'base64'

function createKeyPair(authorization, callback)
{
    crypto.generateKeyPair('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase: authorization,
        }
      }, (err, publicKey, privateKey) => {
        saveToFile(publicKey, 'keys/public.key');
        saveToFile(privateKey, 'keys/private.key');
        createPswFile(authorization);
      });
}


function encrypt(data) {
    const encryptedData = crypto.publicEncrypt(
        getKey('keys/public.key'),
        Buffer.from(data),
    );
    return encryptedData.toString(byteStr);
}

function decrypt(encryptedData, authorization) {
    try{
        const decryptedData = crypto.privateDecrypt(
            {
              key: getKey('keys/private.key'),
              passphrase: authorization,
            },
            Buffer.from(encryptedData, byteStr)
          );
          return decryptedData.toString(byteSiq);
    } catch (err){
        return false;
    }
}

function saveToFile(data, path)
{
    try {
        fs.writeFileSync
        (
            path,
            data,
            byteSiq
        );
    } catch (e) {
        console.log(e);
    };
}

function getKey(path)
{
    let key = fs.readFileSync(path, byteSiq);
    return key;
}

function checkKeys()
{
    try{
        getKey('keys/psw.key');
        return true;
    }catch(e){
        return false;
    }

}

function createPswFile(psw){
    const hash = crypto.createHash('sha256');
    hash.update(psw);
    saveToFile(hash.digest('hex'), 'keys/psw.key');
}

function checkPsw(psw){
    const hash = crypto.createHash('sha256');
    hash.update(psw);
    if (getKey('keys/psw.key') == hash.digest('hex')) {
        return true;
    }
    return false;
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
module.exports.createKeyPair = createKeyPair;
module.exports.getKey = getKey;
module.exports.checkKeys = checkKeys;
module.exports.checkPsw = checkPsw;
module.exports.createPswFile = createPswFile;