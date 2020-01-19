const Discord = require('discord.js');
const ytdl_d = require('ytdl-core-discord');
const ytdl = require('ytdl-core');
const youtubeapi = require('simple-youtube-api');
const {getData} = require("spotify-url-info");

module.exports = {
	name: 'play',
    description: 'Plays music from YT links',
    aliases: ['add'],

    async playQueue(client, connection, msg){
        let server = client.servers[msg.guild.id];
        try {
            var getSong = await ytdl_d(server.queue[0], {format: "audioonly", highWaterMark:1<<25})
        } catch (error){
            console.log("[BOT] Error playing music: \n");
            console.log(error);
            console.log("\n");
            server.queue.shift();
            if (server.queue[0]){
                let args = "";
                client.commands.get("np").run(client, msg, args);
                this.playQueue(client, connection, msg);
                return;
            } else {
                server.dispatcher = null;
                const embed = new Discord.MessageEmbed()
                .setTitle("Queue ended!")
                return msg.channel.send({embed});
            }
        }

        var dispatcher = connection.play(getSong, {type: 'opus'});
        dispatcher.setVolume(0.035);
        server.dispatcher = dispatcher;

        dispatcher.on("end", (reason) => {
            server.queue.shift();
            if (server.queue[0]){
                let args = "";
                client.commands.get("np").run(client, msg, args);
                this.playQueue(client, connection, msg);
                return;
            } else {
                server.dispatcher = null;
                const embed = new Discord.MessageEmbed()
                .setTitle("Queue ended!")
                return msg.channel.send({embed});
            }
        })
    },

	async run(client, msg, args) {
        const youtube = new youtubeapi(client.config.yt_key);
        if (!client.servers[msg.guild.id]){
            client.servers[msg.guild.id] = {
                queue : [],
                dispatcher : null,
            }
        }

        let server = client.servers[msg.guild.id];


        let song = String(args[0])
        if (!msg.member.voice.channel){
            return msg.channel.send("You're not in a voice channel!");
        }
        if (args.length === 0 && !msg.guild.voice){
            msg.member.voice.channel.join();
            return msg.channel.send("Joined");
        } else if (args.length === 0){
            return msg.channel.send("No args provided?");
        }

        if (!(ytdl.validateURL(song))){
                let checkForPlaylist =  JSON.stringify(youtubeapi.util.parseURL(song))
                if (/^(spotify:|https:\/\/[a-z]+\.spotify\.com\/)/.test(song)){
                    var spotifyInfo = await getData(song);
                    if (spotifyInfo.type == "track"){
                        try {
                            var result = await youtube.searchVideos(spotifyInfo.name + " " + spotifyInfo.artists[0].name, 1)
                        } catch(err) {
                            console.log(err);
                        }
                        song = "https://www.youtube.com/watch?v=" + result[0].id;
                    } else if (spotifyInfo.type == "playlist"){
                        if (spotifyInfo.tracks.items.length >= 75){
                            return msg.channel.send("Spotify playlist too long. Youtube API quota limit will be reached");
                        }
                        for (let i = 0; i < spotifyInfo.tracks.items.length-1; i++){
                            args[0] = spotifyInfo.tracks.items[i].track.name + " " + spotifyInfo.tracks.items[i].track.artists[0].name;
                            try {
                                var result = await youtube.searchVideos(args[0], 1);
                            } catch (err) {
                                console.log(err);
                                msg.channel.send("Youtube API error. Probably max quota reached. Terminating playlist early");
                                i = spotifyInfo.tracks.items.length + 1; // break loop early
                            }
                            song = "https://www.youtube.com/watch?v=" + result[0].id;
                            server.queue.push(song);
                        }
                        args[0] = spotifyInfo.tracks.items[spotifyInfo.tracks.items.length-1].track.name + " " + spotifyInfo.tracks.items[spotifyInfo.tracks.items.length-1].track.artists[0].name;
                        try {
                            result = await youtube.searchVideos(args[0], 1);
                        } catch (err) {
                            console.log(err);
                        }
                        song = "https://www.youtube.com/watch?v=" + result[0].id;
                    } else {
                        return msg.channel.send("Unsupported action on Spotify link!");
                    }
                }
                else if (checkForPlaylist.includes("playlist")){
                    let playlistURL = song;
                    song = "";
                    try {
                        var playlist = await youtube.getPlaylist(playlistURL);
                        var videos = await playlist.getVideos();
                    } catch(err) {
                        console.log(err);
                    }
                    for (let i = 0; i < videos.length-1; i++){
                        song = "https://www.youtube.com/watch?v=" + videos[i].id;
                        server.queue.push(song);
                    }
                    song = "https://www.youtube.com/watch?v=" + videos[videos.length-1].id;
                } else {
                    var result = await youtube.searchVideos(args.join(' '), 1)
                    song = "https://www.youtube.com/watch?v=" + result[0].id;
            }
        }

        if (server.dispatcher){
            server.queue.push(song);
            return msg.react('👍');
        }

        msg.member.voice.channel.join().then(connection =>{
            server.queue.push(song);
            client.commands.get("np").run(client, msg, args);
            module.exports.playQueue(client, connection, msg);
            })

        return true
        },
}
