
const fs = require("fs");

module.exports = {
	name: 'reload',
	description: 'reload a command file',
	run(client, msg, args) {
        if (msg.author.id != "269670939480817664"){
            return msg.channel.send("Dev only command");
        }
        try {
            delete require.cache[require.resolve(`./${args[0]}.js`)];
            client.commands.delete(args[0]);
            let commandFile = require(`./${args[0]}.js`);
            client.commands.set(args[0], commandFile);
            console.log(`[BOT] Sucessfully reloaded ${args[0]}`);
            return msg.channel.send(`Sucessful reload of ${args[0]}.js`);

        } catch (e) {
            console.log(`[BOT] Failed reloading ${args[0]}`);
            console.log(e);
            return msg.channel.send(`Failed reloading of ${args[0]}.js`);
        }

	},
};
