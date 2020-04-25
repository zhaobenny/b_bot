
module.exports = {
  name: 'Screenshare',
  description: '[Deprecated] Returns the outdated method of screenshare link to current voice channel one is in',
  aliases: ['sharescreen', 'ss'],
  run (client, msg, args) {
    if (!msg.member.voice.channel) {
      return msg.channel.send("You're not in a voice channel!")
    }
    return msg.channel.send('[Deprecated] The screenshare link for your current voice channel is: \n' + 'https://www.discordapp.com/channels/' + msg.guild.id + '/' + msg.member.voice.channel.id)
  }
}
