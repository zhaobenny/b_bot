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
    var player = await client.music.playerCollection.get(msg.guild.id)
    if (!player) {
      player = await client.music.spawnPlayer(
        {
          guild: msg.guild,
          voiceChannel: msg.member.voice.channel,
          textChannel: msg.channel,
          volume: 1,
          deafen: true
        },
        {
          skipOnError: true
        }
      )
      // TO DO: Figure out if this is a good idea or not
      client.music.on('trackPlay', () => {
        client.commands.get('np').run(client, msg, args)
      })
    }
    var request = args[0]
    if (args.length > 1) {
      request = args.join(' ')
    }
    try {
      request = await player.lavaSearch(request, msg.member, {
        source: 'yt',
        add: false
      })
    } catch (error) {
      console.log('[Bot] Search went wrong!')
      console.log(error)
      return msg.channel.send('No songs found ya doofus!')
    }

    if (Array.isArray(request)) {
      player.queue.add(request[0])
    } else {
      await player.queue.add(request.tracks)
    }

    if (!player.playing) {
      await player.play()
    }

    return msg.react('👍')
  }
}
