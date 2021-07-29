const app                = require('../app.js');

module.exports = {
    name: "activity",
    description: "sets the bot activity",
    admin: true,
    args: true,
    usage: '{type [playing, streaming, listening, watching]} "{options (optional) [Twitch / YouTube stream URL]}" ',
    execute(message, args) {

        let type = args[0];


        const validTypes = ['reset', 'playing', 'streaming', 'listening', 'watching'];
        const result = validTypes.some(substring => type.includes(substring));

        if(result === true) {
            // admin checking will be done in the app.js

            if (type === 'reset') {
                app.client.user.setActivity(' ')
                    .catch(console.error);
            } else {
                let options = args.slice(1).join(' ');
                //console.log(options);

                app.client.user.setActivity(options, { type: type.toUpperCase() })
                    .catch(console.error);

                const activityEmbed = new app.Discord.MessageEmbed()
                    //.setColor('#0099ff')
                    .setColor('#ff4519')
                    .setTitle('Activity Set')
                    .setURL('http://serial.rocketfishy.de')
                    .setAuthor('misery', 'http://serial.rocketfishy.de/explicitlabs-logo-sign-red.png', 'http://serial.rocketfishy.de')

                    .addFields(
                        /* { name: '\u200B', value: '\u200B' } */
                        { name: 'Type', value: type, inline: true },
                        { name: 'Params', value: options, inline: true },
                    )

                    .setTimestamp()
                    .setFooter('Explicit Labs ', 'http://serial.rocketfishy.de/explicitlabs-logo-sign.png');

                message.channel.send(activityEmbed);
            }

        } else {
            message.reply(`Type is not valid! try: \n ${this.usage}`);
        }

    }
};