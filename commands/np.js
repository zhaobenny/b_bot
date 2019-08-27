const Discord = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
	name: 'Now playing',
    description: 'Show what is playing',
    aliases: ['nowplaying', 'current'],
	run(client, msg, args) {
        if (client.servers[msg.guild.id] && client.servers[msg.guild.id].queue && client.servers[msg.guild.id].queue[0]){
            ytdl.getBasicInfo(client.servers[msg.guild.id].queue[0], (err, info) => {
                const embed = new Discord.MessageEmbed()
                .setAuthor("Now Playing")
                .setTitle(info.title)
                .setURL(info.video_url)
                .setColor(0x00AE86)
                msg.channel.send({embed});
            });
        } else {
            return msg.channel.send("Nothing is currently playing");
        }
    },
};