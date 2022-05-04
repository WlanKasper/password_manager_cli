const crypto = require("crypto");
const fs = require('fs');

const byteSiq = 'utf8'
const byteStr = 'base64'

function createKeyPair(authorization)
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
      });
}


function encrypt(data) {
    const encryptedData = crypto.publicEncrypt(
        getKey('keys/public.key'),
        Buffer.from(data),
    );
    return encryptedData.toString(byteStr);
}

// function encrypt(data) {
//     const encryptedData = crypto.publicEncrypt({
//             key: getKey('data/public.key'),
//             padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//             oaepHash: "sha256",
//         },
//         Buffer.from(data, byteStr)
//     );
//     return encryptedData;
// }

function decrypt(encryptedData, authorization) {
    const decryptedData = crypto.privateDecrypt(
        {
            key: getKey('keys/private.key'),
            passphrase: authorization,
        },
        Buffer.from(encryptedData, byteStr)
        );
        return decryptedData.toString(byteSiq);
}

// function decrypt(encryptedData) {
//     const decryptedData = crypto.privateDecrypt(
//         {
//           key: getKey('data/private.key'),
//           passphrase: 'test',
//           padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//           oaepHash: "sha256",
//         },
//         Buffer.from(encryptedData, byteStr)
//       );
//       return decryptedData;
// }

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
    // console.log('\nФайл сохранен в ' + path);
}

function getKey(path)
{
    let key = fs.readFileSync(path, byteSiq);
    return key;
}

function checkKeys()
{
    fs.stat('keys/public.key', function(err, stats)
    {
        if (err.errno == -2)
        {
            return false;
        }
    });
    return true;
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
module.exports.createKeyPair = createKeyPair;
module.exports.getKey = getKey;
module.exports.checkKeys = checkKeys;