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
    const menuAnswerStandard = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Menu',
        choices: ['<-> Add new account', '<-> Find account', '<-> Delete all', '<-> Exit'],
    });

    let jsonTempData = data.initJSON('WlanKasper', authorization);
    console.clear();
    switch (menuAnswerStandard.action) {

        case '<-> Add new account':

            const typeAnswer = await inquirer.prompt({
                type: 'list',
                name: 'insert',
                message: 'Wich type of account',
                choices: ['<-> Standard', '<-> Crypto'],
            });

            switch (typeAnswer.insert) {

                case '<-> Standard':
                    let standardAcc = [];

                    standardAcc.push({
                        type: 'input',
                        name: 'company',
                        message: 'Company: '
                    });

                    standardAcc.push({
                        type: 'input',
                        name: 'login',
                        message: 'Login: '
                    });

                    standardAcc.push({
                        type: 'password',
                        name: 'password',
                        message: 'Password: ',
                        mask: '*'
                    });

                    standardAcc.push({
                        type: 'input',
                        name: 'link',
                        message: 'Link (optional): '
                    });

                    standardAcc.push({
                        type: 'input',
                        name: 'key',
                        message: 'Reset Key (optional): '
                    });

                    standardAcc.push({
                        type: 'input',
                        name: 'notes',
                        message: 'Notes (optional): '
                    });

                    const answerStandard = await inquirer.prompt(standardAcc);
                    jsonTempData = data.addStandardAccToJSON(jsonTempData, answerStandard.company, answerStandard.login, answerStandard.password, answerStandard.link, answerStandard.key, answerStandard.notes);
                    data.saveDataToFile(jsonTempData);
                    break;

                case '<-> Crypto':
                    let cryptiAcc = [];

                    cryptiAcc.push({
                        type: 'input',
                        name: 'company',
                        message: 'Company: '
                    });

                    cryptiAcc.push({
                        type: 'input',
                        name: 'address',
                        message: 'Addres: '
                    });

                    cryptiAcc.push({
                        type: 'password',
                        name: 'password',
                        message: 'Password: ',
                        mask: '*'
                    });

                    cryptiAcc.push({
                        type: 'input',
                        name: 'mnemonic',
                        message: 'Mnemonic: ',
                    });

                    cryptiAcc.push({
                        type: 'input',
                        name: 'link',
                        message: 'Link (optional): '
                    });
                    cryptiAcc.push({
                        type: 'input',
                        name: 'notes',
                        message: 'Notes (optional): '
                    });

                    const answerCrypto = await inquirer.prompt(cryptiAcc);
                    jsonTempData = data.addCryptoAccToJSON(jsonTempData, answerCrypto.company, answerCrypto.address, answerCrypto.password, answerCrypto.mnemonic, answerCrypto.link, answerCrypto.notes);
                    data.saveDataToFile(jsonTempData);
                    break;
            }
            break;

        case '<-> Find account':
            const answerFind = await inquirer.prompt({
                type: 'list',
                name: 'findBy',
                message: 'Choice parameter: ',
                choices: ['<-> By company', '<-> By address'],
            });
            switch (answerFind.findBy) {
                case '<-> By company':
                    const answerCompany = await inquirer.prompt({
                        type: 'input',
                        name: 'company',
                        message: 'Company to find: '
                    });

                    console.log(data.getAccByCompany(jsonTempData, answerCompany.company));
                    console.log('\n-----------------\n\n');
                    break;

                case '<-> By address':
                    const answerAddress = await inquirer.prompt({
                        type: 'input',
                        name: 'address',
                        message: 'Address to find: '
                    });

                    console.log(data.getAccByAddress(jsonTempData, answerAddress.address));
                    console.log('-----------------\n\n');
                    break;
            }
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
            return false;
    }
    return true;
}

export async function cli() {
    // let options = parseArgumentsIntoOptions();
    console.clear();
    if (cipher.checkKeys()) {
        const passwordAnswer = await inquirer.prompt({
            type: 'password',
            name: 'aeskey',
            message: 'Enter your AES password: ',
            mask: '*'
        });

        if (cipher.checkPsw(passwordAnswer.aeskey)) {
            while (await menu(passwordAnswer.aeskey)){}
        } else {
            await cli();
        }
    } else {
        const passwordAnswerFirst = await inquirer.prompt({
            type: 'password',
            name: 'rsakey',
            message: 'Welcome!\nYou have to create AES key to encript private RSA key\nEnter your password: ',
            mask: '*'
        });

        const passwordAnswerSecond = await inquirer.prompt({
            type: 'password',
            name: 'rsakey',
            message: 'Verify password: ',
            mask: '*'
        });

        if (passwordAnswerFirst.password == passwordAnswerSecond.password){
            cipher.createKeyPair(passwordAnswerFirst.rsakey);
            while (await menu(passwordAnswer.aeskey)){}
        } else {
            await cli();
        }
    }
}