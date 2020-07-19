module.exports = {
  name: 'shuffle',
  description: 'Shuffles queue',
  async run (client, msg, args) {
    const player = await client.music.playerCollection.get(msg.guild.id)
    if (player && !player.queue.empty) {
      msg.react('👍')
      for (var i = 1; i <= player.queue.size - 1; i++){
        var random = await (Math.floor(Math.random() * (player.queue.size - 1)))
        await player.queue.moveTrack(i, random)
      }
    } else {
      return msg.channel.send('There is no queue')
    }
  }
}
