module.exports = {
  name: 'muteall',
  description: 'Mutes everyone in a Discord voice channel',
  aliases: ['ma'],
  async run (client, msg, args) {
    if (!(msg.member.hasPermission('MUTE_MEMBERS'))){
        return msg.channel.send("You don't have mute permission!")
    }

    if (!msg.member.voice.channel) {
        return msg.channel.send("You're not in a voice channel!");
    }

    let voiceChannel = msg.member.voice.channel;
    for (let [guildMember] of voiceChannel.members) {
        guildMember.voice.setMute(true, "Mute all command");
    }

    return msg.react('👍')
  }
}
