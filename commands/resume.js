module.exports = {
  name: 'resume',
  description: 'Resumes bot if playing',
  async run (client, msg, args) {
    const player = await client.music.playerCollection.get(msg.guild.id)
    if (!player) {
      return msg.channel.send('I am not in one?')
    }
    if (player && player.empty) {
      return msg.channel.send('There is no queue')
    }

    if (!player.paused) {
      return msg.channel.send('Already resumed')
    }

    await player.resume()
    return msg.react('👍')
  }
}
