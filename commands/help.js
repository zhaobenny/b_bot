const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'returns helpful infomation',
	run(client, msg, args) {
        const embed = new Discord.MessageEmbed()
        .setTitle("Bot Commands")
        .setAuthor("!B", "https://cdn.discordapp.com/avatars/613858461628891252/694dc5a4dc73545fb7d4ed6c312d50ef.png?size=2048")
        .setColor(0x00AE86)
        .addField("$help",
          "you're already here")
        .addField("$avatar [@someone]",
          "returns avatar, leave blank for self")
        .addField("$ping",
          "returns pong");

        msg.channel.send({embed});
	},
};

