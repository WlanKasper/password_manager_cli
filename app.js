/*
* psw_manager_cli v0.1.1
* Записывать данные в json файл
*/

const data = require("./data.js");

data.requierDataFromFile();
data.createNewCollection('Google','wlankasper@gmail.com', 'test_psw');
data.createNewCollection('Amazon','wlankasper@gmail.it', 'test_psw_2');
data.saveDataToFile();
