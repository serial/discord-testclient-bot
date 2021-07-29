module.exports = {
    name: "clear",
    description: "clear messages from a channel",
    admin: false,
    args: true,
    usage: "<number greater than 0, less than 100>",
    execute(message, args) {
        const amount = parseInt(args[0]) +1; // +1 because the own message to send cmd is counted
        //console.log('given arg: ' + amount);

        if (isNaN(amount)) {
            return message.reply("that doesn't seem to be a valid number.");
        } else if (amount <= 1 || amount > 100) {
            return message.reply("you need to input a number between 1 and 99.");
        }


        const member = message.member;

        if (member.hasPermission(['MANAGE_CHANNELS', 'MANAGE_ROLES'])) {
            message.channel.bulkDelete(amount, true).catch((err) => {
                console.error(err);
                message.channel.send(
                    "there was an error trying to prune messages in this channel!"
                );
            });
        } else {
            message.reply(`Sorry, you don't have permissions to use this command`);
        }




        message.reply(`Deleted ${amount-1} messages`)
            .then(message => {
                setTimeout(() => message.delete(), 10000)
            })
            .catch(console.error)

    },
};