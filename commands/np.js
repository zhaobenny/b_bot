const Discord = require('discord.js')

module.exports = {
  name: 'nowplaying',
  description: 'Show what is playing',
  aliases: ['nowplaying', 'current'],
  async run (client, msg, args) {
    const player = await client.music.playerCollection.get(msg.guild.id)
    if (!player) {
      return msg.channel.send('I am not in one?')
    }
    if (player && player.queue.empty) {
      return msg.channel.send('There is no queue')
    }
    msg.channel.messages.fetch({ limit: 1 })
      .then(message => {
        if (message.first().author.bot) {
          message.first().delete()
        }
      })
      .catch(console.error)

    const nowPlaying = player.queue.toArray()[0]
    const embed = new Discord.MessageEmbed()
      .setAuthor('Now Playing')
      .setTitle(nowPlaying.title)
      .setURL(nowPlaying.url)
      .setColor(0x00AE86)
    return msg.channel.send({ embed })
  }
}
