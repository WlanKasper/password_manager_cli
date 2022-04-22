/*
* psw_manager_cli v0.1.1
* Записывать данные в json файл
*/

const data = require("./data.js");

let coll = data.createNewCollection('Google','wlankasper@gmail.com', 'test_psw');
data.addNewCollection(coll.company, coll);
data.addNewCollection(coll.company, coll);
data.saveDataToFile();