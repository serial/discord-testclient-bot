module.exports = {
    name: "args",
    description: "testing arguments",
    admin: false,
    hidden: true,
    args: true,
    usage: 'arg[0] arg[1] ...',
    execute(message, args) {

        let command = this.name;
        message.channel.send(`Command name: ${command} \nArguments: ${args}`);

    }
};