const Discord = require('discord.js');


// may get p
module.exports = {
	name: 'Screenshare',
    description: 'Returns a screenshare link to current voice channel one is in',
    aliases: ['sharescreen', 'ss'],
	run(client, msg, args) {
        if (!msg.member.voice.channel){
            return msg.channel.send("You're not in a voice channel!");
        }
        return msg.channel.send("The screenshare link for your current voice channel is: \n" + "https://www.discordapp.com/channels/" + msg.guild.id + "/" + msg.member.voice.channel.id)
	},
};