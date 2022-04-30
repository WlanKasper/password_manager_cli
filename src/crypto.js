const crypto = require('crypto');

const iv = crypto.randomBytes(16); //генерация вектора инициализации
const key = crypto.scryptSync('sdfj32poierdsfgdsf', 'safkpomf239i32', 32); //генерация ключа


function cipher(json) {
  let encryptedData = '';
  let cipherStream = crypto.createCipheriv(
    'aes-256-cbc',
    key,
    iv
  );
  cipherStream.on('data', (data) => {
    encryptedData += data.toString('hex');
    console.log(encryptedData);
  });
  cipherStream.write(json);
  cipherStream.end();
  return encryptedData;
}

function decipher(encryptedData) {
  let decipherStream = crypto.createDecipheriv(
    'aes-256-cbc',
    key,
    iv
  );
  let decryptedData = '';
  decipherStream.on(
    'data',
    (data) => {
      decryptedData += data;
      console.log(decryptedData);
    }
  );
  decipherStream.write(encryptedData, 'hex');
  decipherStream.end();
}

module.exports.cipher = cipher;
module.exports.decipher = decipher;