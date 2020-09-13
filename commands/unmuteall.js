module.exports = {
  name: 'unmuteall',
  description: 'Unmutes everyone in the Discord server',
  aliases: ['uma'],
  async run (client, msg, args) {
    if (!(msg.member.hasPermission('MUTE_MEMBERS'))) {
      return msg.channel.send("You don't have unmute permission! Try using " + client.config.prefix + 'unmuteself if needed')
    }

    if (!msg.member.voice.channel) {
      return msg.channel.send("You're not in a voice channel!")
    }

    const voiceChannel = msg.member.voice.channel
    for (const guildMember of voiceChannel.members) {
      guildMember[1].voice.setMute(false, 'Unmute all command')
    }

    return msg.react('👍')
  }
}
