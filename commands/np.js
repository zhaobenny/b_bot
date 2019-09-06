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
                    if (err.message.includes("removed") || err.message.includes("deleted") || err.message.includes("private")){  // TO DO : move entire thing somewhere to play.js
                        client.servers[msg.guild.id].queue.shift();
                        if (client.servers[msg.guild.id].queue[0]){
                            this.run(client, msg, args)
                            play.playQueue(client, msg.guild.voice.connection, msg);
                            return;
                        }
                    }
                    client.servers[msg.guild.id].dispatcher = null;
                    const embed = new Discord.MessageEmbed()
                    .setTitle("Queue ended!")
                    return msg.channel.send({embed});
                }
                if (typeof info.title == "undefined"){
                    console.log("[BOT] Error in getting YT info (info undefined?)");
                    client.servers[msg.guild.id].queue.shift();
                    if (client.servers[msg.guild.id].queue[0]){
                        this.run(client, msg, args);
                        play.playQueue(client, msg.guild.voice.connection, msg);
                        return;
                    }
                    client.servers[msg.guild.id].dispatcher = null;
                    const embed = new Discord.MessageEmbed()
                    .setTitle("Queue ended!")
                    return msg.channel.send({embed});
                }  // move up to here
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