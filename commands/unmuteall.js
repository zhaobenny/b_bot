module.exports = {
  name: 'unmuteall',
  description: 'Unmutes everyone in the Discord server',
  aliases: ['uma'],
  async run (client, msg, args) {
    if (!(msg.member.hasPermission('MUTE_MEMBERS'))){
        return msg.channel.send("You don't have mute permission! Try using " + config.prefix + "unmuteself if needed")
    }

    if (!msg.member.voice.channel) {
        return msg.channel.send("You're not in a voice channel!");
    }

    let voiceChannel = msg.member.voice.channel;
    for (let [guildMember] of voiceChannel.members) {
        guildMember.voice.setMute(true, "Unmute all command");
    }

    return msg.react('👍')
  }
}
