const Discord = require('discord.js')
const ytdl_d = require('ytdl-core-discord')
const ytdl = require('ytdl-core')
const youtubeapi = require('simple-youtube-api')
const { getData } = require('spotify-url-info')

module.exports = {
  name: 'play',
  description: 'Plays music from YT links',
  aliases: ['add'],

  async run (client, msg, args) {
    // Error checking
    if (!msg.member.voice.channel) {
      return msg.channel.send("You're not in a voice channel!")
    }
    if (args.length === 0 && !msg.guild.voice) {
      msg.member.voice.channel.join()
      return msg.channel.send('Joined')
    } else if (args.length === 0) {
      return msg.channel.send('No args provided?')
    }

    const player = await client.music.spawnPlayer(
			{
				guild: msg.guild,
				voiceChannel: msg.member.voice.channel,
				textChannel: msg.channel,
				volume: 50,
				deafen: true
			},
			{
				skipOnError: true
			}
		);

    var song
    try {
        song =  await player.lavaSearch(song, msg.member, {
				source: 'yt',
				add: true
			});
    } catch (error) {
        console.log(error)
        return msg.channel.send('No songs found ya doofus')
    }

    player.queue.add(song[0]);
    if (!player.playing){
      await player.play();
    }
  },
}
