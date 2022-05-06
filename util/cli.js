import arg from 'arg';
import inquirer from 'inquirer';

const cipher = require('../src/cipher');
const data = require('../src/manager');

function parseArgumentsIntoOptions() {
    const args = arg({
        '--key': String,

        '--git': Boolean,
        '--yes': Boolean,
        '--install': Boolean,

        '-k': '--key',

        '-g': '--git',
        '-y': '--yes',
        '-i': '--install'
    });

    return {
        action: true,
        aeskey: true,
    };
}

async function menu() {
    if (cipher.checkKeys()) {
        // AES KEY PASSWORD
        let firsQuestion = {
            type: 'password',
            name: 'aeskey',
            message: 'Enter your AES password: ',
            mask: '*'
        };

        const firstAnswers = await inquirer.prompt(firsQuestion);

        var jsonTempData = data.requireDataFromFile(firstAnswers.aeskey);

        if (jsonTempData === 'err_psw'){
            console.log('\nPassword Error\n');
        }else{
            if (jsonTempData === 'err_file'){
                jsonTempData = data.initJSON('Artur', jsonTempData);
                data.createDir();
                data.saveDataToFile(jsonTempData);
            }
            // MENU
            let secondQuestion = {
                type: 'list',
                name: 'action',
                message: 'Menu',
                choices: ['<-> Add new account', '<-> Find account', '<-> Delete all', '<-> Exit'],
            };
            const secondAnswers = await inquirer.prompt(secondQuestion);

            switch (secondAnswers.action) {

                case '<-> Add new account':
                    let questions = [];

                    questions.push({
                        type: 'input',
                        name: 'company',
                        message: 'Enter company name: '
                    });

                    questions.push({
                        type: 'input',
                        name: 'login',
                        message: 'Enter login: '
                    });

                    questions.push({
                        type: 'password',
                        name: 'password',
                        message: 'Enter password: ',
                        mask: '*'
                    });

                    const answers = await inquirer.prompt(questions);

                    jsonTempData = data.addCollectionToJSON(jsonTempData, answers.company, answers.login, answers.password);
                    data.saveDataToFile(jsonTempData);
                    break;

                case '<-> Find account':
                    let company = {
                        type: 'input',
                        name: 'company',
                        message: 'Enter company name: '
                    };

                    const answerCompany = await inquirer.prompt(company);

                    console.log(data.getCollectionByCompany(jsonTempData, answerCompany.company));
                    break;

                case '<-> Delete all':
                    let realy = {
                        type: 'confirm',
                        name: 'deleteAll',
                        message: 'You will never be able to recover the data.\nAre you sure you want to delete all the data?: ',
                        default: false
                    };
                    const answerToDelete = await inquirer.prompt(realy);
                    if (answerToDelete.deleteAll == true){
                        data.deleteFile();
                    }
                    break;

                case '<-> Exit':
                    return true;
            }
        }
    } else {
        // AES KEY PASSWORD
        let firsQuestion = {
            type: 'password',
            name: 'rsakey',
            message: 'Welcome!\nYou have to create AES key to encript private RSA key\nEnter your password: ',
            mask: '*'
        };

        const firstAnswers = await inquirer.prompt(firsQuestion);

        cipher.createKeyPair(firstAnswers.rsakey);
    }
}

export async function cli() {
    // let options = parseArgumentsIntoOptions();
    await menu();
}