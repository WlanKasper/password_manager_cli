/*
* psw_manager_cli v0.1.0
* Записть данных из файла А --> B перенаправлением потока
*/

const fs = require("fs");

const inp = fs.createReadStream('src/unparsed.txt');
const out = fs.createWriteStream('src/parsed.txt');

inp.pipe(out);