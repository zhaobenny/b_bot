module.exports = {
	name: 'help',
	description: 'returns helpful infomation',
	run(client, msg, args) {
        const Discord = require('discord.js');
        const embed = new Discord.RichEmbed()
        .setTitle("Bot Commands")
        .setAuthor("!B", "https://www.polytec.com.au/img/products/960-960/white.jpg")
        .setColor(0x00AE86)
        .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
        .addField("$help",
          "you're already here")
        .addField("$avatar [@someone]",
          "returns avatar, leave blank for self")
        .addField("$ping",
          "returns pong");

        msg.channel.send({embed});
	},
};

