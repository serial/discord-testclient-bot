const config             = require('../config.json');
const app                = require('../app.js');

module.exports = {
    name: "help",
    description: "shows this help",
    admin: false,
    args: false,
    usage: null,
    execute(message, args) {

        let cmdList = app.cmdList;
        let output  = '';
        let i = 1;

        for (let cmd of cmdList) {
            //console.log('\n' + 'Run: ' + i + ' | ID: ' + cmd.id + ' | Use: ' + config.prefix + cmd.name + ' | ' + cmd.description);
            output += '\n' + config.prefix + cmd.name + ' | ' + cmd.description;
            i++;
        }

        message.reply(`my commands: \n${output}`);

    }
};