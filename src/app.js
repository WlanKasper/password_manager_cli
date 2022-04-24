/*
* psw_manager_cli v0.1.1
* Записывать данные в json файл
*/

const data = require("./data.js");

data.initJSON();
// data.addNewCollection('Google','wlankasper@gmail.com', 'test_psw');
// data.addNewCollection('Amazon','wlankasper@gmail.it', 'test_psw_2');
// data.addNewCollection('Nvidea','wlankasper@gmail.it', 'test_psw_3');
// data.saveDataToFile();

console.log(data.requireDataFromFile());