module.exports = {
    name: "ping",
    description: "bot latency",
    args: false,
    usage: null,
    execute(message) {

        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);

    },
};

