const crypto = require('crypto');

const iv = crypto.randomBytes(16); //генерация вектора инициализации
const key = crypto.scryptSync('secret', 'salt', 32); //генерация ключа

let encryptedData = '';

function cipher(json) {
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
}

function decipher() {
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