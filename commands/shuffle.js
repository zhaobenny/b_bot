module.exports = {
  name: 'shuffle',
  description: 'Shuffles queue',
  async run (client, msg, args) {
    const player = await client.music.playerCollection.get(msg.guild.id)
    // TO DO: fix this shuffle command
    if (player && !player.queue.empty) {
      msg.react('👍')
      if (args[0] === 'all') {

    } else {
      return msg.channel.send('There is no queue')
    }
  }
}
