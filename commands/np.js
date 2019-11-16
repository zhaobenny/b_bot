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
                if (typeof info.title == "undefined" || err){
                    console.log("[BOT] Error in getting YT info");
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
                }

                msg.channel.messages.fetch({limit: 1}).then(msgFetched => {
                    if (msgFetched.first().author.bot){
                        if (msgFetched.first().embeds[0] && msgFetched.first().embeds[0].author.name == "Now Playing"){
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