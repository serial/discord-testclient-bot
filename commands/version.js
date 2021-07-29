const Discord   = require('discord.js');
const config    = require('../config.json');

module.exports = {
    name: "version",
    description: "shows bot info",
    args: false,
    usage: "shows bot info",
    execute(message) {

        const versionEmbed = new Discord.MessageEmbed()
            //.setColor('#0099ff')
            .setColor('#ff4519')
            .setTitle('Bot Info')
            .setURL('http://serial.rocketfishy.de')
            .setAuthor('misery', 'http://serial.rocketfishy.de/explicitlabs-logo-sign-red.png', 'http://serial.rocketfishy.de')
            .setDescription('Discord bots can perform a number of useful automated tasks and bot commands.')

            .addFields(
                /* { name: '\u200B', value: '\u200B' } */
                { name: 'Author', value: config.author, inline: true },
                { name: 'Version', value: config.version, inline: true },
            )

            .setTimestamp()
            .setFooter('Explicit Labs ', 'http://serial.rocketfishy.de/explicitlabs-logo-sign.png');

        message.channel.send(versionEmbed);


    },
};