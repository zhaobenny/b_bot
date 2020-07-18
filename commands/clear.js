module.exports = {
  name: 'clear',
  description: 'Clear queue of songs',
  aliases: ['c', 'empty'],
  async run (client, msg, args) {
    const player = await client.music.playerCollection.get(msg.guild.id)
    if (!player) {
      return msg.react('I am not in one?')
    }
    await player.queue.clearQueue()
    return msg.react('👍')
  }
}
