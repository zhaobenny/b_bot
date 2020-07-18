module.exports = {
  name: 'repeat',
  description: 'Toggled repeat queue if playing',
  aliases: ['loop'],

  async run (client, msg, args) {
    const player = await client.music.playerCollection.get(msg.guild.id)
    if (!player) {
      return msg.channel.send('I am not in one?')
    }
    if (player && player.queue.empty) {
      return msg.channel.send('There is no queue')
    }

    player.queue.toggleRepeat()
    if (player.queue.repeatQueue) {
      return msg.channel.send('Queue repeating')
    } else {
      return msg.channel.send('Queue not repeating')
    }
  }
}
