module.exports = {
  name: 'skip',
  description: 'Skip song',
  aliases: ['next'],
  run (client, msg, args) {
    const server = client.servers[msg.guild.id]
    if (!msg.member.voice.channel) {
      return msg.channel.send("You're not in a voice channel!")
    }
    if (!msg.guild.voice.connection) {
      return msg.channel.send('I am not in one?')
    }
    if (!server || !server.queue || server.queue.length === 0) {
      return msg.channel.send('There is no queue')
    }
    if (server.dispatcher.paused) {
      return msg.channel.send("Can't skip when queue is paused")
    }
    server.dispatcher.end()
    return msg.react('👍')
  }
}
