module.exports = {
  name: 'pause',
  description: 'Pauses bot if playing',
  async run (client, msg, args) {
    const player = await client.music.playerCollection.get(msg.guild.id)
    if (!player) {
      return msg.channel.send('I am not in one?')
    }
    if (player && player.queue.empty) {
      return msg.channel.send('There is no queue')
    }

    if (player.paused) {
      return msg.channel.send('Already paused')
    }

    await player.pause()
    return msg.react('👍')
  }
}
