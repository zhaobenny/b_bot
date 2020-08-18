module.exports = {
  name: 'skip',
  description: 'Skip song',
  aliases: ['next'],
  async run (client, msg, args) {
    const player = await client.music.playerCollection.get(msg.guild.id)
    if (!player) {
      return msg.channel.send('I am not in one?')
    }

    if (player.playing && player.queue.empty) {
      await player.destroy()
    }

    if (player.queue.empty) {
      return msg.channel.send('There is no queue')
    } else {
      player.play()
      client.commands.get('np').run(client, msg, args)
    }
    return msg.react('👍')
  }
}
