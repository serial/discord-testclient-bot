const Discord   = require('discord.js');
const fs        = require('fs');

const { prefix, token }     = require('./config.json');
const tools                 = require('./inc/tools.js');

const client    = new Discord.Client();
client.commands = new Discord.Collection();

module.exports  = {Discord, client};


const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));


// build client collection and serve an Array of all commands (see module.exports)
let i = 0;
let cmdList = [];

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);

    if (command.hidden !== true) {
        cmdList.push({
            id: i,
            name: command.name,
            description: command.description,
            usage: command.usage
        });
    }

    module.exports = {
        cmdList
    }
    i++;
}



client.on('ready', () => {
    console.log('I am ready!');
    console.log(`Logged in as ${client.user.tag}!`);
});


/*
 * dynamic commands/file handler - on `message` event
 */
client.on("message", (message) => {

    // some static reactions
    const responseObject = {
        "ayy": "Ayy, lmao!",
        "wat": "Say what?",
        "lol": "roflmao"
    };
    if(responseObject[message.content]) {
        message.channel.send(responseObject[message.content]);
    }

    // check if prefix is set and correct
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // split args and get command name without prefix
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    /*console.log('commandName: ' + commandName);*/

    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);


    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    try {

        /*
         * Check if the Admin-Parameter in {file} is set to true
         */
        if (command.admin) {
            if (tools.isAdmin(message.author.id)) {

                message.channel.send(`Admin command executed!`)
                    .then(message => {
                        setTimeout(() => message.delete(), 5000)
                    })
                    .catch(console.error)

                command.execute(message, args);
            } else {
                message.reply(`Sorry you don't have permission to use \`${command.name} \``);
            }
        } else {
            command.execute(message, args);
        }

    } catch (error) {
        console.error(error);
        message.reply("there was an error trying to execute that command!");
    }
});




//last line
client.login(token);