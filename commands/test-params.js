module.exports = {
    name: "params",
    description: "testing parameters",
    admin: false,
    hidden: true,
    args: true,
    usage: '<recipient> -s <subject example with whitespace> -c <long content with whitespaces>',
    execute(message, args) {

        if (args == null) throw new Error(message.reply(`No Args provided! try: \n ${this.usage}`));

        let command = this.name
        let recipient = args[0];

        const subjectIndex = args.indexOf("-s");
        const contentIndex = args.indexOf("-c");

        const subject = args.slice(subjectIndex + 1, contentIndex).join(' ');
        const content = args.slice(contentIndex + 1, args.length).join(' ');

        message.channel.send(`Command name: ${command} \nRecipient: ${recipient} - Parameters: (-c) ${subject} | (-c) ${content}`);

        }



};

