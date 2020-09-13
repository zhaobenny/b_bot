module.exports = {
  name: 'dc',
  description: 'Bot will DC from voice channel',
  aliases: ['leave', 'disconnect', 'reset', 'stop'],
  async run (client, msg, args) {
    const player = await client.music.playerCollection.get(msg.guild.id)
    if (!player) {
      return msg.channel.send('I am not in one?')
    }

    await player.destroy()
    return msg.react('👍')
  }
}
