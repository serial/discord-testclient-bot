const app       = require('../app.js');
const axios     = require('axios');

module.exports = {
    name: "quote",
    description: "random quote",
    args: false,
    usage: null,
    execute(message) {

        const quote_url = "https://quotes.rest/qod";

        axios({
            method: 'get',
            url: quote_url,
            headers: { 'Accept': 'application/json' }, // this api needs this header set for the request
        }).then(res => {
            const quote = res.data.contents.quotes[0].quote
            const author = res.data.contents.quotes[0].author
            const log = `${quote} - ${author}`
            //console.log(log)
            //message.reply(log)

            const exampleEmbed = new app.Discord.MessageEmbed()
                //.setColor('#0099ff')
                .setColor('#ff4519')
                .setTitle(author)
                .setURL('https://quotes.rest/qod/')
                .setAuthor('quote of the day', 'http://serial.rocketfishy.de/explicitlabs-logo-sign-red.png', 'http://serial.rocketfishy.de')
                .setDescription(quote)
                /*
                .setThumbnail('http://serial.rocketfishy.de/explicitlabs-logo-sign.png')
                .addFields(
                    { name: 'Quote', value: quote },
                    { name: '\u200B', value: '\u200B' },
                )
                */
                .setTimestamp()
                .setFooter('requested ', 'http://serial.rocketfishy.de/explicitlabs-logo-sign.png');

            message.channel.send(exampleEmbed);


        }).catch(err => {
            console.log(err)
        })

    },
};