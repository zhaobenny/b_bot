module.exports = {
  name: 'shuffle',
  description: 'Shuffles queue',
  async run (client, msg, args) {
    const player = await client.music.playerCollection.get(msg.guild.id)
    if (player && !player.queue.empty) {
      var random = player.queue.size
      for (var i = 1; i <= player.queue.size - 1; i++){
          random = await (Math.floor(Math.random() * (player.queue.size - 1)))
          try {
            await player.queue.moveTrack(i, random)
          } catch (error){
            // TODO: sometimes it goes too fast, use faster way
            player.queue.moveTrack(i, i * Math.random())
          }
    }
    msg.react('👍')

    } else {
      return msg.channel.send('There is no queue')
    }
  }
}
