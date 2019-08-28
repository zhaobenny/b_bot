const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const play = require("./play.js");


module.exports = {
	name: 'Now playing',
    description: 'Show what is playing',
    aliases: ['nowplaying', 'current'],
	run(client, msg, args) {
        if (client.servers[msg.guild.id] && client.servers[msg.guild.id].queue && client.servers[msg.guild.id].queue[0]){
            ytdl.getBasicInfo(client.servers[msg.guild.id].queue[0], (err, info) => {
                if (err) {
                    console.log("[BOT] Error in getting YT info (assume private or deleted video): " + err.message);
                    if (err.message.includes("removed") || err.message.includes("deleted") || err.message.includes("private")){  // TO DO : redo this betters
                        client.servers[msg.guild.id].queue.shift();
                        this.run(client, msg, args)
                        play.playQueue(client, msg.guild.voice.connection, msg);
                    }
                    return msg.channel.send('Error playing video (deleted or private video?)');
                }
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