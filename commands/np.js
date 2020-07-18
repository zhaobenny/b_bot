const Discord = require('discord.js')

module.exports = {
  name: 'now playing',
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

    msg.channel.messages.fetch().then(msgFetched => {
      if (msgFetched.first().author.bot) {
        if (msgFetched.first().embeds[0] && msgFetched.first().embeds[0].author.name == 'Now Playing') {
          msgFetched.first().delete(100)
        }
      }
    }).catch(error => {
      console.log('[BOT] Error occured while fetching: ' + error)
    })
    const nowPlaying = player.queue.toArray()[0]
    const embed = new Discord.MessageEmbed()
      .setAuthor('Now Playing')
      .setTitle(nowPlaying.title)
      .setURL(nowPlaying.url)
      .setColor(0x00AE86)
    return msg.channel.send({ embed })
  }
}
