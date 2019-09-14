const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const play = require("./play.js");


module.exports = {
	name: 'now playing',
    description: 'Show what is playing',
    aliases: ['nowplaying', 'current'],
	run(client, msg, args) {
        let server = client.servers[msg.guild.id];
        if (server && server.queue && server.queue[0]){
            ytdl.getBasicInfo(server.queue[0], (err, info) => {
                if (err) {
                    console.log("[BOT] Error in getting YT info: " + err.message);
                    if (err.message.includes("removed") || err.message.includes("deleted") || err.message.includes("private")){  // TO DO : move entire thing somewhere to play.js
                        server.queue.shift();
                        if (server.queue[0]){
                            this.run(client, msg, args)
                            play.playQueue(client, msg.guild.voice.connection, msg);
                            return;
                        }
                    }
                    server.dispatcher = null;
                    const embed = new Discord.MessageEmbed()
                    .setTitle("Queue ended!")
                    return msg.channel.send({embed});
                }
                if (typeof info.title == "undefined"){
                    console.log("[BOT] Error in getting YT info (info undefined?)");
                    server.queue.shift();
                    if (server.queue[0]){
                        this.run(client, msg, args);
                        play.playQueue(client, msg.guild.voice.connection, msg);
                        return;
                    }
                    server.dispatcher = null;
                    const embed = new Discord.MessageEmbed()
                    .setTitle("Queue ended!")
                    return msg.channel.send({embed});
                }  //entire thing ends here

                msg.channel.messages.fetch({limit: 1}).then(msgFetched => {
                    if (msgFetched.first().author.bot){
                        if (msgFetched.first().embeds[0].author.name == "Now Playing"){
                            msgFetched.first().delete(100);
                        }
                    }
                  });

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