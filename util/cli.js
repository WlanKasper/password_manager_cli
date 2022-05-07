import arg from 'arg';
import inquirer from 'inquirer';
const crypto = require("crypto");

const cipher = require('../src/cipher');
const data = require('../src/manager');

// function parseArgumentsIntoOptions() {
//     const args = arg({
//         '--key': String,

//         '--git': Boolean,
//         '--yes': Boolean,
//         '--install': Boolean,

//         '-k': '--key',

//         '-g': '--git',
//         '-y': '--yes',
//         '-i': '--install'
//     });

//     return {
//         action: true,
//         aeskey: true,
//     };
// }

async function menu(authorization) {
    // MENU
    const menuAnswers = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Menu',
        choices: ['<-> Add new account', '<-> Find account', '<-> Delete all', '<-> Exit'],
    });

    let jsonTempData = data.initJSON('WlanKasper',authorization);

    switch (menuAnswers.action) {

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
            const companyAnswer = await inquirer.prompt({
                type: 'input',
                name: 'company',
                message: 'Enter company name: '
            });

            console.log(data.getCollectionByCompany(jsonTempData, companyAnswer.company));
            break;

        case '<-> Delete all':
            let realy = {
                type: 'confirm',
                name: 'deleteAll',
                message: 'You will never be able to recover the data.\nAre you sure you want to delete all the data?: ',
                default: false
            };
            const answerToDelete = await inquirer.prompt(realy);
            if (answerToDelete.deleteAll == true) {
                data.deleteFile();
            }
            break;

        case '<-> Exit':
            return true;
    }
}

export async function cli() {
    // let options = parseArgumentsIntoOptions();

    if (cipher.checkKeys()) {
        const passwordAnswer = await inquirer.prompt({
            type: 'password',
            name: 'aeskey',
            message: 'Enter your AES password: ',
            mask: '*'
        });

        if (cipher.checkPsw(passwordAnswer.aeskey)) {
            await menu(passwordAnswer.aeskey);
        } else {
            await cli();
        }
    } else {
        const passwordAnswer = await inquirer.prompt({
            type: 'password',
            name: 'rsakey',
            message: 'Welcome!\nYou have to create AES key to encript private RSA key\nEnter your password: ',
            mask: '*'
        });

        cipher.createKeyPair(passwordAnswer.rsakey);
        await menu(passwordAnswer.aeskey);
    }
}