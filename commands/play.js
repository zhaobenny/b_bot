const Discord = require('discord.js');
const ytdl_d = require('ytdl-core-discord');
const ytdl = require('ytdl-core');

async function playQueue(client, connection, msg){
    var server = client.servers[msg.guild.id];
    const dispatcher = connection.play(await ytdl_d(server.queue[0], {format: "audioonly", highWaterMark:32768 }), {type: 'opus'});
    dispatcher.setVolume(0.05);
    server.dispatcher = dispatcher;
    dispatcher.on('error', error => console.error(error));
    dispatcher.on("end", () => {
        server.queue.shift();
        if (server.queue[0]){
            let args = "";
            client.commands.get("np").run(client, msg, args);
            playQueue(client, connection, msg);
            return;
        } else {
            server.dispatcher = null;
            const embed = new Discord.MessageEmbed()
            .setTitle("Queue ended!")
            return msg.channel.send({embed});
        }
    });
}

module.exports = {
	name: 'play',
    description: 'Plays music from YT links',
	run(client, msg, args) {
        if (!msg.member.voice.channel){
            return msg.channel.send("You're not in a voice channel!");
        }

        if (args.length === 0){
            msg.member.voice.channel.join();
            return msg.channel.send("Joined");
        }

        if (args.length >= 2){
            return msg.channel.send("Error too many agruments");
        }

        if (!(ytdl.validateURL(args[0]))){
            return  msg.channel.send("Youtube links only!");
        }

        if (!client.servers[msg.guild.id]){
            client.servers[msg.guild.id] = {
                queue : [],
                dispatcher : null,
            }
        }
        var server = client.servers[msg.guild.id];

        if (server.dispatcher){
            server.queue.push(args[0]);
            return msg.react('👍');
        }

        msg.member.voice.channel.join().then(connection =>{
            server.queue.push(args[0]);
            client.commands.get("np").run(client, msg, args);
            playQueue(client, connection, msg);
        })
	},
};