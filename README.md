# Discord bot | Testclient
![npm](https://img.shields.io/npm/v/discord.js.svg)

## About
**A Testclient (discord bot) with some basic examples**


- Settings like $prefix and $token from a config.json file.
- Checks if prefix is set and user is not a bot.
- Static reactions example.
- Set the bot activity (type, options) with a returned embed message as example. 
- A quote (httpRequest) example with the axios library (Promise based HTTP client).


#### Command handler
- Reads the /commands folder of all *.js files and adds it to the `client.collection`.
- An array of all commands are iterated, saved, and exported as `cmdList`.
- The `cmdList` can hold any defined parameters from each file, for an easy output by the `help` command.
- The commands 'testArgs' and 'testParams' are set to `hidden: true`, so they are not getting indexed in the cmdList.

##### Separates command.name, prefix and args.
```js
// split args and get command name without prefix
const args = message.content.slice(prefix.length).split(/ +/);
const commandName = args.shift().toLowerCase();

if (!client.commands.has(commandName)) return;
const command = client.commands.get(commandName);
};
```

##### Check if a command requires arguments and handles the reaction

```js
// version.js
module.exports = {
    name: "version",
    description: "shows bot info",
    args: false,
    usage: "shows bot info",
    execute(message) {
    ...
    }
};
```

```js
// app.js
if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }
```

##### Checks if a command is has set `admin: true` and verifies that the user is in the given list (config.json) of 'botAdminIds'.

```js
// inc/tools.js
module.exports = {
    isAdmin: function (user) {
        //simplified version of if-else
        return !!botAdminIds.includes(user);
    }
}
```

## Requires
**Node > 12.0.0**

## Installation
1. Install node.js from [nodejs.org](https://nodejs.org)
2. Run `npm install` in the bot directory and make sure it passes.
3. Create a [discord token](https://discord.com/developers/)
   - If you don't know how to do it, look in the 'guides section' at the bottom
   - Don't forget to join a server with the bot.
3. Rename *config.json.example* to *config.json* and fill the placeholders
4. After set up your `config.json` - run `node app.js` to run the bot!

## Documentation
[DiscordJS documentation](https://discord.js.org/#/docs)  

## Tools
[Discord Markdown](https://bots.ondiscord.xyz/info/markdown)   
[Discord embed visualizer](https://leovoel.github.io/embed-visualizer/)

## Guides
[DE - Build a Discord Bot (Node.js)](https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js-de)  
[EN - Build a Discord Bot (Node.js)](https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js)