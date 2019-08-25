const Discord = require('discord.js');

module.exports = {
	name: 'avatar',
    description: 'Returns avatar image',
    aliases: ['icon', 'pfp'],
	run(client, msg, args) {
        if (args.length != 0 && msg.mentions.users.size === 0){
            return msg.channel.send(`what are u doing thats not how u use it`);
        }
        const embed = new Discord.MessageEmbed();
        if (msg.mentions.users.size === 0){
            embed
            .setImage(msg.author.displayAvatarURL())
            .setTitle("Your avatar link" )
            .setURL(msg.author.displayAvatarURL())
            return msg.channel.send(embed);
        } else if (msg.mentions.users.size >= 1) {
           msg.mentions.users.map(user => {
            embed
            .setImage(msg.user.displayAvatarURL())
            .setTitle("Your avatar link" )
            .setURL(msg.user.displayAvatarURL())
            return msg.channel.send(embed);
           });
        }
	},
};